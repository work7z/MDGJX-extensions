#!/bin/bash
cd $(dirname $0)/..
cd miaoda-api
npm publish
cd ..
cd miaoda-web
npm publish
cd ..