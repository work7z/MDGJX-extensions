#!/bin/bash
extPkgInfoDir=$1
extPkgDir=$2
extPkgExtractDir=$3
if [ -z $extPkgInfoDir ];then
  echo "extPkgInfoDir is empty"
  exit 1
fi
if [ -z $extPkgDir ];then
  echo "extPkgDir is empty"
  exit 1
fi
if [ -z $extPkgExtractDir ];then 
  echo "extPkgExtractDir is empty"
  exit 1
fi
echo "[I] running miaoda-extract.sh at $(date)"
echo "extPkgInfoDir: $extPkgInfoDir"
echo "extPkgDir: $extPkgDir"
cd $extPkgDir
for eachExt in `ls *.tar.gz`;
do
    # output filename without extension
    extName=$(basename $eachExt .tar.gz)
    destDir=$extPkgExtractDir/$extName
    if [ ! -d $destDir ];then
      echo "Extracting $eachExt to $extName"
      tar -xzvf $eachExt -C $extPkgExtractDir
    else 
      echo "Skip Extracting $eachExt to $extName"
    fi
done
