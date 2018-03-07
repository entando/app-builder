import { createSelector } from 'reselect';

export const getCurrentPage = state => state.page.page;
export const getLastPage = state => state.page.lastPage;
export const getPageSize = state => state.page.pageSize;

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
