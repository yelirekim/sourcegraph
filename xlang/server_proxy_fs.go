package xlang

import (
	"context"
	"os"
	"time"

	"github.com/sourcegraph/ctxvfs"
	"sourcegraph.com/sourcegraph/sourcegraph/xlang/lspx"
)

var simulateFSLatency, _ = time.ParseDuration(os.Getenv("LSP_PROXY_SIMULATED_LATENCY"))

// handleFS handles file system-related requests from the build/lang
// server to the server proxy. It provides a VFS to the build/lang
// server.
func (c *serverProxyConn) handleFS(ctx context.Context, method, path string) (result interface{}, err error) {
	// Simulate latency to test likely performance when this is
	// deployed. The lsp-proxy and lang/build server pods typically
	// have a 3-6ms of effective network latency, which (multiplied by
	// many VFS requests) is significant.
	if simulateFSLatency > 0 {
		time.Sleep(simulateFSLatency)
	}

	switch method {
	case "fs/readFile":
		contents, err := ctxvfs.ReadFile(ctx, c.rootFS, path)
		if err != nil {
			return nil, err
		}
		return contents, nil

	case "fs/readDir":
		fis, err := c.rootFS.ReadDir(ctx, path)
		if err != nil {
			return nil, err
		}
		fis2 := make([]lspx.FileInfo, len(fis))
		for i, fi := range fis {
			fis2[i] = lspx.FileInfo{Name_: fi.Name(), Size_: fi.Size(), Dir_: fi.Mode().IsDir()}
		}
		return fis2, nil

	case "fs/stat", "fs/lstat":
		var stat func(context.Context, string) (os.FileInfo, error)
		if method == "fs/stat" {
			stat = c.rootFS.Stat
		} else {
			stat = c.rootFS.Lstat
		}
		fi, err := stat(ctx, path)
		if err != nil {
			return nil, err
		}
		return lspx.FileInfo{Name_: fi.Name(), Size_: fi.Size(), Dir_: fi.Mode().IsDir()}, nil

	default:
		panic("unreachable")
	}
}
