import { createSelector } from 'reselect';

export const selectCurrentSystemConfiguration = state =>
  state.currentSystemConfiguration.currentSystemConfiguration;

export const selectCurrSystemConfigAdvancedSearch = createSelector(
  selectCurrentSystemConfiguration,
  currentSystemConfiguration => (currentSystemConfiguration &&
    currentSystemConfiguration.advancedSearch ?
    currentSystemConfiguration.advancedSearch.enabled : null),
);
