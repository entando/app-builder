import { mapStateToProps, mapDispatchToProps } from 'ui/pages/config/ContentPagesContainer';
import { HOMEPAGE_PAYLOAD } from 'test/mocks/pages';

jest.mock('state/pages/selectors', () => ({
  getPageTreePages: () => ({
    code: 'homepage',
    status: 'published',
    displayedInMenu: true,
    pageModel: 'complex_model',
    charset: 'utf-8',
    contentType: 'text/xml',
    parentCode: null,
    seo: false,
    position: 1,
    titles: {
      it: 'Pagina iniziale',
      en: 'Home page',
    },
    ownerGroup: 'administrators',
    joinGroups: [
      'administrators',
    ],
    children: [
      'dashboard',
      'service',
      'contacts',
    ],
  }),
}));

const TEST_STATE = {
  pages: HOMEPAGE_PAYLOAD,
};

describe('ContentPagesContainer', () => {
  describe('mapStateToProps', () => {
    it('maps content and pages property state', () => {
      expect(mapStateToProps(TEST_STATE)).toEqual({
        pages: HOMEPAGE_PAYLOAD,
      });
    });
  });

  describe('mapDispatchToProps', () => {
    const dispatchMock = jest.fn();
    let props;

    beforeEach(() => {
      props = mapDispatchToProps(dispatchMock);
    });

    describe('prop onWillMount', () => {
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
});
