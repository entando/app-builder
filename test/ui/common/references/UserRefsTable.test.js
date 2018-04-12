import React from 'react';
import 'test/enzyme-init';
import { shallow } from 'enzyme';
import { ROLE_USER_REFERENCES_PAYLOAD } from 'test/mocks/roles';


import UserRefsTable from 'ui/common/references/UserRefsTable';

jest.mock('state/roles/selectors', () => ({
  getRoleList: jest.fn(),
}));

const onWillMount = jest.fn();

describe('UserRefsTable', () => {
  let component;
  beforeEach(() => {
    component = shallow(<UserRefsTable
      onWillMount={onWillMount}
    />);
  });

  it('renders without crashing', () => {
    expect(component.exists()).toEqual(true);
  });

  describe('test table component', () => {
    beforeEach(() => {
      component = shallow(<UserRefsTable
        onWillMount={onWillMount}
      />);
    });

    it('renders a message instead of the table', () => {
      expect(component.find('.UserRefsTable__table')).toHaveLength(0);
    });

    describe('with references', () => {
      beforeEach(() => {
        component.setProps({ userReferences: ROLE_USER_REFERENCES_PAYLOAD });
      });

      it('has 1 row if there is 1 reference', () => {
        const tbody = component.find('tbody');
        expect(tbody).toHaveLength(1);
        expect(tbody.find('tr')).toHaveLength(1);
      });


      it('has a menu in the action column of each row', () => {
        component.find('tbody tr').forEach((tr) => {
          expect(tr.find('DropdownKebab')).toHaveLength(1);
        });
      });

      it('render different icon if user.status !== active', () => {
        const statusDisabled = {
          username: 'user',
          lastLogin: '2018-04-04',
          status: 'disabled',
        };

        component.setProps({ userReferences: [statusDisabled] });
        console.log(component.find('UserStatus').debug());
        expect(component.find('UserStatus').prop('status')).toEqual('disabled');
      });
    });
  });
});
