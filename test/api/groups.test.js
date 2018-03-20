import 'test/enzyme-init';
import { getGroups } from 'api/groups';
import {
  GROUPS_OK_PAGE_1,
  GROUPS_OK_PAGE_2,
} from 'test/mocks/groups';


jest.unmock('api/groups');

describe('api/groups', () => {
  describe('getGroups', () => {
    it('returns a promise', () => {
      const filledInput = getGroups();
      expect(typeof filledInput.then === 'function').toBeDefined();
    });

    it('get group page 1 as first page', () => {
      getGroups().then((response) => {
        expect(response).toEqual(GROUPS_OK_PAGE_1);
      });
    });

    it('get group page 2', () => {
      getGroups(2).then((response) => {
        expect(response).toEqual(GROUPS_OK_PAGE_2);
      });
    });

    it('get group page 1 by default', () => {
      getGroups('nopage').then((response) => {
        expect(response).toEqual(GROUPS_OK_PAGE_1);
      });
    });
  });
});
