import { createSelector } from 'reselect';

// eslint-disable-next-line import/prefer-default-export
export const getDataTypes = state => state.dataTypes;

export const getListDataTypes = createSelector(
  [getDataTypes],
  dataTypes => dataTypes.list,
);
