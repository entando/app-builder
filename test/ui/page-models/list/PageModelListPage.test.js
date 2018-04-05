import React from 'react';
import 'test/enzyme-init';
import { shallow } from 'enzyme';

import PageModelListPage from 'ui/page-models/list/PageModelListPage';

describe('PageModelListPage', () => {
  let component;
  beforeEach(() => {
    component = shallow(<PageModelListPage />);
  });

  it('renders without crashing', () => {
    expect(component.exists()).toEqual(true);
  });

  it('verify if the InternalPage has class PageModelListPage', () => {
    expect(component.find('InternalPage').hasClass('PageModelListPage')).toEqual(true);
  });

  it('has a breadcrumb', () => {
    expect(component.find('Breadcrumb')).toHaveLength(1);
  });

  it('has a page title', () => {
    expect(component.find('PageTitle')).toHaveLength(1);
  });

  it('has the add button', () => {
    expect(component.find('Button.PageModelListPage__add-btn')).toHaveLength(1);
  });
});
