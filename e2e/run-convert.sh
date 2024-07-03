#!/bin/bash
set -e
for eachItem in $(ls ./upx | grep -v upx); do
#   node ./convert-upx.js ./upx/$eachItem
    echo "removing $eachItem"
    rm -rf ./upx/$eachItem
done

for eachItem in $(ls ./upx); do
    echo "extracting $eachItem"
    node ./convert-upx.js ./upx/$eachItem
done