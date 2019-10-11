export USE_MOCKS=false
export PUBLIC_URL=/app-builder
# we will need to change that to /
export DOMAIN=/entando-de-app
export KEYCLOAK_JSON=/entando-de-app/keycloak.json
export DIGITAL_EXCHANGE_UI_ENABLED=true
export ENABLE_DIGITAL_EXCHANGE_UI=true
export KEYCLOAK_ENABLED=true
npm run build --production
docker build -t entando/entando-app-builder-de:6.0.0-SNAPSHOT .
#docker build -t kerruba/entando-app-builder-de:6.0.0-SNAPSHOT .
#docker push kerruba/entando-app-builder-de:6.0.0-SNAPSHOT
