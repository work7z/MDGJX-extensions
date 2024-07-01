#!/bin/bash
# this purpose of this script is to convert the external plugin so that we use it in miaoda 
set -e
cd $MDGJX_EXT_ROOT
externalDIR=$MDGJX_EXT_ROOT/external
extensionDIR=$MDGJX_EXT_ROOT/extensions
echo "externalDIR: $externalDIR"
for eachext in `ls $externalDIR`
do
    destDir=$extensionDIR/DO-NOT-MODIFY-$eachext
    if [ -f $externalDIR/$eachext ]; then
        echo "skip this file: $eachext"
        continue
    fi
    [ -d $destDir ] && rm -rf $destDir
    cp -a "$externalDIR/$eachext" "$destDir"
    echo "handling this external dir: $eachext"
    convertFile(){
        file="$1"
        cat "$file" | sed 's/utools/mdgjx/g' > "$file.tmp"
        mv "$file.tmp" "$file" 
    }
    cd $destDir
    for eachFile in `find $destDir -type f`
    do
        echo "handling eachFile: $eachFile"
        convertFile $eachFile
    done
done
echo 'done'
# end of file
