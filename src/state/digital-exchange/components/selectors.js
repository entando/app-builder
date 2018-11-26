import { createSelector } from 'reselect';

export const getDEComponents = state => state.components;

export const getDEComponentList = createSelector(
  getDEComponents,
  components => components.list,
);

export const getDEComponentSelected = createSelector(
  [getDEComponents],
  component => component.selected,
);
