
import { mapStateToProps, mapDispatchToProps } from 'ui/pages/common/PageTreeSelectorContainer';

const FAKE_STATE = {
  locale: 'en',
  pages: {
    map: {},
    childrenMap: {},
    titlesMap: {},
  },
  loading: {},
};

const dispatchMock = jest.fn();

describe('PageTreeSelectorContainer', () => {
  beforeEach(jest.clearAllMocks);

  describe('mapStateToProps', () => {
    it('should map the correct properties', () => {
      const props = mapStateToProps(FAKE_STATE, {});
      expect(props.pages).toBeDefined();
    });
  });

  describe('mapDispatchToProps', () => {
    let props;
    beforeEach(() => {
      props = mapDispatchToProps(dispatchMock);
    });

    it('should map the correct function properties', () => {
      expect(props.onExpandPage).toBeDefined();
    });

    it('should dispatch an action if onExpandPage is called', () => {
      props.onExpandPage('pagecode');
      expect(dispatchMock).toHaveBeenCalled();
    });
  });
});
