
import { mapStateToProps, mapDispatchToProps } from 'ui/page-tree/PageTreeContainer';

const FAKE_STATE = {
  locale: 'en',
  pages: [],
};

const dispatchMock = jest.fn();

describe('ui/page-tree/PageTreeContainer', () => {
  beforeEach(jest.clearAllMocks);

  describe('mapStateToProps', () => {
    it('should map the correct properties', () => {
      const props = mapStateToProps(FAKE_STATE);
      expect(props.locale).toBeDefined();
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

    it('should not dispatch an action if a placeholder callback is called', () => {
      props.onDropIntoPage('a', 'b');
      props.onDropAbovePage('a', 'b');
      props.onDropBelowPage('a', 'b');
      expect(dispatchMock).not.toHaveBeenCalled();
    });
  });
});
