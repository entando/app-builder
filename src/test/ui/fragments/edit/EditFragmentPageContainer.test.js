import React from 'react';
import 'test/enzyme-init';

import { mapStateToProps, mapDispatchToProps } from 'ui/fragments/edit/EditFragmentPageContainer';
import { GET_FRAGMENT_OK } from 'test/mocks/fragment';

const TEST_STATE = {
  router: {
    params: {
      fragmentCode: 'code',
    },
  },
  mode: 'edit',
  fragmentForm: GET_FRAGMENT_OK.payload,
};

const dispatchMock = jest.fn();
jest.mock('frontend-common-components', () => ({
  getParams: jest.fn().mockReturnValue({ fragmentCode: 'code' }),
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

describe('EditFragmentPageContainer', () => {
  it('maps fragmentCode property state in EditFragmentPage', () => {
    expect(mapStateToProps(TEST_STATE)).toEqual({ fragmentCode: 'code' });
  });

  it('verify that onWillMount and toBeDefined is defined by mapDispatchToProps', () => {
    const result = mapDispatchToProps(dispatchMock);
    expect(result.onWillMount).toBeDefined();
    result.onWillMount({ fragmentCode: 'code' });
    expect(dispatchMock).toHaveBeenCalled();
  });
});
