#!/usr/bin/env sh
set -eu

ENV_JSON=$(env | grep '^REACT_APP_*' | jq -c '. | split("\n") | map(select(. != "")) | map(split("=") | { (.[0]) : .[1] }) | reduce .[] as $item ({}; . * $item)' -R -s)
ESCAPED_ENV_JSON=$(echo $ENV_JSON | sed 's/\"/\\\"/g' | sed 's/\//\\\//g' | tr -d '\n' | tr -d '[[:blank:]]')

PUBLIC_URL=${REACT_APP_PUBLIC_URL:-""}

if [ "$PUBLIC_URL" != "" ];
then
  sed -i 's/%REACT_APP_ENV%/'"$ESCAPED_ENV_JSON"'/g' ${PUBLIC_URL}index.html
  exec "$@"
fi