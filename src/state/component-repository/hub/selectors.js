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

export const getBundleGroups = createSelector(
  getHub,
  hub => hub.bundleGroups,
);

export const getSelectedBundleStatus = createSelector(
  getHub,
  hub => hub.selectedBundleStatus,
);

export const getBundleStatuses = createSelector(
  getHub,
  hub => hub.bundleStatuses,
);

export const getBundleFilters = createSelector(
  getHub,
  hub => hub.bundleFilters,
);
