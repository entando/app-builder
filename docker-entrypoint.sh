#!/bin/sh
set -eu

ENV_JSON='{'
[ -n "${DOMAIN:-""}" ] && ENV_JSON+='"DOMAIN":"'"$DOMAIN"'", '
[ -n "${DOMAIN_CM:-""}" ] && ENV_JSON+='"DOMAIN_CM":"'"$DOMAIN_CM"'", '
[ -n "${KEYCLOAK_JSON:-""}" ] && ENV_JSON+='"KEYCLOAK_JSON":"'"$KEYCLOAK_JSON"'", '
[ -n "${AB_ENTANDO_VIRTUAL_CONTEXTS:-""}" ] && ENV_JSON+='"AB_ENTANDO_VIRTUAL_CONTEXTS":"'"$AB_ENTANDO_VIRTUAL_CONTEXTS"'"'
ENV_JSON+='}'

ESCAPED_ENV_JSON=$(echo $ENV_JSON | sed 's/\"/\\\"/g' | sed 's/\//\\\//g' | tr -d '\n' | tr -d '[[:blank:]]')

sed -i 's/"REACT_APP_ENV"/'"$ESCAPED_ENV_JSON"'/g' $HOME/app-builder/index.html
exec "$@"
