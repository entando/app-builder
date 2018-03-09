import { createSelector } from 'reselect';

export const getApi = state => state.api;

export const useMocks = createSelector(
  getApi,
  api => api.useMocks,
);

export const getDomain = createSelector(
  getApi,
  api => api.domain,
);
