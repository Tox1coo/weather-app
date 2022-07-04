#!/usr/bin/env bat

set -e

cd dist

git add.
git commit -m "deploy"
git push -f git@github.com:Tox1coo/weather-app.git master:gh-pages


cd -