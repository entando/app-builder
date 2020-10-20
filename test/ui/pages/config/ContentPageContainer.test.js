import { mapStateToProps, mapDispatchToProps } from 'ui/pages/config/ContentPagesContainer';
import { HOMEPAGE_PAYLOAD } from 'test/mocks/pages';
import { getPageTreePages } from 'state/pages/selectors';
import { getLocale } from 'state/locale/selectors';


jest.mock('state/pages/selectors', () => ({
  getPageTreePages: jest.fn(),
}));

jest.mock('state/locale/selectors', () => ({
  getLocale: jest.fn(),
}));

getPageTreePages.mockReturnValue([HOMEPAGE_PAYLOAD]);
getLocale.mockReturnValue('en');

const TEST_STATE = {
  pages: HOMEPAGE_PAYLOAD,
  loading: {},
  domain: 'getDomain_result',
  locale: 'en',
};

describe('ContentPagesContainer', () => {
  describe('mapStateToProps', () => {
    it('maps content and pages property state', () => {
      expect(mapStateToProps(TEST_STATE)).toEqual({
        domain: 'getDomain_result',
        locale: 'en',
        pages: [HOMEPAGE_PAYLOAD],
      });
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
