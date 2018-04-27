import store from 'state/store';
import { config, setApi } from '@entando/apimanager';

import { ROUTE_HOME, ROUTE_DASHBOARD } from 'app-init/router';
import pluginsArray from 'entando-plugins';

config(store, ROUTE_HOME, ROUTE_DASHBOARD);
store.dispatch(setApi({
  domain: process.env.DOMAIN,
  useMocks: process.env.USE_MOCKS,
}));

if (pluginsArray && pluginsArray.length) {
  pluginsArray.forEach((plugin) => {
    if (plugin.apiManagerConfig) {
      plugin.apiManagerConfig(store, ROUTE_HOME, ROUTE_DASHBOARD);
    }
  });
}
