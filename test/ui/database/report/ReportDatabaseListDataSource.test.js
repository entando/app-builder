import React from 'react';
import 'test/enzyme-init';
import { shallow } from 'enzyme';

import ReportDatabaseListDataSource from 'ui/database/report/ReportDatabaseListDataSource';

describe('ReportDatabaseListDataSource', () => {
  let component;
  beforeEach(() => {
    component = shallow(<ReportDatabaseListDataSource />);
  });

  it('renders without crashing', () => {
    expect(component.exists()).toBe(true);
  });

  it('has class ReportDatabaseListDataSource', () => {
    expect(component.hasClass('ReportDatabaseListDataSource')).toBe(true);
  });
});
