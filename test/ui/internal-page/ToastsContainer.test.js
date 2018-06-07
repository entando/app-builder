import 'test/enzyme-init';
import { getToasts } from '@entando/messages';

import { mapStateToProps, mapDispatchToProps } from 'ui/internal-page/ToastsContainer';

const mockToasts = {
  a: {
    message: 'whatever',
    type: 'success',
  },
};

getToasts.mockReturnValue(mockToasts);

describe('ToastsContainer', () => {
  it('maps the toasts property', () => {
    expect(mapStateToProps({})).toEqual({
      toasts: mockToasts,
    });
  });

  describe('mapDispatchToProps', () => {
    let props;

    beforeEach(() => {
      props = mapDispatchToProps(jest.fn());
    });

    it('should map the correct function properties', () => {
      expect(props).toHaveProperty('onDismiss', expect.any(Function));
    });
  });
});
