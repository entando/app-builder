import store from 'state/store';
import { config, setApi, useMocks } from '@entando/apimanager';
import { addToast, TOAST_WARNING } from '@entando/messages';
import { formattedText } from '@entando/utils';
import { history, ROUTE_HOME, ROUTE_DASHBOARD } from 'app-init/router';
import pluginsArray from 'entando-plugins';
import { keycloakEnabled, keycloakLogout } from 'ui/app/Keycloak';

const logout = () => (keycloakEnabled ? keycloakLogout() : history.push(ROUTE_HOME));
const goHome = () => history.push(ROUTE_DASHBOARD);

config(store, logout, goHome);
store.dispatch(setApi({
  domain: (window && window.env && window.env.REACT_APP_DOMAIN) || process.env.DOMAIN,
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
      plugin.apiManagerConfig(
        store,
        () => history.push(ROUTE_HOME),
        () => history.push(ROUTE_DASHBOARD),
      );
    }
  });
}
