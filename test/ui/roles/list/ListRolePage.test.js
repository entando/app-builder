import React from 'react';
import 'test/enzyme-init';

import { shallow } from 'enzyme';

import { ListRolePageBody } from 'ui/roles/list/ListRolePage';

describe('ListRolePage', () => {
  let component;
  beforeEach(() => {
    component = shallow(<ListRolePageBody />);
  });

  it('renders without crashing', () => {
    expect(component.exists()).toBe(true);
  });

  it('verify if InternalPage component has class ListRolePage', () => {
    expect(component.find('InternalPage').hasClass('ListRolePage')).toBe(true);
  });

  it('verify if has a breadcrumb', () => {
    expect(component.find('Breadcrumb').exists());
  });

  it('verify if has a page title', () => {
    expect(component.find('PageTitle').exists());
  });

  it('verify if has the add button', () => {
    expect(component.find('Button.ListRolePage__add').exists());
  });
});
