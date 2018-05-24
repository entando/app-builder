import { createSelector } from 'reselect';

export const getPagination = (state, namespace = 'global') => state.pagination[namespace];

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
