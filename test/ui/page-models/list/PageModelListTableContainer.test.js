import 'test/enzyme-init';

import { mapStateToProps, mapDispatchToProps } from 'ui/page-models/list/PageModelListTableContainer';
import { fetchPageModels } from 'state/page-models/actions';
import { getPageModelsList } from 'state/page-models/selectors';
import { getLoading } from 'state/loading/selectors';
import { getCurrentPage, getTotalItems, getPageSize } from 'state/pagination/selectors';
import { PAGE_MODELS_LIST } from 'test/mocks/pageModels';
import { setVisibleModal, setInfo } from 'state/modal/actions';
import { MODAL_ID } from 'ui/page-models/common/PageModelDeleteModal';

const CURRENT_PAGE = 1;
const TOTAL_ITEMS = 100;
const PAGE_SIZE = 10;

jest.mock('state/page-models/actions', () => ({
  fetchPageModels: jest.fn(() => 'fetchPageModels'),
}));

jest.mock('state/page-models/selectors', () => ({
  getPageModelsList: jest.fn(),
}));

jest.mock('state/loading/selectors', () => ({
  getLoading: jest.fn(),
}));

jest.mock('state/pagination/selectors', () => ({
  getCurrentPage: jest.fn(),
  getTotalItems: jest.fn(),
  getPageSize: jest.fn(),
}));

jest.mock('state/modal/actions', () => jest.genMockFromModule('state/modal/actions'));

const dispatchMock = jest.fn();
const PAGE_MODEL_CODE = 'PAGE_MODEL_CODE';

beforeEach(() => {
  jest.clearAllMocks();
});

describe('PageModelListTableContainer mapStateToProps', () => {
  let props;
  beforeEach(() => {
    getPageModelsList.mockReturnValue(PAGE_MODELS_LIST);
    getCurrentPage.mockReturnValue(CURRENT_PAGE);
    getTotalItems.mockReturnValue(TOTAL_ITEMS);
    getPageSize.mockReturnValue(PAGE_SIZE);
    getLoading.mockReturnValue({ pageModels: true });
    props = mapStateToProps();
  });

  it('maps pageModels', () => {
    expect(props.pageModels).toEqual(PAGE_MODELS_LIST);
  });

  it('maps loading', () => {
    expect(props.loading).toEqual(true);
  });

  it('maps totalItems', () => {
    expect(props.totalItems).toEqual(TOTAL_ITEMS);
  });

  it('maps page', () => {
    expect(props.page).toEqual(CURRENT_PAGE);
  });

  it('maps pageSize', () => {
    expect(props.pageSize).toEqual(PAGE_SIZE);
  });
});

describe('PageModelListTableContainer mapDispatchToProps', () => {
  let props;
  beforeEach(() => {
    props = mapDispatchToProps(dispatchMock);
  });

  it('should map the correct function properties', () => {
    expect(props.onWillMount).toBeDefined();
  });

  it('should dispatch fetchPageModels if onWillMount is called', () => {
    props.onWillMount();
    expect(dispatchMock).toHaveBeenCalledWith('fetchPageModels');
    expect(fetchPageModels).toHaveBeenCalled();
  });

  it('should dispatch an action if removePageModel is called', () => {
    expect(props.removePageModel).toBeDefined();
    props.removePageModel(PAGE_MODEL_CODE);
    expect(dispatchMock).toHaveBeenCalled();
    expect(setVisibleModal).toHaveBeenCalledWith(MODAL_ID);
    expect(setInfo).toHaveBeenCalledWith({ type: 'page model', code: PAGE_MODEL_CODE });
  });
});
