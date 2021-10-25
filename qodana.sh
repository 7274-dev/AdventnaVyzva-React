#!/bin/bash

mkdir "../AdventnaVyzva-React-cache"
mkdir "../AdventnaVyzva-React-result"

if ! docker --version; then
    echo "Please install docker"
    exit 1
fi

docker run --rm -it -p 8888:8080 \
    -v "$(pwd)/":/data/project/ \
    -v "$(pwd)/../AdventnaVyzva-React-cache/":/data/cache/ \
    -v "$(pwd)/../AdventnaVyzva-React-result/":/data/results/ \
    jetbrains/qodana-js --show-report

# You can view report at http://localhost:8888 [exit with Ctrl+C]
