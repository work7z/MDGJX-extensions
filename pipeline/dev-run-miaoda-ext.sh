#!/bin/bash
ext=$1
if [ ! -d $MDGJX_EXT_ROOT/extensions/$ext ]; then
  echo "Extension $ext not found"
  exit 1
fi
$(dirname $0)/update-miaoda-config.sh
cd $MDGJX_EXT_ROOT/extensions/$ext
npm run md-dev-run