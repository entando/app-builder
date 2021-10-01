import { getLoading } from 'state/loading/selectors';
import { mapStateToProps, mapDispatchToProps } from 'ui/content-type/ContentTypeListContainer';
import { fetchContentTypeListPaged, sendPostRefreshContentType } from 'state/content-type/actions';
import { CONTENT_TYPES_OK_PAGE } from 'testutils/mocks/contentType';
import { getContentTypeList } from 'state/content-type/selectors';

const TEST_STATE = {
  contentType: {
    list: ['ABC', 'DEF'],
    map: {
      ABC: {
        name: 'contentType1',
        code: 'ABC',
        status: '0',
      },
      DEF: {
        name: 'contentType2',
        code: 'DEF',
        status: '0',
      },
    },
  },
  tableColumnOrder: {
    contentTypes: [],
  },
  pagination: { global: CONTENT_TYPES_OK_PAGE.metaData },
};

const dispatchMock = jest.fn();

jest.mock('state/content-type/actions', () => ({
  fetchContentTypeListPaged: jest.fn(),
  sendPostRefreshContentType: jest.fn(),
}));

jest.mock('state/content-type/selectors', () => ({
  getContentTypeList: jest.fn(),
}));

jest.mock('state/loading/selectors', () => ({
  getLoading: jest.fn(),
}));

const CONTENT_TYPES = [
  {
    name: 'contentType1',
    code: 'ABC',
    status: '0',
  },
  {
    name: 'contentType2',
    code: 'DEF',
    status: '0',
  },
];

getContentTypeList.mockReturnValue(CONTENT_TYPES);
getLoading.mockReturnValue(false);

describe('ContentTypeListContainer', () => {
  it('maps contentType list property state in ContentTypeList', () => {
    expect(mapStateToProps(TEST_STATE)).toEqual({
      contentTypes: CONTENT_TYPES_OK_PAGE.payload,
      page: TEST_STATE.pagination.global.page,
      totalItems: TEST_STATE.pagination.global.totalItems,
      pageSize: TEST_STATE.pagination.global.pageSize,
      columnOrder: TEST_STATE.tableColumnOrder.contentTypes,
    });
  });

  describe('mapDispatchToProps', () => {
    let props;
    beforeEach(() => {
      props = mapDispatchToProps(dispatchMock);
    });

    it('should map the correct function properties', () => {
      expect(props.onDidMount).toBeDefined();
      expect(props.onClickDelete).toBeDefined();
      expect(props.onClickReload).toBeDefined();
    });

    it('should dispatch an action if onDidMount is called', () => {
      props.onDidMount({});
      expect(dispatchMock).toHaveBeenCalled();
      expect(fetchContentTypeListPaged).toHaveBeenCalled();
    });

    it('should dispatch an action if onClickDelete is called', () => {
      props.onClickDelete('code');
      expect(dispatchMock).toHaveBeenCalled();
    });

    it('should dispatch an action if onClickReload is called', () => {
      props.onClickReload('code');
      expect(sendPostRefreshContentType).toHaveBeenCalled();
    });
  });
});
