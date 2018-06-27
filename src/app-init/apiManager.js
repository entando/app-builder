import store from 'state/store';
import { config, setApi } from '@entando/apimanager';

import { ROUTE_HOME, ROUTE_DASHBOARD } from 'app-init/router';
import pluginsArray from 'entando-plugins';

config(store, ROUTE_HOME, ROUTE_DASHBOARD);
let parsedDomain = process.env.DOMAIN;
const embeddedDomain = process.env.EMBEDDED_DOMAIN;
console.log(`Original domain:  ${parsedDomain}`);
console.log(`Embedded domain: ${embeddedDomain}.`);
if (embeddedDomain) {
  parsedDomain = `${window.location.origin}/${embeddedDomain}`;
  console.log(`Updated domain: ${parsedDomain}`);
}
store.dispatch(setApi({
  domain: parsedDomain,
  useMocks: process.env.USE_MOCKS,
}));

if (pluginsArray && pluginsArray.length) {
  pluginsArray.forEach((plugin) => {
    if (plugin.apiManagerConfig) {
      plugin.apiManagerConfig(store, ROUTE_HOME, ROUTE_DASHBOARD);
    }
  });
}
