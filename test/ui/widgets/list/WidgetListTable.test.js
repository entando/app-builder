import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import { WIDGET_LIST } from 'test/mocks/widgets';
import WidgetListTable from 'ui/widgets/list/WidgetListTable';
import WidgetListRow from 'ui/widgets/list/WidgetListRow';

const onDelete = jest.fn();
const WIDGETS = WIDGET_LIST.payload;

describe('WidgetListTable', () => {
  let component;
  beforeEach(() => {
    component = shallow(<WidgetListTable title="widgets" widgetList={WIDGETS} locale="en" onDelete={onDelete} />);
  });

  it('renders component without crashing', () => {
    expect(component.exists()).toBe(true);
  });

  it('root component has class WidgetListTable', () => {
    expect(component.hasClass('WidgetListTable')).toBe(true);
  });

  it('renders WidgetSectionTitle sub component', () => {
    expect(component.find('WidgetSectionTitle').exists()).toBe(true);
  });

  it('renders table header with 4 cols', () => {
    expect(component.find('table thead tr th')).toHaveLength(4);
  });

  xit('renders five WidgetListRow', () => {
    expect(component.find(WidgetListRow).exists()).toBe(true);
    expect(component.find(WidgetListRow)).toHaveLength(9);
  });

  it('not renders  WidgetListRow', () => {
    component = shallow(<WidgetListTable title="widgets" widgetList={[]} locale="en" onDelete={onDelete} />);
    expect(component.find(WidgetListRow).exists()).toBe(false);
  });
});
