import 'test/enzyme-init';

import { mapStateToProps, mapDispatchToProps } from 'ui/internal-page/LanguageSelectContainer';

const TEST_STATE = {
  locale: 'en',
};

describe('LanguageSelectContainer', () => {
  it('maps the currentLanguage property', () => {
    expect(mapStateToProps(TEST_STATE)).toEqual({
      currentLanguage: TEST_STATE.locale,
    });
  });

  describe('mapDispatchToProps', () => {
    let props;

    beforeEach(() => {
      props = mapDispatchToProps(jest.fn());
    });

    it('should map the correct function properties', () => {
      expect(props).toHaveProperty('onSelect', expect.any(Function));
    });
  });
});
