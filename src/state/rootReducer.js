import { combineReducers } from 'redux';

import { routerReducer as router } from 'frontend-common-components';

import pluginArray from 'entando-plugins';

import form from 'state/form/reducer';
import activityStream from 'state/activity-stream/reducer';
import locale from 'state/locale/reducer';

const reducerDef = {
  router,
  form,
  locale,
  activityStream,
};

if (pluginArray.length) {
  // builds a plugins reducer
  const pluginsReducerObj = {};
  pluginArray.forEach((plugin) => {
    if (plugin.reducer) {
      pluginsReducerObj[plugin.id] = plugin.reducer;
    }
  });
  reducerDef.plugins = combineReducers(pluginsReducerObj);
}

// app root reducer
const reducer = combineReducers(reducerDef);

export default reducer;
