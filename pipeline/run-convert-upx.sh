#!/bin/bash
cd $MDGJX_EXT_ROOT/extensions-meta
npm i -S -D --force
npm run compile

cd $MDGJX_EXT_ROOT/e2e
set -e
cd $MDGJX_EXT_ROOT/e2e
[ -d ./upx-temp ] && rm -rf ./upx-temp
mkdir -p ./upx-temp
cp -a ./upx/* ./upx-temp
for eachItem in $(ls ./upx-temp | grep -v upx); do
#   node ./convert-upx.js ./upx/$eachItem
    echo "removing $eachItem"
    rm -rf ./upx-temp/$eachItem
done

for eachItem in $(ls ./upx-temp); do
    echo "extracting $eachItem"
    node $MDGJX_EXT_ROOT/extensions-meta/dist/convert-upx.js $PWD/upx-temp/$eachItem
done