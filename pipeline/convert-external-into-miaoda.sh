#!/bin/bash
# this purpose of this script is to convert the external plugin so that we use it in miaoda 
set -e
cd $MDGJX_EXT_ROOT
externalDIR=$MDGJX_EXT_ROOT/external
extensionDIR=$MDGJX_EXT_ROOT/extensions
echo "externalDIR: $externalDIR"
for myfile in `ls $externalDIR`
do
    destDir=$extensionDIR/DO-NOT-MODIFY-$myfile
    if [ -f $externalDIR/$myfile ]; then
        echo "skip this file: $myfile"
        continue
    fi
    [ -d $destDir ] && rm -rf $destDir
    cp -a $externalDIR/$myfile $destDir
    echo "handling this external dir: $myfile"
    convertFile(){
        file=$1
        cat $file | sed 's/utools/mdgjx/g' > $file.tmp
        mv $file.tmp $file 
    }
    cd $destDir
    find . -type f -exec convertFile {} \; -print
done
echo 'done'
# end of file
