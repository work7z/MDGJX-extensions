#!/bin/bash
set -e
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

chmod +x $PWD/pipeline/update-miaoda-config.sh
$PWD/pipeline/update-miaoda-config.sh

[ -d $ROOTPKGDIR ] && rm -rf $ROOTPKGDIR
mkdir $ROOTPKGDIR
[ ! -d $ROOTPKGINFODIR ] && mkdir $ROOTPKGINFODIR
cd $MDGJX_EXT_ROOT/extensions
for extName in $(ls); do
  cd $MDGJX_EXT_ROOT/extensions/$extName
  miaodaConfigFile=./miaoda-dist.json
  if [ ! -f $miaodaConfigFile ];then 
    # red text
    echo -e "\033[33mSKIP $extName since miaoda-dist.json not exists\033[0m"
    continue;
  fi
  disabled=$(cat $miaodaConfigFile | jq '.disabled')
  if [ "$disabled" == "true" ];then
    # red text
    echo -e "\033[33mSKIP $extName since it is disabled\033[0m"
    continue
  else 
    version=$(cat $miaodaConfigFile | jq -r '.version')
    id=$(cat $miaodaConfigFile | jq -r '.id')
    fullId=$extName@$version
    timestampPkgInfoFile=$ROOTPKGINFODIR/$fullId.timestamp
    md5PkgInfoFile=$ROOTPKGINFODIR/$fullId.md5
    if [ -f $timestampPkgInfoFile ];then
      echo -e "\033[35mBUILT: $extName already exist\033[0m"
      continue;
    fi
    date +%s > $timestampPkgInfoFile
    echo "# id: $id"
    if [[ "$id" != "$extName" ]];then 
      echo -e "\033[33mSKIP $extName since id not match\033[0m"
      exit 97
    fi
    echo -e "\033[32mCompiling $extName@$version...\033[0m"
    # TODO: compile extensions, the final output should like hello-world@1.0.0.tar.gz and folders hello-world@1.0.0
    mdDistDir=md-dist
    rm -rf $mdDistDir
    echo "# pwd: $PWD"
    echo "# run md-setup-prod"
    npm run md-prod-setup
    echo "# run md-pack-prod"
    npm run md-prod-pack
    if [ ! -d $mdDistDir ];then
      echo -e "\033[33m$mdDistDir expected exist yet not\033[0m"
      exit 99
    fi   
    cp ./miaoda-dist.json $mdDistDir
    tar -czvf md-dist.tar.gz $mdDistDir
    finalTarGz=$ROOTPKGDIR/$fullId.tar.gz
    echo "# finalTarGz: $finalTarGz"
    mv md-dist.tar.gz $finalTarGz
    md5sum $finalTarGz > $md5PkgInfoFile
  fi
done

echo "Final Pkg Dir: $ROOTPKGDIR"
cd $ROOTPKGDIR
ls -ahlrt
for tarGz in $(ls); do
  echo "# tarGz: $tarGz"
done