import 'test/enzyme-init';

import { mapStateToProps, mapDispatchToProps } from 'ui/page-templates/list/PageTemplateListTableContainer';
import { fetchPageTemplates } from 'state/page-templates/actions';
import { getPageTemplatesList } from 'state/page-templates/selectors';
import { getLoading } from 'state/loading/selectors';
import { getCurrentPage, getTotalItems, getPageSize } from 'state/pagination/selectors';
import { PAGE_TEMPLATES_LIST } from 'test/mocks/pageTemplates';
import { setVisibleModal, setInfo } from 'state/modal/actions';
import { MODAL_ID } from 'ui/page-templates/common/PageTemplateDeleteModal';

const CURRENT_PAGE = 1;
const TOTAL_ITEMS = 100;
const PAGE_SIZE = 10;

jest.mock('state/page-templates/actions', () => ({
  fetchPageTemplates: jest.fn(() => 'fetchPageTemplates'),
}));

jest.mock('state/page-templates/selectors', () => ({
  getPageTemplatesList: jest.fn(),
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
const PAGE_TEMPLATE_CODE = 'PAGE_TEMPLATE_CODE';

beforeEach(() => {
  jest.clearAllMocks();
});

describe('PageTemplateListTableContainer mapStateToProps', () => {
  let props;
  beforeEach(() => {
    getPageTemplatesList.mockReturnValue(PAGE_TEMPLATES_LIST);
    getCurrentPage.mockReturnValue(CURRENT_PAGE);
    getTotalItems.mockReturnValue(TOTAL_ITEMS);
    getPageSize.mockReturnValue(PAGE_SIZE);
    getLoading.mockReturnValue({ pageTemplates: true });
    props = mapStateToProps();
  });

  it('maps pageTemplates', () => {
    expect(props.pageTemplates).toEqual(PAGE_TEMPLATES_LIST);
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

describe('PageTemplateListTableContainer mapDispatchToProps', () => {
  let props;
  beforeEach(() => {
    props = mapDispatchToProps(dispatchMock);
  });

  it('should map the correct function properties', () => {
    expect(props.onWillMount).toBeDefined();
  });

  it('should dispatch fetchPageTemplates if onWillMount is called', () => {
    props.onWillMount();
    expect(dispatchMock).toHaveBeenCalledWith('fetchPageTemplates');
    expect(fetchPageTemplates).toHaveBeenCalled();
  });

  it('should dispatch an action if removePageTemplate is called', () => {
    expect(props.removePageTemplate).toBeDefined();
    props.removePageTemplate(PAGE_TEMPLATE_CODE);
    expect(dispatchMock).toHaveBeenCalled();
    expect(setVisibleModal).toHaveBeenCalledWith(MODAL_ID);
    expect(setInfo).toHaveBeenCalledWith({ type: 'page template', code: PAGE_TEMPLATE_CODE });
  });
});
