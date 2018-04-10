import { DATA_TYPES_OK_PAGE_1 } from 'test/mocks/dataTypes';

import {
  getDataTypes,
  getDataTypesIdList,
  getDataTypesMap,
  getDataTypeList,
  getSelectedDataType,
  getDataTypeAttributes,
  getDataTypeAttributesIdList,
  getSelectedDataTypeAttributeIdList,
} from 'state/data-types/selectors';

const TEST_STATE = {
  dataTypes: {
    list: ['ABC', 'DEF'],
    map: {
      ABC: {
        name: 'dataType1',
        code: 'ABC',
        status: 'ok',
      },
      DEF: {
        name: 'dataType2',
        code: 'DEF',
        status: 'ok',
      },
    },
    attributes: {
    },
  },
  pagination: DATA_TYPES_OK_PAGE_1.metaData,
};

const STATE_ATTRIBUTES = {
  dataTypes: {
    attributes: {
      list: [],
      selected: {},
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
  it('verify getSelectedDataTypeAttributeIdList selector is undefined', () => {
    expect(getSelectedDataTypeAttributeIdList(TEST_STATE)).toBeUndefined();
  });
  it('verify getSelectedDataTypeAttributeIdList selector is defined', () => {
    expect(getSelectedDataTypeAttributeIdList(STATE_ATTRIBUTES)).toBeDefined();
  });
});
