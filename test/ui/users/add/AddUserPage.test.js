import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import { AddUserPageBody } from 'ui/users/add/AddUserPage';

describe('AddUserPage', () => {
  let component;
  beforeEach(() => {
    component = shallow(<AddUserPageBody />);
  });
  it('renders without crashing', () => {
    expect(component.exists()).toEqual(true);
  });

  it('verify if exist InternalPage with class AddUserPage', () => {
    expect(component.find('InternalPage').hasClass('AddUserPage')).toEqual(true);
  });

  it('verify if has a breadcrumb', () => {
    expect(component.find('Breadcrumb').exists());
  });

  it('verify if has a page title', () => {
    expect(component.find('PageTitle').exists());
  });
});
