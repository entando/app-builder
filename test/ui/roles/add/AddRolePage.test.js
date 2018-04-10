import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import AddRolePage from 'ui/roles/add/AddRolePage';

describe('AddRolePage', () => {
  let component;
  beforeEach(() => {
    component = shallow(<AddRolePage />);
  });
  it('renders without crashing', () => {
    expect(component.exists()).toEqual(true);
  });

  it('verify if exist InternalPage with class AddRolePage', () => {
    expect(component.find('InternalPage').hasClass('AddRolePage')).toEqual(true);
  });

  it('verify if has a breadcrumb', () => {
    expect(component.find('Breadcrumb').exists());
  });

  it('verify if has a page title', () => {
    expect(component.find('PageTitle').exists());
  });
});
