import 'test/enzyme-init';

import { mapStateToProps, mapDispatchToProps } from 'ui/dashboard/IntegrationsContainer';

const TEST_STATE = {
  dashboard: {
    integrations: {
      plugins: 2,
      apis: 5,
    },
  },
};

describe('IntegrationsContainer', () => {
  it('maps apis and plugins properties', () => {
    expect(mapStateToProps(TEST_STATE)).toEqual({
      plugins: 2,
      apis: 5,
    });
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
