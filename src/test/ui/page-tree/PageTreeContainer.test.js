
import { mapStateToProps, mapDispatchToProps } from 'ui/page-tree/PageTreeContainer';

const FAKE_STATE = {
  locale: 'en',
  pages: {
    map: {},
    childrenMap: {},
    titlesMap: {},
  },
};

const dispatchMock = jest.fn();

describe('ui/page-tree/PageTreeContainer', () => {
  beforeEach(jest.clearAllMocks);

  describe('mapStateToProps', () => {
    it('should map the correct properties', () => {
      const props = mapStateToProps(FAKE_STATE);
      expect(props.pages).toBeDefined();
    });
  });

  describe('mapDispatchToProps', () => {
    let props;
    beforeEach(() => {
      props = mapDispatchToProps(dispatchMock);
    });

    it('should map the correct function properties', () => {
      expect(props.onDropIntoPage).toBeDefined();
      expect(props.onDropAbovePage).toBeDefined();
      expect(props.onDropBelowPage).toBeDefined();
      expect(props.onExpandPage).toBeDefined();
    });

    it('should dispatch an action if onExpandPage is called', () => {
      props.onExpandPage('pagecode');
      expect(dispatchMock).toHaveBeenCalled();
    });

    it('should dispatch an action if onDropIntoPage is called', () => {
      props.onDropIntoPage('a', 'b');
      expect(dispatchMock).toHaveBeenCalled();
    });

    it('should dispatch an action if onDropAbovePage is called', () => {
      props.onDropAbovePage('a', 'b');
      expect(dispatchMock).toHaveBeenCalled();
    });

    it('should dispatch an action if onDropBelowPage is called', () => {
      props.onDropBelowPage('a', 'b');
      expect(dispatchMock).toHaveBeenCalled();
    });
  });
});
