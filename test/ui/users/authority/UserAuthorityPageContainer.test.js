
import 'test/enzyme-init';

import { mapStateToProps } from 'ui/users/authority/UserAuthorityPageContainer';

const TEST_STATE = {
  router: {
    params: {
      username: 'username',
    },
  },
};

jest.mock('frontend-common-components', () => ({
  getParams: jest.fn().mockReturnValue({ username: 'username' }),
  BreadcrumbItem: () => (<span />),
  Link: () => (<span />),
  LoginPage: () => (<span />),
  LoginForm: () => (<span />),
  BrandMenu: () => (<span />),
  ProjectLink: () => (<span />),
  UserDropdown: () => (<span />),
  HelpMenu: () => (<span />),
  AdminAppSwitch: () => (<span />),
  LinkMenuItem: () => (<span />),
  FirstLevelMenuItem: () => (<span />),
  DropdownMenuItem: () => (<span />),
  ActivityStreamMenu: () => (<span />),
  ActivityStream: () => (<span />),
  Notification: () => (<span />),
  routerConfig: jest.fn(),
  gotoRoute: jest.fn(),
  routerReducer: state => state || {},
}));

describe('UserAuthorityPageFormContainer', () => {
  it('maps params state in UserAuthorityPageContainer', () => {
    expect(mapStateToProps(TEST_STATE)).toEqual({ username: 'username' });
  });
});
