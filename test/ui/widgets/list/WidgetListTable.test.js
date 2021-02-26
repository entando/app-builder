import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import { WIDGET_LIST } from 'test/mocks/widgets';
import { WidgetListTableBody as WidgetListTable } from 'ui/widgets/list/WidgetListTable';

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

  it('renders DataTable component', () => {
    expect(component.find('DataTable').exists()).toBe(true);
  });
});
