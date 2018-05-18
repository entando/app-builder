import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import { DATABASE_DUMP_REPORT_LIST } from 'test/mocks/database';
import DatabaseListTable from 'ui/database/list/DatabaseListTable';

const props = {
  databases: DATABASE_DUMP_REPORT_LIST,
  onWillMount: jest.fn(),
  onClickDelete: jest.fn(),
};

describe('DatabaseListTable', () => {
  let component;
  beforeEach(() => {
    component = shallow(<DatabaseListTable {...props} />);
  });

  it('renders component without crashing', () => {
    expect(component.exists()).toBe(true);
  });

  it('root component has class DatabaseListTable', () => {
    expect(component.hasClass('DatabaseListTable')).toBe(true);
  });

  it('renders table header with 4 cols', () => {
    expect(component.find('table thead tr th')).toHaveLength(4);
  });

  it('call onClickDelete', () => {
    component.find('.UserAuthorityTable__delete-tag-btn').first().simulate('click');
    expect(props.onClickDelete).toHaveBeenCalled();
  });

  it('show Alert where databases is empty', () => {
    component = shallow(<DatabaseListTable {...props} databases={[]} />);
    expect(component.find('Alert').exists()).toBe(true);
  });
});
