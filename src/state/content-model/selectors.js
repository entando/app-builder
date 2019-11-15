import { createSelector } from 'reselect';

export const getContentModelState = state => state.contentModel;

export const getContentModelList = createSelector(
  getContentModelState,
  contentModel => contentModel.list,
);

export const getContentModelFilters = createSelector(
  getContentModelState,
  contentModel => contentModel.filters,
);

export const getContentModelFilterProps = createSelector(
  getContentModelFilters,
  filters => filters.filterProps,
);

export const getContentModelSearchKeyword = createSelector(
  getContentModelFilters,
  filters => filters.keyword,
);
