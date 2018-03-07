import React from 'react';
import 'test/enzyme-init';
import { shallow } from 'enzyme';

import ListFragmentPage from 'ui/fragments/list/ListFragmentPage';

describe('ListFragmentPage', () => {
  let component;
  beforeEach(() => {
    component = shallow(<ListFragmentPage />);
  });

  it('renders without crashing', () => {
    expect(component.exists()).toEqual(true);
  });

  it('verify if the InternalPage has class ListFragmentPage', () => {
    expect(component.find('InternalPage').hasClass('ListFragmentPage')).toEqual(true);
  });

  it('has a breadcrumb', () => {
    expect(component.find('Breadcrumb')).toHaveLength(1);
  });

  it('has a page title', () => {
    expect(component.find('PageTitle')).toHaveLength(1);
  });

  it('has the add button', () => {
    expect(component.find('Button.ListFragmentPage__add')).toHaveLength(1);
  });
});
