import { createSelector } from 'reselect';
import { get } from 'lodash';

export const getDataTypes = state => state.dataTypes;
export const getDataTypesIdList = state => state.dataTypes.list;
export const getDataTypesMap = state => state.dataTypes.map;
export const getSelectedDataType = state => state.dataTypes.selected;
export const getDataTypeAttributes = state => state.dataTypes.attributes;
export const getDataTypeAttributesIdList = state => get(state.dataTypes.attributes, 'list');
export const getDataTypeSelectedAttribute = state => state.dataTypes.attributes.selected;
export const getDataTypeSelectedAttributeSearchable = state =>
  state.dataTypes.attributes.selected.searchableOptionSupported;
export const getDataTypeSelectedAttributeIndexable = state =>
  state.dataTypes.attributes.selected.indexableOptionSupported;
export const getDataTypeSelectedAttributeAllowedRoles = state =>
  state.dataTypes.attributes.selected.allowedRoles;
export const getDataTypeSelectedAttributeallowedDisablingCodes = state =>
  state.dataTypes.attributes.selected.allowedDisablingCodes;

export const getSelectedDataTypeAttributes = state => get(state.dataTypes.selected, 'attributes');

export const getDataTypeSelectedAttributeCode = createSelector(
  [getDataTypeSelectedAttribute],
  (selectedAttribute) => {
    if (selectedAttribute.code === undefined) {
      return '';
    }
    const attributeName = selectedAttribute.code;
    return attributeName;
  },
);

export const getDataTypeList = createSelector(
  [getDataTypesMap, getDataTypesIdList],
  (dataTypesMap, idList) => idList.map(id => (dataTypesMap[id])),
);
