import { createSelector } from 'reselect';
import { formValueSelector } from 'redux-form';
import { get, isEmpty, isUndefined } from 'lodash';
import {
  TYPE_MONOLIST,
  TYPE_LIST,
  TYPE_COMPOSITE,
  TYPE_HYPERTEXT,
  TYPE_LONGTEXT,
  TYPE_TEXT,
} from 'state/data-types/const';

const NO_ATTRIBUTE_FOR_TYPE_LIST =
  [TYPE_LIST, TYPE_COMPOSITE, TYPE_HYPERTEXT, TYPE_LONGTEXT, TYPE_MONOLIST, TYPE_TEXT];

const NO_ATTRIBUTE_FOR_TYPE_MONOLIST = [TYPE_LIST, TYPE_MONOLIST];

export const getDataTypes = state => state.dataTypes;
export const getDataTypesIdList = state => state.dataTypes.list;
export const getDataTypesMap = state => state.dataTypes.map;
export const getSelectedDataType = state => state.dataTypes.selected;
export const getDataTypeAttributes = state => state.dataTypes.attributes;
const getDataTypeReferences = state => state.dataTypes.references;

export const getDataTypeSelectedAttribute = state => state.dataTypes.attributes.selected;
export const getDataTypeSelectedAttributeType = state =>
  state.dataTypes.attributes.selected.listAttribute;
export const getDataTypeSelectedAttributeSearchable = state =>
  state.dataTypes.attributes.selected.searchableOptionSupported;
export const getDataTypeSelectedAttributeIndexable = state =>
  state.dataTypes.attributes.selected.indexableOptionSupported;
export const getDataTypeSelectedAttributeAllowedRoles = state =>
  state.dataTypes.attributes.selected.allowedRoles;
export const getDataTypeSelectedAttributeallowedDisablingCodes = state =>
  state.dataTypes.attributes.selected.allowedDisablingCodes;
export const getDataTypeSelectedAttributeIsList = state => get(state.dataTypes.attributes.selected, 'listAttribute');
export const getSelectedDataTypeAttributes = state => get(state.dataTypes.selected, 'attributes');
export const getSelectedAttributeType = state => get(state.dataTypes.selected, 'attributeSelected.type');
export const getSelectedAttributeNestedType = state => get(state.dataTypes.selected, 'attributeSelected.nestedAttribute.type');
export const getSelectedValidationRules = state => get(state.dataTypes.selected, 'attributeSelected.validationRules');
export const getDataTypeSelectedAttributeCode = state => get(state.dataTypes.attributes.selected, 'code');

export const getDataTypeList = createSelector(
  [getDataTypesMap, getDataTypesIdList],
  (dataTypesMap, idList) => idList.map(id => (dataTypesMap[id])),
);

export const getDataTypeReferencesStatus = createSelector([getDataTypeReferences], (ref) => {
  const { status } = ref;
  if (!isEmpty(status.toRefresh)) {
    return {
      type: 'warning', status: 'toRefresh', dataTypesCodes: status.toRefresh, count: status.toRefresh.length,
    };
  }
  return { type: 'success', status: 'ready', dataTypesCode: [] };
});

export const getActionModeDataTypeSelectedAttribute =
  createSelector([getSelectedDataType], sel => sel.actionMode);

export const getAttributeSelectFromDataType =
  createSelector([getSelectedDataType], selected => selected.attributeSelected);

export const getSelectedCompositeAttributes =
    createSelector([getAttributeSelectFromDataType], (attributeSelected) => {
      if (isUndefined(attributeSelected)) {
        return [];
      }
      const { type, nestedAttribute, compositeAttributes } = attributeSelected;
      const isMonolistComposite = type === TYPE_MONOLIST && nestedAttribute.type === TYPE_COMPOSITE;
      return isMonolistComposite ?
        nestedAttribute.compositeAttributes : compositeAttributes || [];
    });


const getList = (type, list) => {
  switch (type) {
    case TYPE_LIST: return list.filter(f => !NO_ATTRIBUTE_FOR_TYPE_LIST.includes(f));
    case TYPE_MONOLIST:
      return list.filter(f => !NO_ATTRIBUTE_FOR_TYPE_MONOLIST.includes(f));
    case TYPE_COMPOSITE:
      return list.filter(f => !NO_ATTRIBUTE_FOR_TYPE_MONOLIST.includes(f));
    default: return list;
  }
};

export const getDataTypeAttributesIdList =
  createSelector(
    [getDataTypeAttributes, getAttributeSelectFromDataType],
    (attributes, attributeSelected) => {
      const { list, selected: { code } } = attributes;
      if (isUndefined(attributeSelected)) {
        return getList(code, list);
      }
      const { type } = attributeSelected;
      return getList(type, list);
    },
  );

export const getMonolistAttributeType =
  createSelector(
    [getAttributeSelectFromDataType],
    attributeSelected =>
      (attributeSelected.type === TYPE_MONOLIST ? attributeSelected.nestedAttribute.type : ''),
  );

export const isMonolistComposteAttributeType =
    createSelector(
      [getAttributeSelectFromDataType],
      attributeSelected =>
        (!!(attributeSelected && attributeSelected.type === TYPE_MONOLIST &&
          attributeSelected.nestedAttribute.type === TYPE_COMPOSITE)),
    );

export const getNewAttributeComposite =
    createSelector([getSelectedDataType], sel => sel.newAttributeComposite);

export const getFormTypeValue = (state, formName) => formValueSelector(formName)(state, 'type');
