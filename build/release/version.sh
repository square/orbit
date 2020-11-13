#!/usr/bin/env bash

set -e

# echo "1. Building files";
npm run build;
git add $(./build/release/outputFiles.js);
