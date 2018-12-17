import { createSelector } from 'reselect';

export const getDEComponents = state => state.digitalExchangeComponents;

export const getDEComponentListViewMode = createSelector(
  getDEComponents,
  digitalExchangeComponents => digitalExchangeComponents.componentListViewMode,
);

export const getDEComponentList = createSelector(
  getDEComponents,
  digitalExchangeComponents => digitalExchangeComponents.list,
);

export const getDEComponentSelected = createSelector(
  [getDEComponents],
  digitalExchangeComponent => digitalExchangeComponent.selected,
);
