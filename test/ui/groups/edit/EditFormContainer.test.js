import React from 'react';
import 'test/enzyme-init';
import { mapStateToProps, mapDispatchToProps } from 'ui/groups/edit/EditFormContainer';

jest.mock('state/groups/actions', () => ({
  sendPutGroup: jest.fn().mockReturnValue('sendPutGroup_result'),
  fetchGroup: jest.fn().mockReturnValue('fetchGroup_result'),
}));

const dispatchMock = jest.fn();
jest.mock('frontend-common-components', () => ({
  getParams: jest.fn().mockReturnValue({ groupCode: 'group_code' }),
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

const TEST_STATE = {
  router: {
    params: {
      groupCode: 'group_code',
    },
  },
  mode: 'edit',
  form: {
    group: '',
  },
};

describe('EditFormContainer', () => {
  describe('mapStateToProps', () => {
    it('maps groupCode property state in GroupForm', () => {
      expect(mapStateToProps(TEST_STATE)).toHaveProperty('mode', 'edit');
      expect(mapStateToProps(TEST_STATE)).toHaveProperty('groupCode', 'group_code');
    });
  });

  describe('mapDispatchToProps', () => {
    let props;
    beforeEach(() => {
      props = mapDispatchToProps(dispatchMock);
    });

    it('verify that the "onSubmit" is defined by and dispatch sendPutGroup', () => {
      expect(props.onSubmit).toBeDefined();
      props.onSubmit();
      expect(dispatchMock).toHaveBeenCalledWith('sendPutGroup_result');
    });

    it('verify that "onWillMount" is defined by and dispatch fetchGroup', () => {
      expect(props.onWillMount).toBeDefined();
      props.onWillMount({ groupCode: 'group_code' });
      expect(dispatchMock).toHaveBeenCalledWith('fetchGroup_result');
    });
  });
});
