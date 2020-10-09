import { mapStateToProps, mapDispatchToProps } from 'ui/pages/config/ContentPagesContainer';
import { HOMEPAGE_PAYLOAD, SEARCH_PAGES } from 'test/mocks/pages';
import { getPageTreePages, getSearchPages } from 'state/pages/selectors';

jest.mock('state/pages/selectors', () => ({
  getPageTreePages: jest.fn(),
  getSearchPages: jest.fn(),
}));

jest.mock('state/pagination/selectors', () => ({
  getCurrentPage: jest.fn(),
  getTotalItems: jest.fn(),
  getPageSize: jest.fn(),
}));

getPageTreePages.mockReturnValue([HOMEPAGE_PAYLOAD]);
getSearchPages.mockReturnValue([SEARCH_PAGES]);

describe('ContentPagesContainer', () => {
  describe('mapStateToProps', () => {
    it('maps the correct properties', () => {
      const props = mapStateToProps({ loading: {} });
      expect(props).toHaveProperty('pages');
      expect(props).toHaveProperty('searchPages');
      expect(props).toHaveProperty('loading');
      expect(props).toHaveProperty('locale');
      expect(props).toHaveProperty('page');
      expect(props).toHaveProperty('totalItems');
      expect(props).toHaveProperty('pageSize');
    });
  });

  describe('mapDispatchToProps', () => {
    const dispatchMock = jest.fn();
    let props;

    beforeEach(() => {
      props = mapDispatchToProps(dispatchMock);
    });

    it('should map the correct function properties', () => {
      expect(props.onWillMount).toBeDefined();
      expect(props.onExpandPage).toBeDefined();
      expect(props.onClickAdd).toBeDefined();
      expect(props.onClickDelete).toBeDefined();
      expect(props.onClickPublish).toBeDefined();
      expect(props.onClickUnPublish).toBeDefined();
      expect(props.onClickClone).toBeDefined();
      expect(props.onExpandAll).toBeDefined();
      expect(props.onCollapseAll).toBeDefined();
      expect(props.onPageSearch).toBeDefined();
      expect(props.onClear).toBeDefined();
    });

    it('should dispatch an action if onWillMount is called', () => {
      props.onWillMount();
      expect(dispatchMock).toHaveBeenCalled();
    });

    it('should dispatch an action if onExpandPage is called', () => {
      props.onExpandPage('page');
      expect(dispatchMock).toHaveBeenCalled();
    });
  });
});
