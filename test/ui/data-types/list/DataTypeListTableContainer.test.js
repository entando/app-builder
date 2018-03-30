import 'test/enzyme-init';

import { mapStateToProps, mapDispatchToProps } from 'ui/data-types/list/DataTypeListTableContainer';
import { DATA_TYPES_OK_PAGE_1 } from 'test/mocks/dataTypes';
import { getDataTypeList } from 'state/data-types/selectors';
import { getLoading } from 'state/loading/selectors';

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

const dispatchMock = jest.fn();

jest.mock('state/data-types/selectors', () => ({
  getDataTypeList: jest.fn(),
}));

jest.mock('state/loading/selectors', () => ({
  getLoading: jest.fn(),
}));

const dataTypes = [
  {
    name: 'dataType1',
    code: 'ABC',
    status: 'ok',
  },
  {
    name: 'dataType2',
    code: 'DEF',
    status: 'ok',
  },
];

getDataTypeList.mockReturnValue(dataTypes);
getLoading.mockReturnValue(false);

describe('DataTypeListTableContainer', () => {
  it('maps datatype list property state in DataTypesListTable', () => {
    expect(mapStateToProps(TEST_STATE)).toEqual({
      datatypes: DATA_TYPES_OK_PAGE_1.payload,
      page: TEST_STATE.pagination.page,
      totalItems: TEST_STATE.pagination.lastPage * TEST_STATE.pagination.pageSize,
      pageSize: TEST_STATE.pagination.pageSize,
    });
  });

  describe('mapDispatchToProps', () => {
    let props;
    beforeEach(() => {
      props = mapDispatchToProps(dispatchMock);
    });

    it('should map the correct function properties', () => {
      expect(props.onWillMount).toBeDefined();
    });

    it('should dispatch an action if onWillMount is called', () => {
      props.onWillMount({});
      expect(dispatchMock).toHaveBeenCalled();
    });
  });
});
