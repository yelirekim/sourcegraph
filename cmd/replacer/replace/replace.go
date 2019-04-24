// Package replace is a service exposing an API to replace file contents in a repo.
// It streams back results with JSON lines.
//
// Architecture Notes:
// - The following are the same as cmd/searcher/search.go:
// * Archive is fetched from gitserver
// * Simple HTTP API exposed
// * Currently no concept of authorization
// * On disk cache of fetched archives to reduce load on gitserver
//
// - Here is where replacer.go differs
// * Pass the zip file path to external replacer tool(s) after validating
// * Read tool stdout and write it out on the HTTP connection
// * Input from stdout is expected to use JSON lines format, but the format isn't checked here: line-buffering is done on the frontend

package replace

import (
	"context"
	"net/http"
	"os/exec"
	"time"

	"github.com/pkg/errors"
	"github.com/prometheus/client_golang/prometheus"
	"github.com/sourcegraph/sourcegraph/cmd/replacer/protocol"
	"github.com/sourcegraph/sourcegraph/pkg/store"
	"gopkg.in/inconshreveable/log15.v2"

	"github.com/gorilla/schema"
)

type Service struct {
	Store *store.Store
	Log   log15.Logger
}

var decoder = schema.NewDecoder()

func init() {
	decoder.IgnoreUnknownKeys(true)
}

// ServeHTTP handles HTTP based replace requests
func (s *Service) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	running.Inc()
	defer running.Dec()

	err := r.ParseForm()
	if err != nil {
		log15.Info("Didn't parse" + err.Error())
		http.Error(w, "failed to parse form: "+err.Error(), http.StatusBadRequest)
		return
	}

	var p protocol.Request
	err = decoder.Decode(&p, r.Form)
	if err != nil {
		http.Error(w, "failed to decode form: "+err.Error(), http.StatusBadRequest)
		return
	}

	if err = validateParams(&p); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	s.replace(ctx, &p, w, r)
}

func (s *Service) replace(ctx context.Context, p *protocol.Request, w http.ResponseWriter, r *http.Request) (deadlineHit bool, err error) {
	// TODO(RVT) bring back opentracing stuff, cf. search.go

	defer func(start time.Time) {
		code := "200"
		// We often have canceled and timed out requests. We do not want to
		// record them as errors to avoid noise
		if ctx.Err() == context.Canceled {
			code = "canceled"
		} else if ctx.Err() == context.DeadlineExceeded {
			code = "timedout"
		} else if err != nil {
			if isBadRequest(err) {
				code = "400"
			} else if isTemporary(err) {
				code = "503"
			} else {
				code = "500"
			}
		}
		requestTotal.WithLabelValues(code).Inc()
	}(time.Now())

	if p.FetchTimeout == "" {
		p.FetchTimeout = "500ms"
	}
	fetchTimeout, err := time.ParseDuration(p.FetchTimeout)
	if err != nil {
		return false, err
	}
	prepareCtx, cancel := context.WithTimeout(ctx, fetchTimeout)
	defer cancel()

	getZf := func() (string, *store.ZipFile, error) {
		path, err := s.Store.PrepareZip(prepareCtx, p.GitserverRepo(), p.Commit)
		if err != nil {
			return "", nil, err
		}
		zf, err := s.Store.ZipCache.Get(path)
		return path, zf, err
	}

	path, zf, err := store.GetZipFileWithRetry(getZf)
	if err != nil {
		return false, err
	}
	defer zf.Close()

	w.Header().Set("Transfer-Encoding", "chunked")
	w.WriteHeader(http.StatusOK)

	// TODO(RVT) check binary exists in path/env
	cmd := exec.Command(external_tool, p.MatchTemplate, p.RewriteTemplate, "-zip", path, "-f", p.FileExtension)

	stdout, err := cmd.StdoutPipe()
	if err != nil {
		log15.Info("Could not connect to command stdout: " + err.Error())
	}

	if err := cmd.Start(); err != nil {
		log15.Info("Error starting command: " + err.Error())
	}
	go func() {
		// TODO(RVT) Figure out reasonable buffering strategy on this end
		b := make([]byte, 1000)
		for {
			nn, err := stdout.Read(b)
			if nn > 0 {
				w.Write([]byte(b[:nn]))
			}
			if err != nil {
				return
			}
		}
	}()

	// TODO(RVT) more informative logging
	if err := cmd.Wait(); err != nil {
		log15.Info(err.Error())
	}

	return false, nil
}

func validateParams(p *protocol.Request) error {
	if p.Repo == "" {
		return errors.New("Repo must be non-empty")
	}
	// XXX RVT copies:
	// Surprisingly this is the same sanity check used in the git source.
	if len(p.Commit) != 40 {
		return errors.Errorf("Commit must be resolved (Commit=%q)", p.Commit)
	}
	return nil
}

const (
	megabyte = float64(1000 * 1000)

	// TODO(RVT) put this in a replacer backend setting
	external_tool = "comby"
)

var (
	running = prometheus.NewGauge(prometheus.GaugeOpts{
		Namespace: "replacer",
		Subsystem: "service",
		Name:      "running",
		Help:      "Number of running search requests.",
	})
	archiveSize = prometheus.NewHistogram(prometheus.HistogramOpts{
		Namespace: "replacer",
		Subsystem: "service",
		Name:      "archive_size_bytes",
		Help:      "Observes the size when an archive is searched.",
		Buckets:   []float64{1 * megabyte, 10 * megabyte, 100 * megabyte, 500 * megabyte, 1000 * megabyte, 5000 * megabyte},
	})
	archiveFiles = prometheus.NewHistogram(prometheus.HistogramOpts{
		Namespace: "replacer",
		Subsystem: "service",
		Name:      "archive_files",
		Help:      "Observes the number of files when an archive is searched.",
		Buckets:   []float64{100, 1000, 10000, 50000, 100000},
	})
	requestTotal = prometheus.NewCounterVec(prometheus.CounterOpts{
		Namespace: "replacer",
		Subsystem: "service",
		Name:      "request_total",
		Help:      "Number of returned replace requests.",
	}, []string{"code"})
)

func init() {
	prometheus.MustRegister(running)
	prometheus.MustRegister(requestTotal)
}

type badRequestError struct{ msg string }

func (e badRequestError) Error() string    { return e.msg }
func (e badRequestError) BadRequest() bool { return true }

func isBadRequest(err error) bool {
	e, ok := errors.Cause(err).(interface {
		BadRequest() bool
	})
	return ok && e.BadRequest()
}

func isTemporary(err error) bool {
	e, ok := errors.Cause(err).(interface {
		Temporary() bool
	})
	return ok && e.Temporary()
}
