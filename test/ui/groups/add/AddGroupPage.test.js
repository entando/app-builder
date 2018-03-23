import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import AddGroupPage from 'ui/groups/add/AddGroupPage';

describe('AddGroupPage', () => {
  let component;
  beforeEach(() => {
    component = shallow(<AddGroupPage />);
  });
  it('renders without crashing', () => {
    expect(component.exists()).toEqual(true);
  });

  it('verify if exist InternalPage with class AddGroupPage', () => {
    expect(component.find('InternalPage').hasClass('AddGroupPage')).toEqual(true);
  });

  it('verify if has a breadcrumb', () => {
    expect(component.find('Breadcrumb').exists());
  });

  it('verify if has a page title', () => {
    expect(component.find('PageTitle').exists());
  });
});
