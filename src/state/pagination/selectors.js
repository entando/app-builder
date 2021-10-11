import { createSelector } from 'reselect';
import { get } from 'lodash';
import { NAMESPACE_GLOBAL } from 'state/pagination/const';

export const getPagination = (state, namespace = NAMESPACE_GLOBAL) => (
  get(state, `pagination.${namespace}`, state.pagination[NAMESPACE_GLOBAL])
);

export const getCurrentPage = createSelector(
  getPagination,
  pagination => pagination.page,
);

export const getLastPage = createSelector(
  getPagination,
  pagination => pagination.lastPage,
);

export const getPageSize = createSelector(
  getPagination,
  pagination => pagination.pageSize,
);

export const getTotalItems = createSelector(
  getPagination,
  pagination => pagination.totalItems,
);

export const isLastPage = createSelector(
  getCurrentPage,
  getLastPage,
  (page, lastPage) => page === lastPage,
);

export const isFirstPage = createSelector(
  getCurrentPage,
  page => page === 1,
);

export const getNextPage = createSelector(
  getCurrentPage,
  isLastPage,
  (page, isLast) => (isLast ? page : page + 1),
);

export const getPreviousPage = createSelector(
  getCurrentPage,
  isFirstPage,
  (page, isFirst) => (isFirst ? page : page - 1),
);
