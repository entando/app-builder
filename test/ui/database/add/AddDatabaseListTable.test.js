import React from 'react';
import 'test/enzyme-init';
import { shallow } from 'enzyme';

import AddDatabaseListTable from 'ui/database/add/AddDatabaseListTable';


const props = {
  tables: [{
    code: '',
    tableMapping: {},
  }],
  onClickStartBackup: jest.fn(),

};

describe('AddDatabaseListTable', () => {
  let component;
  beforeEach(() => {
    component = shallow(<AddDatabaseListTable {...props} />);
  });

  it('renders component without crashing', () => {
    expect(component.exists()).toBe(true);
  });

  it('root component has class AddDatabaseListTable', () => {
    expect(component.hasClass('AddDatabaseListTable')).toBe(true);
    // console.log(component.debug());
  });

  it('renders Buttons', () => {
    expect(component.find('.AddDatabaseListTable__btn-add').exists()).toBe(true);
  });

  xit('call onClickDelete', () => {
    component.find('.UserAuthorityTable__delete-tag-btn').first().simulate('click');
    expect(props.onClickDelete).toHaveBeenCalled();
  });

  xit('show Alert where databases is empty', () => {
    component = shallow(<AddDatabaseListTable {...props} databases={[]} />);
    expect(component.find('Alert').exists()).toBe(true);
  });
});
