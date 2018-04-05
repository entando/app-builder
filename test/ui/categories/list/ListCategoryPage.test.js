import React from 'react';
import 'test/enzyme-init';

import { shallow } from 'enzyme';

import ListCategoryPage from 'ui/categories/list/ListCategoryPage';

describe('ListCategoryPage', () => {
  let component;
  beforeEach(() => {
    component = shallow(<ListCategoryPage />);
  });

  it('renders without crashing', () => {
    expect(component.exists()).toBe(true);
  });

  it('verify if InternalPage component has class ListCategoryPage', () => {
    expect(component.find('InternalPage').hasClass('ListCategoryPage')).toBe(true);
  });

  it('verify if has a breadcrumb', () => {
    expect(component.find('Breadcrumb').exists());
  });

  it('verify if has a page title', () => {
    expect(component.find('PageTitle').exists());
  });

  it('verify if has the add button', () => {
    expect(component.find('Button.ListCategoryPage__add').exists());
  });
});
