import { createSelector } from 'reselect';

export const getDashboard = state => state.dashboard;

export const getIntegrations = createSelector(
  getDashboard,
  dashboard => dashboard.integrations,
);

export const getApis = createSelector(
  getIntegrations,
  integrations => integrations.apis,
);

export const getPlugins = createSelector(
  getIntegrations,
  integrations => integrations.plugins,
);

export const getPageStatus = createSelector(
  getDashboard,
  dashboard => dashboard.pageStatus,
);
