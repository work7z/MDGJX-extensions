#!/bin/bash
cd $(dirname $0)

extDir=$MDGJX_EXT_ROOT/extensions
for dir in $(ls $extDir)
do
  if [ -d $extDir/$dir ]; then
    echo "handling $dir"
  fi
done