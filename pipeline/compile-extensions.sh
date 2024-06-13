#!/bin/bash
cd $(dirname $0)/..
ROOTDIR=$PWD
ROOTPKGDIR=$PWD/pkg
[ -d $ROOTPKGDIR ] && rm -rf $ROOTPKGDIR
mkdir $ROOTPKGDIR
cd extensions
for extension in $(ls); do
  if [ -d $extension ]; then
    cd $extension
    echo "Compiling $extension..."
    distDir=./dist
    finalPkgDir=./pkg
    [ -d $finalPkgDir ] && rm -rf $finalPkgDir
    [ -d $distDir ] && rm -rf $distDir
    node_modulesDir=./node_modules
    [ -d $node_modulesDir ] && rm -rf $node_modulesDir
    mkdir $finalPkgDir
    mkdir $distDir
    npm install -S -D --ignore-scripts
    npx tsc --outDir $distDir
    rm -rf $node_modulesDir
    npm i --omit=dev --ignore-scripts
    tar -czvf $ROOTPKGDIR/$extension.tgz .
    du -sh $ROOTPKGDIR/$extension.tgz
    echo "Done"
    cd ..
  fi
done
ls -ahlrt $ROOTPKGDIR