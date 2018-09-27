#!/usr/bin/env bash

set -eo pipefail

main() {
    cd "$(dirname "${BASH_SOURCE[0]}")/.."

    # On buildkite we must configure 'go get' to utilize SSH or else cloning
    # the private 'sourcegraph' repository would fail. We can remove this once
    # that repository is public.
    if [[ ! -z "$BUILDKITE" ]]; then
        echo "[url \"ssh://git@github.com/sourcegraph/\"]" >> ~/.gitconfig
        echo "	insteadOf = https://github.com/sourcegraph/" >> ~/.gitconfig
    fi

    export GO111MODULE=on
    go mod edit -dropreplace github.com/sourcegraph/sourcegraph
    go mod vendor
    go mod tidy -v
    go mod edit -replace github.com/sourcegraph/sourcegraph=../sourcegraph
    go mod tidy # TODO(slimsag): I don't understand why this is needed, but it is.
}

main "$@"
