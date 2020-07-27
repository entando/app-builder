#!/bin/sh
set -eu

ENV_DOMAIN=${DOMAIN:-""}
ENV_LEGACY_ADMINCONSOLE_INTEGRATION_ENABLED=${LEGACY_ADMINCONSOLE_INTEGRATION_ENABLED:-true}

ENV_JSON='{"DOMAIN":"'"$ENV_DOMAIN"'", "KEYCLOAK_JSON":"'"$ENV_DOMAIN"'/keycloak.json", "LEGACY_ADMINCONSOLE_INTEGRATION_ENABLED":"'"$ENV_LEGACY_ADMINCONSOLE_INTEGRATION_ENABLED"'"}'
ESCAPED_ENV_JSON=$(echo $ENV_JSON | sed 's/\"/\\\"/g' | sed 's/\//\\\//g' | tr -d '\n' | tr -d '[[:blank:]]')

sed -i 's/"REACT_APP_ENV"/'"$ESCAPED_ENV_JSON"'/g' $HOME/app-builder/index.html

exec "$@"
