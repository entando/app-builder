#!/bin/sh
set -eu

ENV_DOMAIN=${DOMAIN:-""}
if [ -z ${KEYCLOAK_JSON:-""} ]
then
#Why are we using Bourne?
  if echo $ENV_DOMAIN | grep -qe "^.*/$"
  then
    ENV_KEYCLOAK_JSON="${ENV_DOMAIN}keycloak.json"
  else
    ENV_KEYCLOAK_JSON="${ENV_DOMAIN}/keycloak.json"
  fi
else
  ENV_KEYCLOAK_JSON="${KEYCLOAK_JSON}"
fi
ENV_JSON='{'
ENV_JSON+='"DOMAIN":"'"$ENV_DOMAIN"'", '
ENV_JSON+='"DOMAIN_CM":"'"$DOMAIN_CM"'", '
ENV_JSON+='"KEYCLOAK_JSON":"'"$ENV_KEYCLOAK_JSON"'", '
ENV_JSON+='"ENTANDO_VIRTUAL_CONTEXTS":"'"$ENTANDO_VIRTUAL_CONTEXTS"'"'
ENV_JSON+='}'

ESCAPED_ENV_JSON=$(echo $ENV_JSON | sed 's/\"/\\\"/g' | sed 's/\//\\\//g' | tr -d '\n' | tr -d '[[:blank:]]')

sed -i 's/"REACT_APP_ENV"/'"$ESCAPED_ENV_JSON"'/g' $HOME/app-builder/index.html
exec "$@"
