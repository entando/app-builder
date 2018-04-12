import 'test/enzyme-init';

import
PageModelPageReferencesTableContainer,
{ mapDispatchToProps, mapStateToProps } from 'ui/page-models/detail/PageModelPageReferencesTableContainer';
import { fetchCurrentReferencePages } from 'state/page-models/actions';
import { getCurrentPage, getTotalItems, getPageSize } from 'state/pagination/selectors';
import { getLocalizedPageModelPageRefs } from 'state/page-models/selectors';
import { getLoading } from 'state/loading/selectors';
import { PAGE_REFS } from 'test/mocks/pageModels';

const dispatchMock = jest.fn();
const PAGE = 1;
const PAGE_SIZE = 10;
const TOTAL_ITEMS = 100;
const FETCH_PAGE_REFS_ACTION = {
  type: 'fetch-page-refs',
};

jest.mock('state/page-models/selectors', () => ({
  getLocalizedPageModelPageRefs: jest.fn(),
}));

jest.mock('state/page-models/actions', () => ({
  fetchCurrentReferencePages: jest.fn(),
}));

jest.mock('state/loading/selectors', () => ({
  getLoading: jest.fn(),
}));

jest.mock('state/pagination/selectors', () => ({
  getCurrentPage: jest.fn(),
  getTotalItems: jest.fn(),
  getPageSize: jest.fn(),
}));


describe('PageModelPageReferencesTableContainer', () => {
  it('has the right display name', () => {
    expect(PageModelPageReferencesTableContainer)
      .toHaveProperty('displayName', 'PageModelPageReferencesTableContainer');
  });

  let props;
  describe('mapDispatchToProps', () => {
    beforeEach(() => {
      fetchCurrentReferencePages.mockReturnValue(FETCH_PAGE_REFS_ACTION);
      props = mapDispatchToProps(dispatchMock);
    });

    it('should dispatch an action if onWillMount is called', () => {
      expect(props.onWillMount).toBeInstanceOf(Function);
      props.onWillMount();
      expect(dispatchMock).toHaveBeenCalledWith(FETCH_PAGE_REFS_ACTION);
      expect(fetchCurrentReferencePages).toHaveBeenCalled();
    });
  });

  describe('mapStateToProps', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      getLoading.mockReturnValue({ references: false });
      getCurrentPage.mockReturnValue(PAGE);
      getTotalItems.mockReturnValue(TOTAL_ITEMS);
      getPageSize.mockReturnValue(PAGE_SIZE);
      getLocalizedPageModelPageRefs.mockReturnValue(PAGE_REFS);
      props = mapStateToProps();
    });

    it('maps prop totalItems', () => {
      expect(props).toHaveProperty('totalItems', TOTAL_ITEMS);
    });

    it('maps prop page', () => {
      expect(props).toHaveProperty('page', PAGE);
    });

    it('maps prop pageSize', () => {
      expect(props).toHaveProperty('pageSize', PAGE_SIZE);
    });

    it('maps prop pageReferences', () => {
      expect(props).toHaveProperty('pageReferences', PAGE_REFS);
    });

    it('maps prop loading', () => {
      expect(props).toHaveProperty('loading', false);
    });
  });
});
