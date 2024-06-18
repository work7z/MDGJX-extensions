#!/bin/bash
# 第一步，循环MDGJX_EXT_ROOT下的所有目录，复制miaoda-common@version到当前目录下
# MDGJX_EXT_ROOT
cd $(dirname $0)
version=`jq -r .version package.json`
echo "version: $version"
rawMTypesDir=$PWD/m-types
mTypesDir=$PWD/m-types/$version
mkdir -p $mTypesDir
rm -rf $mTypesDir/*
mkdir -p $mTypesDir
cp -a *.ts $mTypesDir

extDir=$MDGJX_EXT_ROOT/extensions
for dir in $(ls $extDir)
do
  if [ -d $extDir/$dir ]; then
    echo "copy $dir"
    targetMTypesDir=$extDir/$dir/
    rm -rf $targetMTypesDir
    mkdir -p $targetMTypesDir
    cp -a $rawMTypesDir $targetMTypesDir
  fi
done