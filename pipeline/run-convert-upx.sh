#!/bin/bash
cd $MDGJX_EXT_ROOT/e2e
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
[ -d ./upx-temp ] && rm -rf ./upx-temp
mkdir ./upx-temp
for eachItem in $(ls ./upx | grep -v upx); do
    echo "moving $eachItem"
    mv ./upx/$eachItem ./upx-temp/$eachItem
done
rm ./upx-temp/*.asar