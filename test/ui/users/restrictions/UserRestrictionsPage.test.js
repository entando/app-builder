import React from 'react';
import 'test/enzyme-init';

import { shallow } from 'enzyme';

import { UserRestrictionsPageBody } from 'ui/users/restrictions/UserRestrictionsPage';
import RestrictionsFormContainer from 'ui/users/restrictions/RestrictionsFormContainer';

describe('UserRestrictionsPage', () => {
  let component;
  beforeEach(() => {
    component = shallow(<UserRestrictionsPageBody />);
  });

  it('renders without crashing', () => {
    expect(component.exists()).toBe(true);
  });

  it('verify if InternalPage component has class UserRestrictionsPage', () => {
    expect(component.find('InternalPage').hasClass('UserRestrictionsPage')).toBe(true);
  });

  it('verify if has a breadcrumb', () => {
    expect(component.find('Breadcrumb').exists());
  });

  it('verify if has a page title', () => {
    expect(component.find('PageTitle').exists());
  });

  it('verify if has the restrictions form', () => {
    expect(component.find(RestrictionsFormContainer).exists());
  });
});
