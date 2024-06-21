#!/bin/bash
set -e
cd $(dirname $0)/..
ROOTDIR=$PWD
ROOTPKGDIR=$PWD/pkg
ROOTPKGINFODIR=$PWD/pkginfo

chmod +x $MDGJX_EXT_ROOT/pipeline/get-ext-version.sh
extGVersion=`$MDGJX_EXT_ROOT/pipeline/get-ext-version.sh`
echo "extGVersion: $extGVersion"

chmod +x $PWD/pipeline/update-miaoda-config.sh
$PWD/pipeline/update-miaoda-config.sh

if [ -z $releaseOrTest ];then
  releaseOrTest=test
fi
echo "releaseOrTest: $releaseOrTest"

extPkgDir=/home/appuser/extstatic/ext-pkg-$releaseOrTest
ssh $SERVER_2H2G -p 26609 "mkdir -p $extRepoDir"
extPkgInfoDir=/home/appuser/extstatic/ext-pkginfo-$releaseOrTest
ssh $SERVER_2H2G -p 26609 "mkdir -p $extPkgInfoDir"
sftp -P 26609  $SERVER_2H2G <<< "put $ROOTPKGDIR/* $extPkgDir"
sftp -P 26609  $SERVER_2H2G <<< "put $ROOTPKGINFODIR/* $extPkgInfoDir"

ssh $SERVER_2H2G -p 26609 "ls $extPkgInfoDir > $extPkgInfoDir/$extGVersion.txt"
ssh $SERVER_2H2G -p 26609 "echo $extGVersion > $extPkgInfoDir/ref.txt"
