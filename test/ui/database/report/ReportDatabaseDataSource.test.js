import React from 'react';
import 'test/enzyme-init';
import { shallow } from 'enzyme';
import { Link } from '@entando/router';

import ReportDatabaseDataSource from 'ui/database/report/ReportDatabaseDataSource';

const props = {
  datasource: 'datasource',
  onClickDump: jest.fn(),
  tables: [
    {
      tableName: 'name1',
      rows: 10,
      requiredTime: 10,
    },
    {
      tableName: 'name2',
      rows: 0,
      requiredTime: 0,
    },
  ],
};


describe('ReportDatabaseDataSource', () => {
  let component;
  beforeEach(() => {
    component = shallow(<ReportDatabaseDataSource {...props} />);
  });

  it('renders without crashing', () => {
    expect(component.exists()).toBe(true);
  });

  it('has a table', () => {
    expect(component.find('table')).toHaveLength(1);
  });

  it('has a table header', () => {
    const thead = component.find('thead');
    expect(thead).toHaveLength(1);
    expect(thead.find('th')).toHaveLength(3);
  });

  it('has two rows', () => {
    const tbody = component.find('tbody');
    expect(tbody).toHaveLength(1);
    expect(tbody.find('tr')).toHaveLength(2);
  });

  it('has one link for download', () => {
    const link = component.find(Link);
    expect(link).toHaveLength(1);
  });

  it('when on click one onClickDump', () => {
    component.find(Link).simulate('click');
    expect(props.onClickDump).toHaveBeenCalledWith('datasource', 'name1');
  });
});
