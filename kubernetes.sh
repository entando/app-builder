export USE_MOCKS=false
export PUBLIC_URL=/app-builder
# we will need to change that to /
export DOMAIN=/
export DEFAULT_PATH=/entando-de-app
export KEYCLOAK_JSON=/entando-de-app/keycloak.json
export DIGITAL_EXCHANGE_UI_ENABLED=true
export ENABLE_DIGITAL_EXCHANGE_UI=true
export KEYCLOAK_ENABLED=true
npm run build --production
#docker build -t sergiofilhow/entando-app-builder:5.2.0-SNAPSHOT .
#docker push sergiofilhow/entando-app-builder:5.2.0-SNAPSHOT