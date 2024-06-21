#!/bin/bash
cd $(dirname $0)/..
ROOTDIR=$PWD
ROOTPKGDIR=$PWD/pkg
[ -d $ROOTPKGDIR ] && rm -rf $ROOTPKGDIR
mkdir $ROOTPKGDIR
cd $MDGJX_EXT_ROOT/extensions
for extName in $(ls); do
  cd $MDGJX_EXT_ROOT/extensions/$extName
  echo "Compiling $extName..."
  miaodaConfigFile=./miaoda-dist.json
  if [ -f $miaodaConfigFile ];then 
    echo "miaoda-dist.json exists"
  else
    echo "miaoda-dist.json not exists"
  fi
  disabled=$(cat $miaodaConfigFile | jq '.disabled')
  if [ "$disabled" == "true" ];then
    echo "$extName is disabled"
    continue
  else 
    echo "$extName is enabled"
    # TODO: compile extensions, the final output should like hello-world@1.0.0.tar.gz and folders hello-world@1.0.0
  fi
  echo "----------------------"
done

