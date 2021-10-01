import React from 'react';
import { configEnzymeAdapter } from 'testutils/helpers';
import { shallow } from 'enzyme';
import ContentTypeListPage from 'ui/content-type/ContentTypeListPage';

configEnzymeAdapter();

describe('ContentTypeListPage', () => {
  let component;
  beforeEach(() => {
    component = shallow(<ContentTypeListPage />);
  });

  it('renders without crashing', () => {
    expect(component.exists()).toBe(true);
  });

  it('verify if component has Grid', () => {
    expect(component.find('Grid').exists()).toBe(true);
  });

  it('verify if has a breadcrumb', () => {
    expect(component.find('Breadcrumb').exists());
  });

  it('verify if has a page title', () => {
    expect(component.find('PageTitle').exists());
  });

  it('verify if has the add button', () => {
    expect(component.find('Button.ContentTypeListPage__add').exists());
  });
});
