import 'test/enzyme-init';

import { mapStateToProps, mapDispatchToProps } from 'ui/internal-page/UserMenuContainer';

const TEST_STATE = {
  currentUser: {
    username: 'entando',
  },
};

describe('UserMenuContainer', () => {
  it('maps the username property', () => {
    expect(mapStateToProps(TEST_STATE)).toEqual({
      username: TEST_STATE.currentUser.username,
    });
  });

  describe('mapDispatchToProps', () => {
    let props;

    beforeEach(() => {
      props = mapDispatchToProps(jest.fn());
    });

    it('should map the correct function properties', () => {
      expect(props).toHaveProperty('logout', expect.any(Function));
    });
  });
});
