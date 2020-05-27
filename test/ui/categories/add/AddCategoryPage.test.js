import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import { AddCategoryPageBody } from 'ui/categories/add/AddCategoryPage';

describe('AddCategoryPage', () => {
  let component;
  beforeEach(() => {
    component = shallow(<AddCategoryPageBody />);
  });
  it('renders without crashing', () => {
    expect(component).toExist();
  });

  it('verify if exist InternalPage with class AddCategoryPage', () => {
    expect(component.find('InternalPage').hasClass('AddCategoryPage')).toBe(true);
  });

  it('verify if has a breadcrumb', () => {
    expect(component.find('Breadcrumb')).toExist();
  });

  it('verify if has a page title', () => {
    expect(component.find('PageTitle')).toExist();
  });
});
