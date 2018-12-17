import { get } from 'lodash';
import { createSelector } from 'reselect';

export const getDEComponents = state => state.digitalExchangeComponents;

export const getDEFilters = createSelector(
  getDEComponents,
  digitalExchangeComponents => digitalExchangeComponents.filters,
);

export const getTopCategoryFilter = createSelector(
  getDEFilters,
  digitalExchangeFilters => get(digitalExchangeFilters.formValues, 'type', []),
);

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
