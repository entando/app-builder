import { createSelector } from 'reselect';

export const getDEComponents = state => state.digitalExchangeComponents;

export const getDEComponentList = createSelector(
  getDEComponents,
  digitalExchangeComponents => digitalExchangeComponents.list,
);

export const getDEComponentSelected = createSelector(
  [getDEComponents],
  digitalExchangeComponent => digitalExchangeComponent.selected,
);
