import { USERS_OK_PAGE_1 } from 'test/mocks/users';

import {
  getUsers,
  getUsersIdList,
  getUsersMap,
  getUserList,
} from 'state/users/selectors';

jest.mock('state/locale/selectors', () => ({ getLocale: () => ('en') }));

const TEST_STATE = {
  users: {
    list: ['admin', 'user1'],
    map: {
      admin: {
        username: 'admin',
        registration: '2018-01-08 00:00:00',
        lastLogin: '2018-01-08 00:00:00',
        lastPasswordChange: '2018-01-08 00:00:00',
        status: 'active',
        passwordChangeRequired: true,
      },
      user1: {
        username: 'user1',
        registration: '2018-01-08 00:00:00',
        lastLogin: '2018-01-08 00:00:00',
        lastPasswordChange: '2018-01-08 00:00:00',
        status: 'disabled',
        passwordChangeRequired: true,
      },
    },
  },
  pagination: USERS_OK_PAGE_1.metaData,
};


describe('state/users/selectors', () => {
  it('getUsers(state) returns the users object', () => {
    const selected = getUsers(TEST_STATE);
    expect(selected).toBe(TEST_STATE.users);
  });

  it('verify getUsersIdList selector', () => {
    expect(getUsersIdList(TEST_STATE)).toEqual(TEST_STATE.users.list);
  });

  it('verify getUsersMap selector', () => {
    expect(getUsersMap(TEST_STATE)).toEqual(TEST_STATE.users.map);
  });

  it('verify getUserList selector', () => {
    expect(getUserList(TEST_STATE)).toEqual(USERS_OK_PAGE_1.payload);
  });
});
