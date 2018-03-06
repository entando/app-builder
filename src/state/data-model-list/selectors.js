import { createSelector } from 'reselect';

export const getDataModelList = state => state.dataModelList;

export const getTableRow = createSelector(
  [getDataModelList],
  dataModelList => dataModelList.tableRow,
);
