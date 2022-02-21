import reducer from 'state/permissions/reducer';
import {
  setPermissions,
  setLoggedUserPermissions,
  setLoggedUserPermissionsLoaded,
  clearLoggedUserPermissions,
} from 'state/permissions/actions';
import { getPermissionsList } from 'state/permissions/selectors';
import { LIST_PERMISSIONS_OK } from 'test/mocks/permissions';
import { AUTHORITIES } from 'test/mocks/users';

describe('state/permssions/reducer', () => {
  let state = reducer();

  describe('default state', () => {
    it('should be an object and has required properties', () => {
      expect(typeof state).toBe('object');
      expect(state).toHaveProperty('list');
      expect(state).toHaveProperty('map');
      expect(state).toHaveProperty('loggedUser');
      expect(state).toHaveProperty('loggedUserGroup');
      expect(state).toHaveProperty('loggedUserPermissionsLoaded');
      expect(state.loggedUser).toBe(null);
    });
  });

  it('should return an object', () => {
    expect(typeof state).toBe('object');
  });

  describe('after action SET_PERMISSIONS', () => {
    let newState;
    beforeEach(() => {
      newState = reducer(state, setPermissions(LIST_PERMISSIONS_OK));
    });

    it('should define the permissions payload', () => {
      expect(getPermissionsList({ permissions: newState })).toEqual(LIST_PERMISSIONS_OK);
    });
  });

  describe('logged user permissions', () => {
    const payloadUserAuthority = {
      result: AUTHORITIES,
      allPermissions: ['editor', 'supervisor', 'superuser'],
    };

    it('after action SET_LOGGED_USER_PERMISSIONS', () => {
      state = reducer(state, setLoggedUserPermissions(payloadUserAuthority));
      expect(state.loggedUser).toEqual(AUTHORITIES.map(auth => auth.role));
    });

    it('after action CLEAR_LOGGED_USER_PERMISSIONS', () => {
      state = reducer(state, clearLoggedUserPermissions());
      expect(state.loggedUser).toBe(null);
    });

    it('after action SET_LOGGED_USER_PERMISSIONS_LOADED', () => {
      state = reducer(state, setLoggedUserPermissionsLoaded(true));
      expect(state.loggedUserPermissionsLoaded).toEqual(true);
    });
  });
});
