import { createSelector } from 'reselect';

export const getDataTypes = state => state.dataTypes;

export const getDataTypeList = createSelector(
  [getDataTypes],
  dataTypes => dataTypes.list,
);
