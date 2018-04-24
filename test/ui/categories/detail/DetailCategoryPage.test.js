import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import DetailCategoryPage from 'ui/categories/detail/DetailCategoryPage';

describe('DetailCategoryPage', () => {
  let component;
  beforeEach(() => {
    component = shallow(<DetailCategoryPage />);
  });
  it('renders without crashing', () => {
    expect(component).toExist();
  });

  it('verify if exist InternalPage with class DetailCategoryPage', () => {
    expect(component.find('InternalPage').hasClass('DetailCategoryPage')).toBe(true);
  });

  it('verify if has a breadcrumb', () => {
    expect(component.find('Breadcrumb')).toExist();
  });

  it('verify if has a page title', () => {
    expect(component.find('PageTitle')).toExist();
  });
});
