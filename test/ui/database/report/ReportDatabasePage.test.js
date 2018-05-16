import React from 'react';
import 'test/enzyme-init';
import { shallow } from 'enzyme';

import { DATABASE_DUMP_REPORT_LIST } from 'test/mocks/database';
import ReportDatabasePage from 'ui/database/report/ReportDatabasePage';

const props = {
  onWillMount: jest.fn(),
  report: DATABASE_DUMP_REPORT_LIST[0],
};

describe('ReportDatabasePage', () => {
  let component;
  beforeEach(() => {
    component = shallow(<ReportDatabasePage {...props} />);
  });

  it('renders without crashing', () => {
    expect(component.exists()).toBe(true);
  });

  it('verify if the InternalPage has class ReportDatabasePage', () => {
    expect(component.find('InternalPage').hasClass('ReportDatabasePage')).toEqual(true);
  });

  it('has a breadcrumb', () => {
    expect(component.find('Breadcrumb')).toHaveLength(1);
  });

  it('has a page title', () => {
    expect(component.find('PageTitle')).toHaveLength(1);
  });

  it('has a ReportDatabaseListTable component', () => {
    expect(component.find('ReportDatabaseListTable').exists()).toBe(true);
  });
});
