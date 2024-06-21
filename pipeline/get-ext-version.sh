#!/bin/bash
set -e
jq -r '.version' $MDGJX_EXT_ROOT/ext-version.json