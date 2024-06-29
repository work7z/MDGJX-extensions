#!/bin/bash
set -e
source ~/.zshrc
cd $(dirname $0)/..
ROOTDIR=$PWD
ROOTPKGDIR=$PWD/pkg
ROOTPKGINFODIR=$PWD/pkginfo


chmod +x $MDGJX_EXT_ROOT/pipeline/get-ext-version.sh
extGVersion=`$MDGJX_EXT_ROOT/pipeline/get-ext-version.sh`
echo "extGVersion: $extGVersion"

if [ -z $releaseOrTest ];then
  releaseOrTest=test
fi
echo "releaseOrTest: $releaseOrTest"


