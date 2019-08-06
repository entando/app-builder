import { createSelector } from 'reselect';

export const getPlugins = state => state.plugins;

export const getPluginList = createSelector(
  getPlugins,
  plugins => plugins.list,
);

export const getPluginMap = createSelector(
  getPlugins,
  plugins => plugins.map,
);

export const getSelectedPlugin = createSelector(
  getPlugins,
  plugins => plugins.selected,
);
