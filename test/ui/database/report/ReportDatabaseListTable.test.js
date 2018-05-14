import React from 'react';
import 'test/enzyme-init';
import { shallow } from 'enzyme';

import ReportDatabaseListTable from 'ui/database/report/ReportDatabaseListTable';


describe('ReportDatabaseListTable', () => {
  let component;
  beforeEach(() => {
    component = shallow(<ReportDatabaseListTable />);
  });

  it('renders component without crashing', () => {
    expect(component.exists()).toBe(true);
  });

  it('root component has class ReportDatabaseListTable', () => {
    expect(component.hasClass('ReportDatabaseListTable')).toBe(true);
  });

  it('has no rows', () => {
    const tbody = component.find('tbody');
    expect(tbody).toHaveLength(1);
    expect(tbody.find('tr')).toHaveLength(0);
  });

  describe('with componentsHistory data', () => {
    beforeEach(() => {
      const report = {
        componentsHistory: [
          {
            date: '2018-03-27 11:15:04',
            code: 'dumpCode1',
          },
        ],
      };
      component = shallow(<ReportDatabaseListTable report={report} />);
    });
    it('has table with data', () => {
      expect(component.find('table').exists()).toBe(true);
    });

    it('has a table header', () => {
      const thead = component.find('thead');
      expect(thead).toHaveLength(1);
      expect(thead.find('th')).toHaveLength(2);
    });

    it('has one rows', () => {
      const tbody = component.find('tbody');
      expect(tbody).toHaveLength(1);
      expect(tbody.find('tr')).toHaveLength(1);
    });
  });

  it('has ReportDatabaseListDataSource component ', () => {
    expect(component.find('ReportDatabaseListDataSource').exists()).toBe(true);
  });
});
