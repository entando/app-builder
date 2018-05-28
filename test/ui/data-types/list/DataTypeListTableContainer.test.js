import 'test/enzyme-init';

import { getLoading } from 'state/loading/selectors';
import { mapStateToProps, mapDispatchToProps } from 'ui/data-types/list/DataTypeListTableContainer';
import { fetchDataTypes } from 'state/data-types/actions';
import { DATA_TYPES_OK_PAGE_1 } from 'test/mocks/dataTypes';
import { getDataTypeList } from 'state/data-types/selectors';

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
  pagination: { global: DATA_TYPES_OK_PAGE_1.metaData },
};

const dispatchMock = jest.fn();


jest.mock('state/data-types/actions', () => ({
  fetchDataTypes: jest.fn(),
}));

jest.mock('state/data-types/selectors', () => ({
  getDataTypeList: jest.fn(),
}));

jest.mock('state/loading/selectors', () => ({
  getLoading: jest.fn(),
}));

const DATA_TYPES = [
  {
    name: 'dataType1',
    code: 'ABC',
    status: '0',
  },
  {
    name: 'dataType2',
    code: 'DEF',
    status: '0',
  },
];

getDataTypeList.mockReturnValue(DATA_TYPES);
getLoading.mockReturnValue(false);

describe('DataTypeListTableContainer', () => {
  it('maps datatype list property state in DataTypesListTable', () => {
    expect(mapStateToProps(TEST_STATE)).toEqual({
      datatypes: DATA_TYPES_OK_PAGE_1.payload,
      page: TEST_STATE.pagination.global.page,
      totalItems: TEST_STATE.pagination.global.totalItems,
      pageSize: TEST_STATE.pagination.global.pageSize,
    });
  });

  describe('mapDispatchToProps', () => {
    let props;
    beforeEach(() => {
      props = mapDispatchToProps(dispatchMock);
    });

    it('should map the correct function properties', () => {
      expect(props.onWillMount).toBeDefined();
      expect(props.onClickDelete).toBeDefined();
    });


    it('should dispatch an action if onWillMount is called', () => {
      props.onWillMount({});
      expect(dispatchMock).toHaveBeenCalled();
      expect(fetchDataTypes).toHaveBeenCalled();
    });

    it('should dispatch an action if onClickDelete is called', () => {
      props.onClickDelete('code');
      expect(dispatchMock).toHaveBeenCalled();
    });
  });
});
