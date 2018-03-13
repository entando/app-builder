import { DATA_TYPES_OK_PAGE_1 } from 'test/mocks/dataTypes';

import {
  getDataTypes,
  getDataTypesIdList,
  getDataTypesMap,
  getDataTypeList,
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
  },
  pagination: DATA_TYPES_OK_PAGE_1.metaData,
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
  it('verify getUserList selector', () => {
    expect(getDataTypeList(TEST_STATE)).toEqual(DATA_TYPES_OK_PAGE_1.payload);
  });
});
