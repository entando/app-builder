import React from 'react';
import 'test/enzyme-init';
import { shallow } from 'enzyme';
import { DropdownKebab } from 'patternfly-react';

import DetailWidgetElement from 'ui/widgets/detail/DetailWidgetElement';

const WIDGET_INFO_MOCK = {
  code: 'code',
  data: {
    page1: {
      pageFullPath: '../page1',
      publish: true,
      framePublish: 'top[1]',
      draft: true,
      frameDraft: 'top[1]',
    },
  },
};

describe('ui/widgets/detail/DetailWidgetElement', () => {
  let component;
  beforeEach(() => {
    component = shallow(<DetailWidgetElement widgetInfo={WIDGET_INFO_MOCK} />);
  });

  it('renders component without crashing', () => {
    expect(component.exists()).toBe(true);
  });

  it('table has class DetailWidgetElement__table', () => {
    expect(component.find('table').hasClass('DetailWidgetElement__table')).toBe(true);
  });

  it('renders table header with 4 cols', () => {
    expect(component.find('table thead tr th')).toHaveLength(7);
  });

  it('has seven columns', () => {
    expect(component.find('td')).toHaveLength(7);
  });

  it('has last column is a DropdownKebab Component', () => {
    const last = component.find('td').last();
    expect(last.find(DropdownKebab).exists()).toBe(true);
  });
});
