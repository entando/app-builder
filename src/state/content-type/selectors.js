import { createSelector } from 'reselect';
import { formValueSelector } from 'redux-form';
import {
  get,
  isEmpty,
  isUndefined,
  difference,
  xor,
  union,
} from 'lodash';

import {
  TYPE_MONOLIST,
  TYPE_LIST,
  TYPE_COMPOSITE,
  TYPE_HYPERTEXT,
  TYPE_LONGTEXT,
  TYPE_TEXT,
  TYPE_BOOLEAN,
  TYPE_CHECKBOX,
  TYPE_DATE,
  TYPE_ENUMERATOR,
  TYPE_ENUMERATOR_MAP,
  TYPE_NUMBER,
  TYPE_MONOTEXT,
  TYPE_THREESTATE,
  TYPE_ATTACH,
  TYPE_TIMESTAMP,
  TYPE_LINK,
  TYPE_IMAGE,
  TYPE_TEXT_METHODS,
  TYPE_NUMBER_METHODS,
  TYPE_HYPERTEXT_METHODS,
  TYPE_DATE_METHODS,
  TYPE_ENUMERATOR_METHODS,
  TYPE_ENUMERATOR_MAP_METHODS,
  TYPE_BOOLEAN_METHODS,
  TYPE_LIST_METHODS,
  TYPE_COMPOSITE_METHODS,
  TYPE_IMAGE_METHODS,
  TYPE_LINK_METHODS,
} from 'state/content-type/const';

const NO_ATTRIBUTE_FOR_TYPE_LIST = [
  TYPE_ATTACH,
  TYPE_LINK,
  TYPE_IMAGE,
  TYPE_TEXT,
  TYPE_LONGTEXT,
  TYPE_HYPERTEXT,
  TYPE_MONOLIST,
  TYPE_LIST,
  TYPE_COMPOSITE,
];

const NO_ATTRIBUTE_FOR_TYPE_MONOLIST = [TYPE_LIST, TYPE_MONOLIST];

export const TEXT_FILTERABLE_ATTRIBUTES = [
  TYPE_TEXT,
  TYPE_ENUMERATOR,
  TYPE_ENUMERATOR_MAP,
  TYPE_LONGTEXT,
  TYPE_MONOTEXT,
  TYPE_NUMBER,
];

export const DATE_FILTERABLE_ATTRIBUTES = [
  TYPE_DATE,
  TYPE_TIMESTAMP,
];

export const BOOL_FILTERABLE_ATTRIBUTES = [
  TYPE_BOOLEAN,
  TYPE_CHECKBOX,
  TYPE_THREESTATE,
];

export const getContentTypeState = state => state.apps.cms.contentType;
export const getContentTypeIdList = state => state.apps.cms.contentType.list;
export const getContentTypeMap = state => state.apps.cms.contentType.map;
export const getSelectedContentType = state => state.apps.cms.contentType.selected;
export const getContentTypeAttributes = state => state.apps.cms.contentType.attributes;
const getContentTypeReferences = state => state.apps.cms.contentType.references;

export const getContentTypeSelectedAttribute = state => state.apps.cms
  . contentType.attributes.selected;
export const getContentTypeParentSelectedAttribute = state => state.apps.cms
  . contentType.attributes.parentSelected;
export const getContentTypeSelectedAttributeType = state => state.apps.cms
  . contentType.attributes.selected.listAttribute;
export const getContentTypeSelectedAttributeSearchable = state => state.apps.cms
  . contentType.attributes.selected.searchableOptionSupported;
export const getContentTypeSelectedAttributeIndexable = state => state.apps.cms
  . contentType.attributes.selected.indexableOptionSupported;
export const getContentTypeSelectedAttributeAllowedRoles = state => state.apps.cms
  .contentType.attributes.selected.allowedRoles || [];
export const getContentTypeSelectedAttributeAssignedRoles = state => state.apps.cms
  .contentType.attributes.selected.assignedRoles || {};
export const getContentTypeSelectedAttributeallowedDisablingCodes = state => state.apps.cms
  . contentType.attributes.selected.allowedDisablingCodes;
export const getContentTypeSelectedAttributeIsList = state => get(state.apps.cms.contentType.attributes.selected, 'listAttribute');
export const getSelectedContentTypeAttributes = state => get(state.apps.cms.contentType.selected, 'attributes');
export const getSelectedAttributeType = state => get(state.apps.cms.contentType.selected, 'attributeSelected.type');
export const getSelectedAttributeNestedType = state => get(state.apps.cms.contentType.selected, 'attributeSelected.nestedAttribute.type');
export const getSelectedValidationRules = state => get(state.apps.cms.contentType.selected, 'attributeSelected.validationRules');
export const getContentTypeSelectedAttributeCode = state => get(state.apps.cms.contentType.attributes.selected, 'code');
export const getContentTypeSelectedNestedAttributeIndexable = state => state.apps.cms
  . contentType.attributes.selectedNested.indexableOptionSupported;
export const getContentTypeSelectedNestedAttributeSearchable = state => state.apps.cms
  . contentType.attributes.selectedNested.searchableOptionSupported;

export const getParentSelectedAttribute = createSelector(
  [getContentTypeParentSelectedAttribute],
  parentSelected => (
    parentSelected.length ? parentSelected[parentSelected.length - 1] : {}
  ),
);

export const getContentTypeSelectedAttributeAllowedRoleCodeList = createSelector(
  getContentTypeSelectedAttributeAllowedRoles,
  allRoles => allRoles.map(role => role.code),
);

export const getContentTypeSelectedAttributeAssignedRolesList = attributeCode => (
  createSelector(
    [getContentTypeSelectedAttributeAssignedRoles],
    assignedRoles => Object.keys(assignedRoles)
      .filter(roleCode => assignedRoles[roleCode] === attributeCode),
  )
);

export const getContentTypeSelectedAttributeUnownedRoles = createSelector(
  [
    getContentTypeSelectedAttributeAllowedRoleCodeList,
    getContentTypeSelectedAttributeAssignedRoles,
  ],
  (allRoles, assignedRoles) => difference(
    allRoles,
    Object.keys(assignedRoles),
  ),
);

export const getContentTypeSelectedAttributeDeletedValues = (
  attributeCode,
  roleValues,
) => createSelector(
  getContentTypeSelectedAttributeAssignedRolesList(attributeCode),
  allRoles => xor(allRoles, roleValues),
);

export const getContentTypeSelectedAttributeRoleChoices = (
  attributeCode,
  roleValues,
) => createSelector(
  [
    getContentTypeSelectedAttributeAllowedRoles,
    getContentTypeSelectedAttributeUnownedRoles,
    getContentTypeSelectedAttributeDeletedValues(attributeCode, roleValues),
  ],
  (allRoles, noOwnerRoles, deletedRoles) => {
    const roleChoices = union(noOwnerRoles, deletedRoles);
    return allRoles.filter(roleInfo => roleChoices.includes(roleInfo.code));
  },
);

export const getContentTypeList = createSelector(
  [getContentTypeMap, getContentTypeIdList],
  (contentTypeMap, idList) => idList.map(id => contentTypeMap[id]),
);

export const getContentTypeReferencesStatus = createSelector(
  [getContentTypeReferences],
  (ref) => {
    const { status } = ref;
    if (!isEmpty(status.toRefresh)) {
      return {
        type: 'warning',
        status: 'toRefresh',
        contentTypeCodes: status.toRefresh,
        count: status.toRefresh.length,
      };
    }
    return { type: 'success', status: 'ready', contentTypeCode: [] };
  },
);

export const getActionModeContentTypeSelectedAttribute = createSelector(
  [getSelectedContentType],
  sel => sel.actionMode,
);

export const getAttributeSelectFromContentType = createSelector(
  [getSelectedContentType],
  selected => selected.attributeSelected,
);

export const getSelectedCompositeAttributes = createSelector(
  [getAttributeSelectFromContentType],
  (attributeSelected) => {
    if (isUndefined(attributeSelected)) {
      return [];
    }
    const { type, nestedAttribute, compositeAttributes } = attributeSelected;
    const isMonolistComposite = type === TYPE_MONOLIST && nestedAttribute.type === TYPE_COMPOSITE;
    return isMonolistComposite ? nestedAttribute.compositeAttributes : compositeAttributes || [];
  },
);

const getList = (type, list) => {
  switch (type) {
    case TYPE_LIST:
      return list.filter(f => !NO_ATTRIBUTE_FOR_TYPE_LIST.includes(f));
    case TYPE_MONOLIST:
    case TYPE_COMPOSITE:
      return list.filter(f => !NO_ATTRIBUTE_FOR_TYPE_MONOLIST.includes(f));
    default:
      return list;
  }
};

export const getContentTypeAttributesIdList = createSelector(
  [getContentTypeAttributes, getAttributeSelectFromContentType],
  (attributes, attributeSelected) => {
    const {
      list,
      selected: { code },
    } = attributes;
    if (isUndefined(attributeSelected)) {
      return getList(code, list);
    }
    const { type } = attributeSelected;
    return getList(type, list);
  },
);

export const getMonolistAttributeType = createSelector(
  [getAttributeSelectFromContentType],
  attributeSelected => (attributeSelected.type === TYPE_MONOLIST ? attributeSelected.nestedAttribute.type : ''),
);

export const getIsMonolistCompositeAttributeType = createSelector(
  [getAttributeSelectFromContentType],
  attributeSelected => !!(
    attributeSelected
      && attributeSelected.type === TYPE_MONOLIST
      && attributeSelected.nestedAttribute.type === TYPE_COMPOSITE
  ),
);

export const getNewAttributeComposite = createSelector(
  [getSelectedContentType],
  sel => sel.newAttributeComposite,
);

export const getFormTypeValue = (state, formName) => formValueSelector(formName)(state, 'type');

export const getShapeMethodsByAttributeType = (type) => {
  switch (type) {
    case TYPE_TEXT:
    case TYPE_LONGTEXT:
      return TYPE_TEXT_METHODS;
    case TYPE_NUMBER: return TYPE_NUMBER_METHODS;
    case TYPE_HYPERTEXT: return TYPE_HYPERTEXT_METHODS;
    case TYPE_DATE:
    case TYPE_TIMESTAMP:
      return TYPE_DATE_METHODS;
    case TYPE_ENUMERATOR:
    case TYPE_MONOTEXT:
      return TYPE_ENUMERATOR_METHODS;
    case TYPE_ENUMERATOR_MAP:
      return TYPE_ENUMERATOR_MAP_METHODS;
    case TYPE_BOOLEAN:
    case TYPE_THREESTATE:
    case TYPE_CHECKBOX:
      return TYPE_BOOLEAN_METHODS;
    case TYPE_MONOLIST:
    case TYPE_LIST:
      return TYPE_LIST_METHODS;
    case TYPE_COMPOSITE:
      return TYPE_COMPOSITE_METHODS;
    case TYPE_IMAGE: return TYPE_IMAGE_METHODS;
    case TYPE_LINK: return TYPE_LINK_METHODS;
    default:
      return [];
  }
};

export const getMethodsSelectedAttribute = createSelector(
  [getSelectedContentTypeAttributes],
  attributes => attributes && attributes.reduce((acc, { code, type }) => ({
    ...acc,
    [code]: getShapeMethodsByAttributeType(type),
  }), {}),
);
