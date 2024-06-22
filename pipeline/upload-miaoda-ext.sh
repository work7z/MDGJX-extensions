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

extPkgDir=/home/appuser/extstatic/ext-root/$releaseOrTest-ext-pkg-repo
extPkgInfoDir=/home/appuser/extstatic/ext-root/$releaseOrTest-ext-pkg-info
echo "extPkgDir: $extPkgDir"
echo "extPkgInfoDir: $extPkgInfoDir"

doScp(){
  myserver=$1
  set -e
  ssh $myserver -p 26609 "mkdir -p $extPkgDir"
  ssh $myserver -p 26609 "mkdir -p $extPkgInfoDir"
  sftp -P 26609  $myserver <<< "put $ROOTPKGDIR/* $extPkgDir"
  sftp -P 26609  $myserver <<< "put $ROOTPKGINFODIR/* $extPkgInfoDir"
  sftp -P 26609  $myserver <<< "put $MDGJX_EXT_ROOT/extensions-meta/miaoda-dist-all.json $extPkgInfoDir/miaoda-dist-all-$extGVersion.json"
  ssh $myserver -p 26609 "echo $extGVersion > $extPkgInfoDir/ref.txt"
  ssh $myserver -p 26609 "date +%s > /home/appuser/extstatic/timestamp.txt"
}

doScp $SERVER_2H2G
doScp $SERVER_2H4G