import React from 'react';
import 'test/enzyme-init';

import { shallow } from 'enzyme';

import ListGroupPage from 'ui/groups/list/ListGroupPage';

describe('ListGroupPage', () => {
  let component;
  beforeEach(() => {
    component = shallow(<ListGroupPage />);
  });

  it('renders without crashing', () => {
    expect(component.exists()).toBe(true);
  });

  it('verify if InternalPage component has class ListGroupPage', () => {
    expect(component.find('InternalPage').hasClass('ListGroupPage')).toBe(true);
  });

  it('verify if has a breadcrumb', () => {
    expect(component.find('Breadcrumb').exists());
  });

  it('verify if has a page title', () => {
    expect(component.find('PageTitle').exists());
  });

  it('verify if has the add button', () => {
    expect(component.find('Button.ListGroupPage__add').exists());
  });
});
