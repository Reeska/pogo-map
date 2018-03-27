#!/usr/bin/env bash

SOURCE=pogo-map-ui
DIST="$SOURCE/dist"

cp "$SOURCE/package-heroku.json" "$DIST/package.json"
git subtree push --prefix "$DIST" https://git.heroku.com/pokemongogymmap-web.git master