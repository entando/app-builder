import store from 'state/store';
import { config, setApi, useMocks } from '@entando/apimanager';
import { addToast, TOAST_WARNING } from '@entando/messages';
import { formattedText } from '@entando/utils';

import { ROUTE_HOME, ROUTE_DASHBOARD } from 'app-init/router';
import pluginsArray from 'entando-plugins';

config(store, ROUTE_HOME, ROUTE_DASHBOARD);
let parsedDomain = process.env.DOMAIN;
const embeddedDomain = process.env.EMBEDDED_DOMAIN;
if (embeddedDomain) {
  parsedDomain = `${window.location.origin}/${embeddedDomain}`;
}
store.dispatch(setApi({
  domain: parsedDomain,
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
      plugin.apiManagerConfig(store, ROUTE_HOME, ROUTE_DASHBOARD);
    }
  });
}
