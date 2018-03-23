import React from 'react';
import 'test/enzyme-init';
import { shallow, mount } from 'enzyme';
import UserAuthorityTable from 'ui/users/authority/UserAuthorityTable';

const FIELDS = {
  push: jest.fn(),
  remove: jest.fn(),
};

const GROUPS_MOCKS = [
  { code: 'group1', name: 'group 1' },
  { code: 'group2', name: 'group 2' },
];
const ROLES_MOCKS = [
  { code: 'role1', name: 'role 1' },
  { code: 'role2', name: 'role 2' },
];

describe('UserListTable', () => {
  let component;
  beforeEach(() => {
    component = mount(<UserAuthorityTable
      groups={ROLES_MOCKS}
      roles={GROUPS_MOCKS}
      fields={FIELDS}
    />);
  });

  it('renders without crashing', () => {
    expect(component.exists()).toEqual(true);
  });

  it('renders with a BUTTON', () => {
    expect(component.find('BUTTON').exists());
  });
  it('renders with a table', () => {
    expect(component.find('table').exists());
  });


  it('depending on values selected call push() or not', () => {
    component.instance().group = { value: 'nenno' };
    component.find('button.UserAuthorityTable__add').simulate('click');
    expect(FIELDS.push).toHaveBeenCalled();
  });


  describe('test table component', () => {
    beforeEach(() => {
      component = shallow(<UserAuthorityTable />);
    });
  });
});
