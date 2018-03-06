import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import WidgetListTable from 'ui/widgets/list/WidgetListTable';

describe('WidgetListTable', () => {
  let component;
  beforeEach(() => {
    component = shallow(<WidgetListTable />);
  });
  it('renders component without crashing', () => {
    expect(component.exists()).toEqual(true);
  });
  it('root component has class WidgetListTable', () => {
    expect(component.hasClass('WidgetListTable')).toEqual(true);
  });
  it('renders WidgetSectionTitle sub component', () => {
    expect(component.find('WidgetSectionTitle').exists()).toEqual(true);
  });
  describe('inner table', () => {
    const children = (
      <tr>
        <td>widget name</td>
        <td>widget code</td>
        <td>used</td>
        <td>action</td>
      </tr>
    );
    it('renders table header with 4 cols', () => {
      expect(component.find('table thead tr th')).toHaveLength(4);
    });
    it('renders table with children', () => {
      component = shallow(<WidgetListTable >{children}</WidgetListTable>);
      expect(component.find('table tbody tr').exists()).toEqual(true);
      expect(component.find('table tbody tr td')).toHaveLength(4);
    });
  });
});
