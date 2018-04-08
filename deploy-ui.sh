#!/usr/bin/env bash

cd pogo-map-ui
echo "> Build"
npm run build
git add .

echo "> Commit & push"
git commit -m "Deployment"
git push
cd -

echo "> Deployment"
git subtree push --prefix pogo-map-ui https://git.heroku.com/pokemongogymmap-web.git master