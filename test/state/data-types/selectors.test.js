import { DATA_TYPES_OK_PAGE_1, SET_DATA_TYPE_REFERENCE_STATUS } from 'test/mocks/dataTypes';

import {
  getDataTypes,
  getDataTypesIdList,
  getDataTypesMap,
  getDataTypeList,
  getSelectedDataType,
  getDataTypeAttributes,
  getDataTypeAttributesIdList,
  getDataTypeSelectedAttributeType,
  getDataTypeSelectedAttributeSearchable,
  getDataTypeSelectedAttributeIndexable,
  getDataTypeSelectedAttributeAllowedRoles,
  getDataTypeSelectedAttributeallowedDisablingCodes,
  getDataTypeReferencesStatus,
} from 'state/data-types/selectors';

const TEST_STATE = {
  dataTypes: {
    list: ['ABC', 'DEF'],
    map: {
      ABC: {
        name: 'dataType1',
        code: 'ABC',
        status: '0',
      },
      DEF: {
        name: 'dataType2',
        code: 'DEF',
        status: '0',
      },
    },
    attributes: {
    },
    references: {
      status: SET_DATA_TYPE_REFERENCE_STATUS,
    },
  },
  pagination: DATA_TYPES_OK_PAGE_1.metaData,
};

const STATE_ATTRIBUTES = {
  dataTypes: {
    attributes: {
      list: [],
      selected: {
        listAttribute: [],
        searchableOptionSupported: [],
        indexableOptionSupported: [],
        allowedRoles: [],
        allowedDisablingCodes: [],

      },

    },
  },
};

describe('state/users/selectors', () => {
  it('getDataTypes(state) returns the users object', () => {
    const selected = getDataTypes(TEST_STATE);
    expect(selected).toBe(TEST_STATE.dataTypes);
  });

  it('verify getDataTypesIdList selector', () => {
    expect(getDataTypesIdList(TEST_STATE)).toEqual(TEST_STATE.dataTypes.list);
  });

  it('verify getDataTypesMap selector', () => {
    expect(getDataTypesMap(TEST_STATE)).toEqual(TEST_STATE.dataTypes.map);
  });

  it('verify getDataTypeList selector', () => {
    expect(getDataTypeList(TEST_STATE)).toEqual(DATA_TYPES_OK_PAGE_1.payload);
  });

  it('verify getDataTypeReferencesStatus selector', () => {
    expect(getDataTypeReferencesStatus(TEST_STATE)).toMatchObject({
      type: 'success', status: 'ready', dataTypesCode: [],
    });
  });

  it('verify getSelectedDataType selector is undefined', () => {
    expect(getSelectedDataType(TEST_STATE)).toBeUndefined();
  });

  it('verify getSelectedDataType selector is defined', () => {
    expect(getSelectedDataType({ dataTypes: { selected: {} } })).toBeDefined();
  });

  it('verify getDataTypeAttributes selector is defined', () => {
    expect(getDataTypeAttributes(TEST_STATE)).toBeDefined();
  });
  it('verify getDataTypeAttributesIdList selector is undefined', () => {
    expect(getDataTypeAttributesIdList(TEST_STATE)).toBeUndefined();
  });
  it('verify getDataTypeAttributesIdList selector is defined', () => {
    expect(getDataTypeAttributesIdList(STATE_ATTRIBUTES)).toBeDefined();
  });
  it('verify getDataTypeSelectedAttributeType selector is defined', () => {
    expect(getDataTypeSelectedAttributeType(STATE_ATTRIBUTES)).toBeDefined();
  });
  it('verify getDataTypeSelectedAttributeSearchable selector is defined', () => {
    expect(getDataTypeSelectedAttributeSearchable(STATE_ATTRIBUTES)).toBeDefined();
  });
  it('verify getDataTypeSelectedAttributeIndexable selector is defined', () => {
    expect(getDataTypeSelectedAttributeIndexable(STATE_ATTRIBUTES)).toBeDefined();
  });
  it('verify getDataTypeSelectedAttributeAllowedRoles selector is defined', () => {
    expect(getDataTypeSelectedAttributeAllowedRoles(STATE_ATTRIBUTES)).toBeDefined();
  });
  it('verify getDataTypeSelectedAttributeallowedDisablingCodes selector is defined', () => {
    expect(getDataTypeSelectedAttributeallowedDisablingCodes(STATE_ATTRIBUTES)).toBeDefined();
  });
});
