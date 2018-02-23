import { combineReducers } from 'redux';

import { routerReducer as router } from 'frontend-common-components';
import { reducer as form } from 'redux-form';
import pluginArray from 'entando-plugins';

import loginForm from 'state/login-form/reducer';
import activityStream from 'state/activity-stream/reducer';
import locale from 'state/locale/reducer';
import pages from 'state/pages/reducer';
import pageTree from 'state/page-tree/reducer';
import widgetForm from 'state/widget-form/reducer';


const reducerDef = {
  router,
  form,
  loginForm,
  locale,
  activityStream,
  pages,
  pageTree,
  widgetForm,
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
