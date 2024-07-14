#!/bin/bash
# 第一步，循环MDGJX_EXT_ROOT下的所有目录，复制miaoda-common@version到当前目录下
# MDGJX_EXT_ROOT

cd $(dirname $0)
./run-convert-upx.sh

cd $MDGJX_EXT_ROOT/miaoda-common
version=`jq -r .version package.json`
echo "version: $version"
rawMTypesDir=$PWD/m-types-copy
mTypesDir=$PWD/m-types-copy/$version
mkdir -p $mTypesDir
rm -rf $mTypesDir/*
mkdir -p $mTypesDir
cp -a *.ts $mTypesDir

doWork(){
  dir=$1
  echo "copy $dir"
  mkdir -p $dir
  rm -rf $dir/*
  cp -a $rawMTypesDir/*  $dir
}

if [[ "$RUN_MODE" != "prod" ]];then
  doWork $MDGJX_ROOT/modules/web-server/src/m-types-copy/
  doWork $MDGJX_ROOT/modules/web/src/m-types-copy/
fi
doWork $MDGJX_EXT_ROOT/extensions-meta/src/m-types-copy/

cd $MDGJX_EXT_ROOT/extensions-meta
npm run build

