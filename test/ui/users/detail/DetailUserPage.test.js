import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import { DetailUserPageBody } from 'ui/users/detail/DetailUserPage';

describe('AddUserPage', () => {
  let component;
  beforeEach(() => {
    component = shallow(<DetailUserPageBody />);
  });
  it('renders without crashing', () => {
    expect(component.exists()).toEqual(true);
  });

  it('verify if exist InternalPage with class DetailUserPage', () => {
    expect(component.find('InternalPage').hasClass('DetailUserPage')).toBe(true);
  });

  it('verify if has a breadcrumb', () => {
    expect(component.find('Breadcrumb').exists());
  });

  it('verify if has a page title', () => {
    expect(component.find('PageTitle').exists());
  });
});
