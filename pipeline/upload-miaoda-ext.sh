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


# pkg-repo会存储插件的tar.gz
# pkg-info-release 和 pkg-info-test 会存储插件的具体列表和信息
# 基本来说，测试环境和正式环境的pkg都是统一的，区别就是pkg-info的ref.txt和timestamp会有不同
# 假如说我们要发布test@v1.0.0，但是它在测试环境挂了，这时候我们就不能用v1.0.0，而应该用v1.0.1继续上传

# TODO: 后面可以写个脚本，定期清除一下云端的一些过期的pkg和pkg-info

extPkgDir=/home/appuser/extstatic/ext-root/pkg-repo
extPkgInfoDir=/home/appuser/extstatic/ext-root/pkg-info-$releaseOrTest
extPkgExtractDir=/home/appuser/extstatic/ext-root/pkg-extract
echo "extPkgDir: $extPkgDir"
echo "extPkgInfoDir: $extPkgInfoDir"

doScp(){
  myserver=$1
  set -e
  ssh $myserver -p 26609 "mkdir -p $extPkgDir"
  ssh $myserver -p 26609 "mkdir -p $extPkgInfoDir"
  # upload files
  sftp -P 26609  $myserver <<< "put $ROOTPKGDIR/* $extPkgDir"
  sftp -P 26609  $myserver <<< "put $ROOTPKGINFODIR/* $extPkgInfoDir"
  sftp -P 26609  $myserver <<< "put $MDGJX_EXT_ROOT/extensions-meta/miaoda-dist-all.json $extPkgInfoDir/miaoda-dist-all-$extGVersion.json"
  ssh $myserver -p 26609 "date +%s > /home/appuser/extstatic/ext-root/timestamp.txt"
  ssh $myserver -p 26609 "date +%s > $extPkgInfoDir/timestamp.txt"
  ssh $myserver -p 26609 "echo $TAGNAME > $extPkgInfoDir/timestamp.txt"
  ssh $myserver -p 26609 "mkdir -p $extPkgExtractDir"
  # extract it
  ssh $myserver -p 26609 "rm -rf $extPkgInfoDir/miaoda-extract.sh"
  sftp -P 26609  $myserver <<< "put $MDGJX_EXT_ROOT/extensions-meta/miaoda-extract.sh $extPkgInfoDir/miaoda-extract.sh"
  ssh $myserver -p 26609 "chmod +x $extPkgInfoDir/miaoda-extract.sh"
  ssh $myserver -p 26609 "$extPkgInfoDir/miaoda-extract.sh $extPkgInfoDir $extPkgDir $extPkgExtractDir"
  # final commit
  ssh $myserver -p 26609 "echo $extGVersion > $extPkgInfoDir/ref.txt"

  # upload to cos
  ssh $myserver -p 26609 "cd /home/appuser/extstatic && ~/bin/coscli-linux cp ./ext-root/ cos://$BNAME/ext-root/ -r" 
}

# doScp $SERVER_2H2G 
doScp $SERVER_2H4G

