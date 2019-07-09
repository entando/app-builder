import { createSelector } from 'reselect';
import { getParams } from '@entando/router';

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

export const getPluginIdByParams = createSelector(
  getParams,
  params => params.id,
);
