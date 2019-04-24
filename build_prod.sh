#!/bin/bash -x

cd virality
npm run build:prod
echo "Prod Build Done"
cd ../functions
npm run build
echo "Functions build done"
