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

export const getDigitalExchangeFilters = createSelector(
  [getDEFilters, getSelectedDECategory],
  (filters, category) => get(filters, `${category}.formValues.digitalExchange`, []),
);

export const getDERatingFilter = createSelector(
  [getDEFilters, getSelectedDECategory],
  (filters, category) => get(filters, `${category}.formValues.rating`, null),
);

export const getDESearchFilter = createSelector(
  [getDEFilters, getSelectedDECategory],
  (filters, category) => get(filters, `${category}.formValues.name`, null),
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

export const findComponentInListById = (state, componentId) => (
  state.findIndex(objectInArray => (
    objectInArray.id === componentId
  ))
);
export const getDEComponentLastInstallStatus = (state, props) => {
  const listIdx = findComponentInListById(get(state, 'digitalExchangeComponents.list', []), props.component.id);
  return get(state, `digitalExchangeComponents.list[${listIdx}].lastInstallStatus`, '');
};

export const getDEComponentInstallationStatus = (state, props) => (
  get(state, `digitalExchangeComponents.installation[${props.component.id}]`, '')
);

export const getDEComponentUninstallStatus = (state, props) => (
  get(state, `digitalExchangeComponents.uninstallation[${props.component.id}]`, '')
);
