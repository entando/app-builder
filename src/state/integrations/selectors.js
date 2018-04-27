import { createSelector } from 'reselect';

export const getIntegrations = state => state.integrations;

export const getApis = createSelector(
  getIntegrations,
  integrations => integrations.apis,
);

export const getPlugins = createSelector(
  getIntegrations,
  integrations => integrations.plugins,
);
