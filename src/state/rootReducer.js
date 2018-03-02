import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { routerReducer as router } from 'frontend-common-components';

import pluginArray from 'entando-plugins';
import loginForm from 'state/login-form/reducer';
import activityStream from 'state/activity-stream/reducer';
import locale from 'state/locale/reducer';
import widgetList from 'state/widget-list/reducer';
import pages from 'state/pages/reducer';
import groups from 'state/groups/reducer';
import pageModels from 'state/page-models/reducer';
import errors from 'state/errors/reducer';
import options from 'state/settings-form/reducer';

const reducerDef = {
  router,
  form,
  loginForm,
  locale,
  activityStream,
  pages,
  groups,
  widgetList,
  pageModels,
  errors,
  options,
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
