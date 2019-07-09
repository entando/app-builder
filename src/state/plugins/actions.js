import { SET_PLUGINS, SET_SELECTED_PLUGIN } from 'state/plugins/types';

export const setSelectedPlugin = plugin => ({
  type: SET_SELECTED_PLUGIN,
  payload: {
    plugin,
  },
});

export const setPlugins = plugins => ({
  type: SET_PLUGINS,
  payload: {
    plugins,
  },
});
