import { combineReducers } from 'redux';

import helloWorld from 'state/hello-world';

import pluginArray from 'entando-plugins';

const reducerDef = {
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
