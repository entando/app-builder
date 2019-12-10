#!/bin/sh
set -eu
echo INITIATING PROTOCOL
BUILD_PATH=${REACT_APP_BUILD_PATH:-""}
PUBLIC_URL=${REACT_APP_PUBLIC_URL:-""}
DOMAIN=${REACT_APP_DOMAIN:-""}

ENV_JSON='{"REACT_APP_DOMAIN":"'"$DOMAIN"'","REACT_APP_PUBLIC_URL":"'"$PUBLIC_URL"'"}'

ESCAPED_ENV_JSON=$(echo $ENV_JSON | sed 's/\"/\\\"/g' | sed 's/\//\\\//g' | tr -d '\n' | tr -d '[[:blank:]]')
if [ "$BUILD_PATH" != "" ];
then
  echo INSIDE IF
  sed -i 's/%REACT_APP_ENV%/'"$ESCAPED_ENV_JSON"'/g' $BUILD_PATH/index.html
  echo FINISHED WRITE
fi
echo SCRIPT FINISHED
exec "$@"