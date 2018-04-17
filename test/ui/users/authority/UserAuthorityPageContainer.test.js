import React from 'react';
import 'test/enzyme-init';
import { getParams } from '@entando/router';

import { mapStateToProps } from 'ui/users/authority/UserAuthorityPageContainer';

const TEST_STATE = {
  router: {
    params: {
      username: 'username',
    },
  },
};

getParams.mockReturnValue({ username: 'username' });

jest.mock('frontend-common-components', () => ({
  BreadcrumbItem: () => (<span />),
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
}));

describe('UserAuthorityPageFormContainer', () => {
  it('maps params state in UserAuthorityPageContainer', () => {
    expect(mapStateToProps(TEST_STATE)).toEqual({ username: 'username' });
  });
});
