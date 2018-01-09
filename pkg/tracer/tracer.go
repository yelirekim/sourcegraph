package tracer

import (
	"fmt"
	"log"
	"strconv"

	log15 "gopkg.in/inconshreveable/log15.v2"
	"sourcegraph.com/sourcegraph/sourcegraph/pkg/conf"
	"sourcegraph.com/sourcegraph/sourcegraph/pkg/env"
	"sourcegraph.com/sourcegraph/sourcegraph/pkg/traceutil"

	lightstep "github.com/lightstep/lightstep-tracer-go"
	basictracer "github.com/opentracing/basictracer-go"
	opentracing "github.com/opentracing/opentracing-go"
	jaeger "github.com/uber/jaeger-client-go"
	jaegercfg "github.com/uber/jaeger-client-go/config"
	jaegerlog "github.com/uber/jaeger-client-go/log"
	jaegermetrics "github.com/uber/jaeger-lib/metrics"
)

type tagsAndLogsFilter struct {
	rec basictracer.SpanRecorder
}

func (f *tagsAndLogsFilter) RecordSpan(span basictracer.RawSpan) {
	span.Tags = nil
	span.Logs = nil
	f.rec.RecordSpan(span)
}

var lightstepAccessToken = conf.Get().LightstepAccessToken
var lightstepProject = conf.Get().LightstepProject
var lightstepIncludeSensitive, _ = strconv.ParseBool(env.Get("LIGHTSTEP_INCLUDE_SENSITIVE", "", "send span tags and logs to LightStep"))

var useJaeger = conf.Get().UseJaeger

func Init(serviceName string) {
	if useJaeger {
		log15.Info("Distributed tracing enabled", "tracer", "jaeger")
		cfg := jaegercfg.Configuration{
			Sampler: &jaegercfg.SamplerConfig{
				Type:  jaeger.SamplerTypeConst,
				Param: 1,
			},
		}
		_, err := cfg.InitGlobalTracer(
			serviceName,
			jaegercfg.Logger(jaegerlog.StdLogger),
			jaegercfg.Metrics(jaegermetrics.NullFactory),
		)
		if err != nil {
			log.Printf("Could not initialize jaeger tracer: %s", err.Error())
			return
		}
		traceutil.SpanURL = jaegerSpanURL
		return
	}

	if lightstepAccessToken != "" {
		log15.Info("Distributed tracing enabled", "tracer", "Lightstep")
		var rec basictracer.SpanRecorder = lightstep.NewRecorder(lightstep.Options{
			AccessToken: lightstepAccessToken,
			UseGRPC:     true,
			Tags: opentracing.Tags{
				lightstep.ComponentNameKey: serviceName,
			},
		})
		if !lightstepIncludeSensitive {
			rec = &tagsAndLogsFilter{rec}
		}

		options := basictracer.DefaultOptions()
		options.ShouldSample = func(_ uint64) bool { return true }
		options.Recorder = rec
		opentracing.InitGlobalTracer(basictracer.NewWithOptions(options))

		traceutil.SpanURL = lightStepSpanURL
	}
}

func lightStepSpanURL(span opentracing.Span) string {
	spanCtx := span.Context().(basictracer.SpanContext)
	t := span.(basictracer.Span).Start().UnixNano() / 1000
	return fmt.Sprintf("https://app.lightstep.com/%s/trace?span_guid=%x&at_micros=%d#span-%x", lightstepProject, spanCtx.SpanID, t, spanCtx.SpanID)
}

func jaegerSpanURL(span opentracing.Span) string {
	spanCtx := span.Context().(jaeger.SpanContext)
	return spanCtx.TraceID().String()
}
