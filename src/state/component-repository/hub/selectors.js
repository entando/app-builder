import { createSelector } from 'reselect';

export const getHub = state => state.hub;

export const getBundlesFromRegistry = createSelector(
  getHub,
  hub => hub.bundles,
);

export const getRegistries = createSelector(
  getHub,
  hub => hub.registries,
);

export const getSelectedRegistry = createSelector(
  [getHub],
  hub => hub.selected,
);
