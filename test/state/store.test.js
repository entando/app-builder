
import store, { getPersistedState } from 'state/store';

describe('state/store', () => {
  let defaultState;
  beforeEach(() => {
    defaultState = store.getState();
  });

  describe('default state', () => {
    it('contains at least one property', () => {
      expect(defaultState).toBeDefined();
    });
  });

  describe('getPersistedState', () => {
    it('should return correct state', () => {
      const localStorageStates = {
        locale: [],
        permissions: ['loggedUser'],
        testParent: ['testChild1', 'testChild2'],
      };
      const state = {
        locale: 'en',
        permissions: {
          loggedUser: ['test'],
        },
        testParent: {
          testChild1: 'test1',
          testChild2: 'test2',
          testChild3: 'not included in result',
        },
        testNotPersisted: 'not included in result',
      };
      const expected = {
        locale: 'en',
        permissions: {
          loggedUser: ['test'],
        },
        testParent: {
          testChild1: 'test1',
          testChild2: 'test2',
        },
      };
      const result = {
        locale: getPersistedState(state, 'locale', localStorageStates),
        permissions: getPersistedState(state, 'permissions', localStorageStates),
        apps: getPersistedState(state, 'apps', localStorageStates),
      };
      expect(result).toEqual(expected);
    });
  });
});
