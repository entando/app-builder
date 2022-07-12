# PREPARE
set -e
export USE_MOCKS=false;
export CI=false;
export KEYCLOAK_ENABLED=true
export COMPONENT_REPOSITORY_UI_ENABLED=true;
export LEGACY_ADMINCONSOLE_INTEGRATION_ENABLED="false"
export PUBLIC_URL="/app-builder"
export DOMAIN="/entando-de-app"
VER="6.3.93-hotfix.2"

# BUILD PACKAGE
npm ci
npm rebuild node-sass
npm run app-install -- --packageVersion 0.2.252-hotfix.1 cms
npm run build --production

# BUILD AND PUSH IMAGE
docker build --platform linux/amd64 -t entando/app-builder:$VER --build-arg VERSION="$VER" .          # <= don't miss the point
docker push entando/app-builder:$VER