import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import DataModelListTable from 'ui/data-models/list/DataModelListTable';

describe('DataModelListTable', () => {
  let component;
  beforeEach(() => {
    component = shallow(<DataModelListTable />);
  });
  it('renders component without crashing', () => {
    expect(component.exists()).toEqual(true);
  });
  it('root component has class DataModelListTable', () => {
    expect(component.hasClass('DataModelListTable')).toEqual(true);
  });
  describe('inner table', () => {
    const children = (
      <tr>
        <td>Name</td>
        <td>Type</td>
        <td>Id</td>
        <td>Action</td>
      </tr>
    );
    it('renders table header with 4 cols', () => {
      expect(component.find('table thead tr th')).toHaveLength(4);
    });
    it('renders table with children', () => {
      component = shallow(<DataModelListTable >{children}</DataModelListTable>);
      expect(component.find('table tbody tr').exists()).toEqual(true);
      expect(component.find('table tbody tr td')).toHaveLength(4);
    });
  });
});
