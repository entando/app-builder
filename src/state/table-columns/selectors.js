import { createSelector } from 'reselect';

export const getTableColumnsState = state => state.tableColumns;

// eslint-disable-next-line import/prefer-default-export
export const getCurrentColumnsShow = createSelector(
  getTableColumnsState,
  tableColumns => tableColumns.currentColumnsShow,
);
