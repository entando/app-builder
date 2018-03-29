import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import AddLabelsPage from 'ui/labels/add/AddLabelsPage';

describe('AddUserPage', () => {
  let component;
  beforeEach(() => {
    component = shallow(<AddLabelsPage />);
  });
  it('renders without crashing', () => {
    expect(component.exists()).toBe(true);
  });

  it('verify if exist InternalPage with class AddUserPage', () => {
    expect(component.find('InternalPage').hasClass('AddLabelsPage')).toBe(true);
  });

  it('verify if has a breadcrumb', () => {
    expect(component.find('Breadcrumb').exists());
  });

  it('verify if has a page title', () => {
    expect(component.find('PageTitle').exists());
  });
});
