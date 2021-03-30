import React from 'react';
import 'test/enzyme-init';
import { USERS } from 'test/mocks/users';


import UserListTable from 'ui/users/list/UserListTable';
import { shallowWithIntl } from 'test/legacyTestUtils';

const users = USERS;

jest.mock('state/users/selectors', () => ({
  getUserList: jest.fn(),
}));

describe('UserListTable', () => {
  let component;
  beforeEach(() => {
    component = shallowWithIntl(<UserListTable page={1} pageSize={1} totalItems={1} />).dive();
  });

  it('renders without crashing', () => {
    expect(component.exists()).toEqual(true);
  });

  it('errors without a page', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
    shallowWithIntl(<UserListTable pageSize={1} totalItems={1} />);
    expect(consoleError).toHaveBeenCalled();
    consoleError.mockReset();
    consoleError.mockRestore();
  });

  it('errors without a pageSize', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
    shallowWithIntl(<UserListTable page={1} totalItems={1} />);
    expect(consoleError).toHaveBeenCalled();
    consoleError.mockReset();
    consoleError.mockRestore();
  });

  it('errors without totalItems', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
    shallowWithIntl(<UserListTable pageSize={1} page={1} />);
    expect(consoleError).toHaveBeenCalled();
    consoleError.mockReset();
    consoleError.mockRestore();
  });

  describe('test table component', () => {
    beforeEach(() => {
      component = shallowWithIntl(<UserListTable
        page={1}
        pageSize={1}
        totalItems={1}
      />).dive();
    });

    it('has an Alert', () => {
      expect(component.find('Alert')).toHaveLength(1);
    });

    describe('with users', () => {
      beforeEach(() => {
        component.setProps({ users });
      });

      it('has four rows if there are two users', () => {
        const tbody = component.find('tbody');
        expect(tbody).toHaveLength(1);
        expect(tbody.find('tr')).toHaveLength(USERS.length);
        expect(tbody.find('UserListMenuActions')).toHaveLength(USERS.length);
      });

      it('has a menu in the action column of each row', () => {
        component.find('tbody tr').forEach((tr) => {
          expect(tr.find('UserListMenuActions')).toHaveLength(1);
        });
      });

      it('has a paginator', () => {
        const paginator = component.find('Paginator');
        expect(paginator).toHaveLength(1);
      });
    });
  });
});
