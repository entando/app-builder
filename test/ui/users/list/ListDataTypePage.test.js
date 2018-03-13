import React from 'react';
import 'test/enzyme-init';

import { shallow } from 'enzyme';

import UserListPage from 'ui/users/list/UserListPage';

describe('UserListPage', () => {
  let component;
  beforeEach(() => {
    component = shallow(<UserListPage />);
  });

  it('renders without crashing', () => {
    expect(component.exists()).toBe(true);
  });

  it('verify if InternalPage component has class UserListPage', () => {
    expect(component.find('InternalPage').hasClass('UserListPage')).toBe(true);
  });

  it('verify if has a breadcrumb', () => {
    expect(component.find('Breadcrumb').exists());
  });

  it('verify if has a page title', () => {
    expect(component.find('PageTitle').exists());
  });

  it('verify if has the add button', () => {
    expect(component.find('Button.UserListPage__add').exists());
  });
});
