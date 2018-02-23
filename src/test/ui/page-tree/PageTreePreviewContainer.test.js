
import { mapStateToProps } from 'ui/page-tree/PageTreePreviewContainer';

const FAKE_STATE = {
  locale: 'en',
};

describe('ui/page-tree/PageTreePreviewContainer', () => {
  beforeEach(jest.clearAllMocks);

  describe('mapStateToProps', () => {
    it('should map the correct properties', () => {
      const props = mapStateToProps(FAKE_STATE);
      expect(props.locale).toBeDefined();
    });
  });
});
