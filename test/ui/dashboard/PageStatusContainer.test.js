import 'test/enzyme-init';

import { mapStateToProps, mapDispatchToProps } from 'ui/dashboard/PageStatusContainer';

const TEST_STATE = {
  dashboard: {
    pageStatus: {
      draft: 2,
      published: 5,
      unpublished: 1,
    },
  },
};

describe('PageStatusContainer', () => {
  it('maps the pageStatus property', () => {
    expect(mapStateToProps(TEST_STATE)).toEqual({
      pageStatus: TEST_STATE.dashboard.pageStatus,
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
