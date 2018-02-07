import { combineReducers } from 'redux';

import { reducer as router } from 'frontend-common-components';

import helloWorld from 'state/hello-world';

import pluginArray from 'entando-plugins';


const reducerDef = {

  router,

  // sample domain reducer
  helloWorld,
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
