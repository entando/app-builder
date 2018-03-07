import { createSelector } from 'reselect';

export const getDataTypes = state => state.dataTypes;

export const getListDataTypes = createSelector(
  [getDataTypes],
  dataTypes => dataTypes.list,
);
