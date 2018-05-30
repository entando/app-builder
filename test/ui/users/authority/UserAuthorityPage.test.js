import React from 'react';
import 'test/enzyme-init';

import { shallow } from 'enzyme';

import UserAuthorityPage from 'ui/users/authority/UserAuthorityPage';

describe('UserListPage', () => {
  let component;
  beforeEach(() => {
    component = shallow(<UserAuthorityPage username="user" />);
  });

  it('renders without crashing', () => {
    expect(component.exists()).toBe(true);
  });

  it('verify if InternalPage component has class authorityPage', () => {
    expect(component.find('InternalPage').hasClass('authorityPage')).toBe(true);
  });

  it('verify if has a breadcrumb', () => {
    expect(component.find('Breadcrumb').exists());
  });

  it('verify if has a page title', () => {
    expect(component.find('PageTitle').exists());
  });
});
