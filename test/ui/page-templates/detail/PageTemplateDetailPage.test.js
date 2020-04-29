import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import PageTemplateDetailPage from 'ui/page-templates/detail/PageTemplateDetailPage';

const PAGE_TEMPLATE_CODE = 'page_model_code';

describe('PageTemplateDetailPage', () => {
  beforeEach(jest.clearAllMocks);

  let component;
  beforeEach(() => {
    component = shallow(<PageTemplateDetailPage pageTemplateCode={PAGE_TEMPLATE_CODE} />);
  });

  it('renders without crashing', () => {
    expect(component).toExist();
  });

  it('is a wrapped InternalPage', () => {
    expect(component.first().is('InternalPage')).toBe(true);
  });

  it('has the PageTemplateDetailPage class', () => {
    expect(component.first()).toHaveClassName('PageTemplateDetailPage');
  });

  it('has a breadcrumb', () => {
    expect(component.find('Breadcrumb')).toExist();
  });

  it('has a page title', () => {
    expect(component.find('PageTitle')).toExist();
  });

  it('has the edit button', () => {
    expect(component.find('.PageTemplateDetailPage__edit-btn')).toExist();
  });

  it('has the selected page template info table', () => {
    expect(component.find('SelectedPageTemplateDetailTableContainer')).toExist();
  });

  it('has the selected page template page references table', () => {
    expect(component.find('PageTemplatePageReferencesTableContainer')).toExist();
  });
});
