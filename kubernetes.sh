export USE_MOCKS=false
export PUBLIC_URL=/app-builder
# we will need to change that to /
export DOMAIN=/entando-de-app
export DIGITAL_EXCHANGE_UI_ENABLED=true
export ENABLE_DIGITAL_EXCHANGE_UI=true
export KEYCLOAK_ENABLED=true
npm run build --production
docker build -t entando/entando-app-builder:5.2.0-SNAPSHOT .