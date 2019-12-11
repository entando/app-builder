#!/bin/sh
set -eu

DOMAIN=${REACT_APP_DOMAIN:-""}

ENV_JSON='{"REACT_APP_DOMAIN":"'"$DOMAIN"'"}'
ESCAPED_ENV_JSON=$(echo $ENV_JSON | sed 's/\"/\\\"/g' | sed 's/\//\\\//g' | tr -d '\n' | tr -d '[[:blank:]]')

sed -i 's/%REACT_APP_ENV%/'"$ESCAPED_ENV_JSON"'/g' $HOME/app-builder/index.html

exec "$@"