import React from 'react';
import 'test/enzyme-init';
import { shallow } from 'enzyme';

import PageTemplateListPage from 'ui/page-templates/list/PageTemplateListPage';

describe('PageTemplateListPage', () => {
  let component;
  beforeEach(() => {
    component = shallow(<PageTemplateListPage />);
  });

  it('renders without crashing', () => {
    expect(component.exists()).toEqual(true);
  });

  it('verify if the InternalPage has class PageTemplateListPage', () => {
    expect(component.find('InternalPage').hasClass('PageTemplateListPage')).toEqual(true);
  });

  it('has a breadcrumb', () => {
    expect(component.find('Breadcrumb')).toHaveLength(1);
  });

  it('has a page title', () => {
    expect(component.find('PageTitle')).toHaveLength(1);
  });

  it('has the add button', () => {
    expect(component.find('Button.PageTemplateListPage__add-btn')).toHaveLength(1);
  });
});
