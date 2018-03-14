import React from 'react';
import 'test/enzyme-init';

import { shallow } from 'enzyme';

import ListDataTypePage from 'ui/data-types/list/ListDataTypePage';

describe('ListDataTypePage', () => {
  let component;
  beforeEach(() => {
    component = shallow(<ListDataTypePage />);
  });

  it('renders without crashing', () => {
    expect(component.exists()).toBe(true);
  });

  it('verify if InternalPage component has class ListDataTypePage', () => {
    expect(component.find('InternalPage').hasClass('ListDataTypePage')).toBe(true);
  });

  it('verify if has a breadcrumb', () => {
    expect(component.find('Breadcrumb').exists());
  });

  it('verify if has a page title', () => {
    expect(component.find('PageTitle').exists());
  });

  it('verify if has the add button', () => {
    expect(component.find('Button.ListDataTypePage__add').exists());
  });
});
