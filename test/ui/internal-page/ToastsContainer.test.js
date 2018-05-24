import 'test/enzyme-init';

import { mapStateToProps, mapDispatchToProps } from 'ui/internal-page/ToastsContainer';
import { getToasts } from 'state/toasts/selectors';

jest.mock('state/toasts/selectors');

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
