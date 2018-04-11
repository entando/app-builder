import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import EditRolePage from 'ui/roles/edit/EditRolePage';

describe('EditRolePage', () => {
  let component;
  beforeEach(() => {
    component = shallow(<EditRolePage />);
  });
  it('renders without crashing', () => {
    expect(component.exists()).toEqual(true);
  });

  it('verify if exist InternalPage with class EditRolePage', () => {
    expect(component.find('InternalPage').hasClass('EditRolePage')).toEqual(true);
  });

  it('verify if has a breadcrumb', () => {
    expect(component.find('Breadcrumb').exists());
  });

  it('verify if has a page title', () => {
    expect(component.find('PageTitle').exists());
  });
});
