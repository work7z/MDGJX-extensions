#!/bin/bash
set -e
cd $(dirname $0)/..
ROOTDIR=$PWD
ROOTPKGDIR=$PWD/pkg
[ -d $ROOTPKGDIR ] && rm -rf $ROOTPKGDIR
mkdir $ROOTPKGDIR
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
    finalTarGz=$ROOTPKGDIR/$extName@$version.tar.gz
    echo "# finalTarGz: $finalTarGz"
    mv md-dist.tar.gz $finalTarGz
  fi
done

echo "Final Pkg Dir: $ROOTPKGDIR"
cd $ROOTPKGDIR
ls -ahlrt

