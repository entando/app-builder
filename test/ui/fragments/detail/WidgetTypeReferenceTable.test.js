import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import WidgetTypeReferenceTable from 'ui/fragments/detail/WidgetTypeReferenceTable';

const WIDGET_MOCK = {
  code: 'widgetcode',
  title: 'Widget Title',
};

describe('WidgetTypeReferenceTable', () => {
  let component;

  const buildWidgetTypeReferenceTable = (widgetType = null) => {
    const props = {
      widgetType,
    };
    return shallow(<WidgetTypeReferenceTable {...props} />);
  };

  it('renders without crashing', () => {
    component = buildWidgetTypeReferenceTable();
    expect(component.exists()).toEqual(true);
  });

  it('verify return EmptyData if WidgetType is null', () => {
    component = buildWidgetTypeReferenceTable();
    expect(component.find('EmptyData').exists()).toEqual(true);
  });

  it('verify return Table with class PageTemplateReferenceTable if fragments array is not empty', () => {
    component = buildWidgetTypeReferenceTable(WIDGET_MOCK);
    expect(component.find('Table').hasClass('WidgetTypeReferenceTable')).toEqual(true);
  });
});
