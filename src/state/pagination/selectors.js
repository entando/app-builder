import { createSelector } from 'reselect';

export const getCurrentPage = state => state.pagination.page;
export const getLastPage = state => state.pagination.lastPage;
export const getPageSize = state => state.pagination.pageSize;
export const getTotalItems = state => state.pagination.totalItems;

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
