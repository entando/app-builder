#!/bin/sh
set -eu
echo INITIATING PROTOCOL

PUBLIC_URL=${REACT_APP_PUBLIC_URL:-"/app-builder"}
DOMAIN=${REACT_APP_DOMAIN:-""}

ENV_JSON='{"REACT_APP_DOMAIN":"'"$DOMAIN"'","REACT_APP_PUBLIC_URL":"'"$PUBLIC_URL"'"}'
ESCAPED_ENV_JSON=$(echo $ENV_JSON | sed 's/\"/\\\"/g' | sed 's/\//\\\//g' | tr -d '\n' | tr -d '[[:blank:]]')

sed -i 's/%REACT_APP_ENV%/'"$ESCAPED_ENV_JSON"'/g' $HOME$PUBLIC_URL/index.html

echo SCRIPT FINISHED
exec "$@"