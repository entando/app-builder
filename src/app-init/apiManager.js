import store from 'state/store';
import { config, setApi, useMocks } from '@entando/apimanager';
import { addToast, TOAST_WARNING } from '@entando/messages';
import { formattedText } from '@entando/utils';
import { gotoRoute } from '@entando/router';
import { ROUTE_HOME, ROUTE_DASHBOARD } from 'app-init/router';
import pluginsArray from 'entando-plugins';
import { keycloakEnabled, keycloakLogout } from 'ui/app/Keycloak';

const logout = () => (keycloakEnabled ? keycloakLogout() : gotoRoute(ROUTE_HOME));
const goHome = () => gotoRoute(ROUTE_DASHBOARD);

config(store, logout, goHome);
store.dispatch(setApi({
  domain: process.env.DOMAIN,
  useMocks: process.env.USE_MOCKS,
}));

if (useMocks(store.getState())) {
  store.dispatch(addToast(
    formattedText('app.usingMocks'),
    TOAST_WARNING,
  ));
}

if (pluginsArray && pluginsArray.length) {
  pluginsArray.forEach((plugin) => {
    if (plugin.apiManagerConfig) {
      plugin.apiManagerConfig(store, () => gotoRoute(ROUTE_HOME), () => gotoRoute(ROUTE_DASHBOARD));
    }
  });
}
