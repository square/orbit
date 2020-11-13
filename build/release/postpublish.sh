#!/usr/bin/env bash

set -e

# Remove dist files
rm $(./build/release/outputFiles.js);
git commit -am "$npm_package_version Release Cleanup";
git push origin HEAD;
