import reducer from 'state/permissions/reducer';
import { setPermissions } from 'state/permissions/actions';
import { getPermissionsList } from 'state/permissions/selectors';
import { LIST_PERMISSIONS_OK } from 'test/mocks/permissions';

describe('state/permssions/reducer', () => {
  const state = reducer();

  describe('default state', () => {
    it('should be an array', () => {
      expect(state).toBeDefined();
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
});
