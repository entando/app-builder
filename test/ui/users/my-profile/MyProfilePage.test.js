import React from 'react';
import 'test/enzyme-init';

import { shallow } from 'enzyme';

import MyProfilePage from 'ui/users/my-profile/MyProfilePage';
import ErrorsAlertContainer from 'ui/common/form/ErrorsAlertContainer';
import PasswordFormContainer from 'ui/users/my-profile/PasswordFormContainer';

describe('MyProfilePage', () => {
  let component;
  beforeEach(() => {
    component = shallow(<MyProfilePage />);
  });

  it('renders without crashing', () => {
    expect(component.exists()).toBe(true);
  });

  it('verify if InternalPage component has class MyProfilePage', () => {
    expect(component.find('InternalPage').hasClass('MyProfilePage')).toBe(true);
  });

  it('verify if has a breadcrumb', () => {
    expect(component.find('Breadcrumb').exists());
  });

  it('verify if has a page title', () => {
    expect(component.find('PageTitle').exists());
  });

  it('has the errors container', () => {
    expect(component.find(ErrorsAlertContainer).exists());
  });

  it('verify if has the password form', () => {
    expect(component.find(PasswordFormContainer).exists());
  });
});
