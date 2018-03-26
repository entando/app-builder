import reducer from 'state/roles/reducer';
import { setRoles } from 'state/roles/actions';
import { getRolesList } from 'state/roles/selectors';
import { LIST_ROLES_OK } from 'test/mocks/roles';

describe('state/roles/reducer', () => {
  const state = reducer();

  describe('default state', () => {
    it('should be an array', () => {
      expect(state).toBeDefined();
    });
  });

  it('should return an object', () => {
    expect(typeof state).toBe('object');
  });

  describe('after action SET_GROUPS', () => {
    let newState;
    beforeEach(() => {
      newState = reducer(state, setRoles(LIST_ROLES_OK));
    });

    it('should define the roles payload', () => {
      expect(getRolesList({ roles: newState })).toEqual(LIST_ROLES_OK);
    });
  });
});
