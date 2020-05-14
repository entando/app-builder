import { mapStateToProps, mapDispatchToProps } from 'ui/pages/config/ContentPagesContainer';
import { HOMEPAGE_PAYLOAD } from 'test/mocks/pages';
import { getPageTreePages } from 'state/pages/selectors';

jest.mock('state/pages/selectors', () => ({
  getPageTreePages: jest.fn(),
}));

getPageTreePages.mockReturnValue([HOMEPAGE_PAYLOAD]);

const TEST_STATE = {
  pages: HOMEPAGE_PAYLOAD,
  loading: {},
};

describe('ContentPagesContainer', () => {
  describe('mapStateToProps', () => {
    it('maps content and pages property state', () => {
      expect(mapStateToProps(TEST_STATE)).toEqual({
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
