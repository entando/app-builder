import { createSelector } from 'reselect';
// import { get } from 'lodash';

export const getDataTypes = state => state.dataTypes;
export const getDataTypesIdList = state => state.dataTypes.list;
export const getDataTypesMap = state => state.dataTypes.map;
export const getSelectedDataType = state => state.dataTypes.selected;
export const getDataTypeAttributes = state => state.dataTypes.attributes;
export const getDataTypeAttributesIdList = state => (state.dataTypes.attributes.list);
export const getSelectedDataTypeAttributeIdList = state => state.dataTypes.attributes.selected;

export const getDataTypeList = createSelector(
  [getDataTypesMap, getDataTypesIdList],
  (dataTypesMap, idList) => idList.map(id => (dataTypesMap[id])),
);
