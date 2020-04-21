import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import PageTemplateReferenceTable from 'ui/fragments/detail/PageTemplateReferenceTable';

const PAGE_TEMPLATE_MOCK = {
  code: 'pageTemplateCode',
  name: 'My Page Model',
};

describe('PageTemplateReferenceTable', () => {
  let component;
  const referencesPageTemplates = jest.fn();

  const buildPageTemplateReferenceTable = (pageTemplate) => {
    const props = {
      pageTemplate,
      referencesPageTemplates,
    };
    return shallow(<PageTemplateReferenceTable {...props} />);
  };

  it('renders without crashing', () => {
    component = buildPageTemplateReferenceTable();
    expect(component.exists()).toEqual(true);
  });

  it('verify return EmptyData if pageTemplates array is empty', () => {
    component = buildPageTemplateReferenceTable();
    expect(component.find('EmptyData').exists()).toEqual(true);
  });

  it('verify return Table with class PageTemplateReferenceTable if fragments array is not empty', () => {
    const pageTemplate = [PAGE_TEMPLATE_MOCK];
    component = buildPageTemplateReferenceTable(pageTemplate);
    expect(component.find('Table').hasClass('PageTemplateReferenceTable')).toEqual(true);
  });

  it('verify click edit button', () => {
    const pageTemplate = [PAGE_TEMPLATE_MOCK];
    component = buildPageTemplateReferenceTable(pageTemplate);
    const preventDefault = jest.fn();
    component.find('MenuItem').simulate('click', { preventDefault });
    expect(referencesPageTemplates).toHaveBeenCalled();
    expect(referencesPageTemplates).toHaveBeenCalledWith(PAGE_TEMPLATE_MOCK);
  });
});
