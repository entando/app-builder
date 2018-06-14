import 'test/enzyme-init';

import { mapStateToProps, mapDispatchToProps } from 'ui/dashboard/LanguagesContainer';


jest.mock('state/languages/selectors', () => ({
  getActiveLanguages: jest.fn().mockReturnValue(['it', 'en']),
}));

describe('LanguagesContainer', () => {
  it('maps activeLanguages properties', () => {
    const props = mapStateToProps({});
    expect(props).toHaveProperty('activeLanguages');
  });

  describe('mapDispatchToProps', () => {
    let props;

    beforeEach(() => {
      props = mapDispatchToProps(jest.fn());
    });

    it('should map the correct function properties', () => {
      expect(props).toHaveProperty('onWillMount', expect.any(Function));
    });
  });
});
