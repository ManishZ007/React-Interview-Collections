#!/bin/bash

# Compile ignoring tsconfig.json entirely
tsc ./src/$1.ts --ignoreConfig --outDir ./dist

if [ $? -eq 0 ]; then
    node ./dist/$1.js
else
    echo "❌ Compilation failed. Aborting execution."
    exit 1
fi   