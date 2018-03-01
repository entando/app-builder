import React from 'react';
import 'test/enzyme-init';

import { mapStateToProps, mapDispatchToProps } from 'ui/fragments/detail/DetailFragmentPageContainer';

const MOCK_DATA = {
  code: 'code',
  fragments: [
    { code: 'fragmentCode' },
  ],
  pageModels: [
    { code: 'pageModelCode', name: 'My Page Model' }],
  pluginCode: 'pluginCode',
  widgetType: { code: 'widgetcode', title: 'Widget Title' },
};
const TEST_STATE = {
  fragmentForm: {
    fragmentValues: MOCK_DATA,
  },
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


describe('DetailFragmentPageContainer', () => {
  it('maps groups and mode property state in DetailFragmentPage', () => {
    expect(mapStateToProps(TEST_STATE)).toEqual(MOCK_DATA);
  });


  it('verify that onWillMount is defined by mapDispatchToProps', () => {
    const result = mapDispatchToProps(dispatchMock);
    expect(result.onWillMount).toBeDefined();
    result.onWillMount('code');
    expect(dispatchMock).toHaveBeenCalled();
  });

  it('verify that handleEdit is defined by mapDispatchToProps', () => {
    const result = mapDispatchToProps(dispatchMock);
    expect(result.handleEdit).toBeDefined();
    result.handleEdit();
    expect(dispatchMock).toHaveBeenCalled();
  });

  it('verify that referencesFragments is defined by mapDispatchToProps', () => {
    const result = mapDispatchToProps(dispatchMock);
    expect(result.referencesFragments).toBeDefined();
    result.referencesFragments();
    expect(dispatchMock).toHaveBeenCalled();
  });

  it('verify that referencesPageModels is defined by mapDispatchToProps', () => {
    const result = mapDispatchToProps(dispatchMock);
    expect(result.referencesPageModels).toBeDefined();
    result.referencesPageModels();
    expect(dispatchMock).toHaveBeenCalled();
  });
});
