#!/bin/bash
set -e
jq -r '.extensions' $MDGJX_EXT_ROOT/ext-version.json