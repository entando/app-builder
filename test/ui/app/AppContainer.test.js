import 'test/enzyme-init';

import { mapStateToProps } from 'ui/app/AppContainer';

jest.unmock('frontend-common-components');

const TEST_STATE = {
  router: { route: 'page' },
  currentUser: { username: 'admin' },
};

describe('AppContainer', () => {
  it('maps route property with state.router.route', () => {
    expect(mapStateToProps(TEST_STATE)).toEqual({
      route: 'page',
      username: 'admin',
    });
  });
});
