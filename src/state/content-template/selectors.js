import { createSelector } from 'reselect';

export const getContentTemplateState = state => state.contentTemplate;

export const getContentTemplateList = createSelector(
  getContentTemplateState,
  contentTemplate => contentTemplate.list,
);

export const getContentTemplateFilters = createSelector(
  getContentTemplateState,
  contentTemplate => contentTemplate.filters,
);

export const getContentTemplateFilterProps = createSelector(
  getContentTemplateFilters,
  filters => filters.filterProps,
);
