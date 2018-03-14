import 'test/enzyme-init';
import { getUsers } from 'api/users';
import {
  USERS_OK_PAGE_1,
  USERS_OK_PAGE_2,
} from 'test/mocks/users';


jest.unmock('api/users');

describe('api/users', () => {
  describe('getUsers', () => {
    it('returns a promise', () => {
      const filledInput = getUsers();
      expect(typeof filledInput.then === 'function').toBeDefined();
    });

    it('get user page 1 as first page', () => {
      getUsers().then((response) => {
        expect(response).toEqual(USERS_OK_PAGE_1);
      });
    });

    it('get user page 2', () => {
      getUsers(2).then((response) => {
        expect(response).toEqual(USERS_OK_PAGE_2);
      });
    });

    it('get user page 1 by default', () => {
      getUsers('nopage').then((response) => {
        expect(response).toEqual(USERS_OK_PAGE_1);
      });
    });
  });
});
