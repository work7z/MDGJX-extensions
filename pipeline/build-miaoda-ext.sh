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

[ -d $ROOTPKGDIR ] && rm -rf $ROOTPKGDIR
mkdir $ROOTPKGDIR
[ ! -d $ROOTPKGINFODIR ] && mkdir $ROOTPKGINFODIR

if [[ "$RUN_MODE" = "prod" ]];then
  echo "RUN_MODE: $RUN_MODE"
  remoteExtPkgDir=/home/appuser/extstatic/release-ext-pkg-info
  rm -f $ROOTPKGINFODIR/*
  cd $ROOTPKGINFODIR
  sftp -P 26609 $SERVER_2H2G <<< "get -r $remoteExtPkgDir/*"
  echo "showing $ROOTPKGINFODIR"
  ls -ahlrt
fi

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
    echo "# fullId: $fullId"
    echo "# timestampPkgInfoFile: $timestampPkgInfoFile"
    echo "# md5PkgInfoFile: $md5PkgInfoFile"
    if [ -f "$timestampPkgInfoFile" ];then
      echo -e "\033[35mBUILT: $fullId already exist\033[0m"
      continue;
    else 
      echo -e "\033[32mBUILDING: $fullId...\033[0m"
    fi
    date +%s > $timestampPkgInfoFile
    echo "# id: $id"
    if [[ "$id" != "$extName" ]];then 
      echo -e "\033[33mSKIP $fullId since id not match\033[0m"
      exit 97
    fi
    echo -e "\033[32mCompiling $fullId...\033[0m"
    # TODO: compile extensions, the final output should like hello-world@1.0.0.tar.gz and folders hello-world@1.0.0
    mdDistDir=$fullId
    [ -d md-dist ] && rm -rf md-dist
    [ -d $fullId ] && rm -rf $fullId
    echo "# pwd: $PWD"
    echo "# run md-setup-prod"
    npm run md-prod-setup
    echo "# run md-pack-prod"
    npm run md-prod-pack
    mv md-dist $fullId
    if [ ! -d $mdDistDir ];then
      echo -e "\033[33m$mdDistDir expected exist yet not\033[0m"
      exit 99
    fi 
    cp ./miaoda-dist.json $mdDistDir
    tar -czvf $fullId.tar.gz $mdDistDir
    finalTarGz=$ROOTPKGDIR/$fullId.tar.gz
    echo "# finalTarGz: $finalTarGz"
    mv $fullId.tar.gz $finalTarGz
    (
      cd $ROOTPKGDIR
      md5sum $fullId.tar.gz > $md5PkgInfoFile
    )
  fi
done

echo "Final Pkg Dir: $ROOTPKGDIR"
cd $ROOTPKGDIR
ls -ahlrt
for tarGz in $(ls); do
  echo "# tarGz: $tarGz"
done