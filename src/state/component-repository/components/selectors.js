import { get } from 'lodash';
import { createSelector } from 'reselect';
import { getSelectedECRCategory } from 'state/component-repository/categories/selectors';

export const getECRComponents = state => state.componentRepositoryComponents;

export const getECRFilters = createSelector(
  getECRComponents,
  componentRepositoryComponents => componentRepositoryComponents.filters,
);

export const getECRSearchFilterType = createSelector(
  getECRFilters,
  filters => filters.searchFilterType,
);

export const getECRCategoryFilters = createSelector(
  getECRFilters,
  filters => get(filters, 'all.formValues.type', []),
);

export const getComponentRepositoryFilters = createSelector(
  [getECRFilters, getSelectedECRCategory],
  (filters, category) => get(filters, `${category}.formValues.digitalExchange`, []),
);

export const getECRRatingFilter = createSelector(
  [getECRFilters, getSelectedECRCategory],
  (filters, category) => get(filters, `${category}.formValues.rating`, null),
);

export const getECRSearchFilter = createSelector(
  [getECRFilters, getSelectedECRCategory],
  (filters, category) => get(filters, `${category}.formValues.name`, null),
);

export const getECRComponentListViewMode = createSelector(
  getECRComponents,
  componentRepositoryComponents => componentRepositoryComponents.componentListViewMode,
);

export const getECRComponentList = createSelector(
  getECRComponents,
  componentRepositoryComponents => componentRepositoryComponents.list,
);

export const getECRComponentSelected = createSelector(
  [getECRComponents],
  componentRepositoryComponent => componentRepositoryComponent.selected,
);

export const findComponentInListById = (state, componentCode) => (
  state.findIndex(objectInArray => (
    objectInArray.code === componentCode
  ))
);
export const getECRComponentLastInstallStatus = (state, props) => {
  const listIdx = findComponentInListById(get(state, 'componentRepositoryComponents.list', []), props.component.code);
  return get(state, `componentRepositoryComponents.list[${listIdx}].lastInstallStatus`, '');
};

export const getECRComponentInstallationStatus = (state, props) => (
  get(state, `componentRepositoryComponents.installation[${props.component.code}]`, '')
);

export const getECRComponentUninstallStatus = (state, props) => (
  get(state, `componentRepositoryComponents.uninstallation[${props.component.code}]`, '')
);

export const getComponentUsageList = state => (
  get(state, 'componentRepositoryComponents.usageList', [])
);

export const getInstallUninstallProgress = createSelector(
  getECRComponents,
  componentRepositoryComponents => componentRepositoryComponents.progressStatus,
);

export const getInstallPlan = state => get(state, 'componentRepositoryComponents.conflictsModal.installPlan', {});
export const getComponent = state => get(state, 'componentRepositoryComponents.conflictsModal.component', {});
export const getComponentVersion = state => get(state, 'componentRepositoryComponents.conflictsModal.version', null);
