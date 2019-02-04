import { get } from 'lodash';
import { createSelector } from 'reselect';
import { getSelectedDECategory } from 'state/digital-exchange/categories/selectors';

export const getDEComponents = state => state.digitalExchangeComponents;

export const getDEFilters = createSelector(
  getDEComponents,
  digitalExchangeComponents => digitalExchangeComponents.filters,
);

export const getDECategoryFilters = createSelector(
  getDEFilters,
  filters => get(filters, 'all.formValues.type', []),
);

export const getDEMarketplaceFilters = createSelector(
  [getDEFilters, getSelectedDECategory],
  (filters, category) => get(filters, `${category}.formValues.marketplace`, []),
);

export const getDERatingFilter = createSelector(
  [getDEFilters, getSelectedDECategory],
  (filters, category) => get(filters, `${category}.formValues.rating`, null),
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

export const getDEComponentInstallation = (state, props) => (
  get(state, `digitalExchangeComponents.installation[${props.component.id}].state`, '')
);
