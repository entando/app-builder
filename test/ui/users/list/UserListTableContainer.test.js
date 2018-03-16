import 'test/enzyme-init';

import { mapStateToProps, mapDispatchToProps } from 'ui/users/list/UserListTableContainer';
import { USERS_OK_PAGE_1 } from 'test/mocks/users';
import { getUserList } from 'state/users/selectors';

const TEST_STATE = {
  users: {
    list: ['admin', 'user1'],
    map: {
      admin: {
        username: 'admin',
        registration: '2018-01-08 00:00:00 ',
        lastLogin: '2018-01-08 00:00:00',
        lastPasswordChange: '2018-01-08 00:00:00',
        status: 'active',
        passwordChangeRequired: true,
      },
      user1: {
        username: 'user1',
        registration: '2018 - 01 - 08 00: 00: 00 ',
        lastLogin: '2018-01-08 00:00:00',
        lastPasswordChange: '2018-01-08 00:00:00',
        status: 'disabled',
        passwordChangeRequired: true,
      },
    },
  },
  pagination: USERS_OK_PAGE_1.metaData,
};

const dispatchMock = jest.fn();

jest.mock('state/users/selectors', () => ({
  getUserList: jest.fn(),
}));

const users = USERS_OK_PAGE_1.payload;

getUserList.mockReturnValue(users);

describe('UserListTableContainer', () => {
  it('maps users list property state in UsersListTable', () => {
    expect(mapStateToProps(TEST_STATE)).toEqual({
      users: USERS_OK_PAGE_1.payload,
      page: TEST_STATE.pagination.page,
      totalItems: TEST_STATE.pagination.lastPage * TEST_STATE.pagination.pageSize,
      pageSize: TEST_STATE.pagination.pageSize,
    });
  });

  describe('mapDispatchToProps', () => {
    let props;
    beforeEach(() => {
      props = mapDispatchToProps(dispatchMock);
    });

    it('should map the correct function properties', () => {
      expect(props.onWillMount).toBeDefined();
    });

    it('should dispatch an action if onWillMount is called', () => {
      props.onWillMount({});
      expect(dispatchMock).toHaveBeenCalled();
    });
  });
});
