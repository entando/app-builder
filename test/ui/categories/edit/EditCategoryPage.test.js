import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import EditCategoryPage from 'ui/categories/edit/EditCategoryPage';

describe('EditCategoryPage', () => {
  let component;
  beforeEach(() => {
    component = shallow(<EditCategoryPage />);
  });
  it('renders without crashing', () => {
    expect(component).toExist();
  });

  it('verify if exist InternalPage with class EditCategoryPage', () => {
    expect(component.find('InternalPage').hasClass('EditCategoryPage')).toBe(true);
  });

  it('verify if has a breadcrumb', () => {
    expect(component.find('Breadcrumb')).toExist();
  });

  it('verify if has a page title', () => {
    expect(component.find('PageTitle')).toExist();
  });
});
