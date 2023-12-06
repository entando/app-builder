import { USERS, USERS_NORMALIZED } from 'test/mocks/users';

import {
  getUsers,
  getUsersIdList,
  getUsersMap,
  getUserList,
  getUsersTotal,
  getUserSearchTerm,
} from 'state/users/selectors';

jest.mock('state/locale/selectors', () => ({ getLocale: () => ('en') }));

const TEST_STATE = {
  users: {
    ...USERS_NORMALIZED,
    total: 2,
    searchTerm: 'test',
  },
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
    expect(getUserList(TEST_STATE)).toEqual(USERS);
  });

  it('verify getTotalUsers selector', () => {
    expect(getUsersTotal(TEST_STATE)).toEqual(2);
  });

  it('verify getUserSearchTerm selector', () => {
    expect(getUserSearchTerm(TEST_STATE)).toEqual('test');
  });
});
