import reducer from 'state/roles/reducer';
import { setRoles, setSelected, removeRole, setUserRefs } from 'state/roles/actions';
import { getRolesList } from 'state/roles/selectors';
import { LIST_ROLES_OK, GET_ROLE_PAYLOAD, ROLE_USER_REFERENCES_PAYLOAD } from 'test/mocks/roles';

const ROLE_CODE = LIST_ROLES_OK[0].code;

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

  describe('after action SET_ROLES', () => {
    let newState;
    beforeEach(() => {
      newState = reducer(state, setRoles(LIST_ROLES_OK));
    });

    it('should define the roles payload', () => {
      expect(getRolesList({ roles: newState })).toEqual(LIST_ROLES_OK);
    });
  });

  describe('after action REMOVE_ROLE', () => {
    const newState = reducer(state, setRoles(LIST_ROLES_OK));

    it('should remove the group from map and list', () => {
      const stateAfterRemove = reducer(newState, removeRole(ROLE_CODE));
      expect(newState.map).not.toEqual(stateAfterRemove.map);
      expect(stateAfterRemove.map[ROLE_CODE]).toBeUndefined();

      expect(newState.list).not.toBe(stateAfterRemove.list);
      expect(stateAfterRemove.list.includes(ROLE_CODE)).toBe(false);
    });
  });

  describe('after action SET_SELECTED', () => {
    let newState;
    beforeEach(() => {
      newState = reducer(state, setSelected(GET_ROLE_PAYLOAD));
    });

    it('should define the roles.selected payload', () => {
      expect(newState.selected).toEqual(GET_ROLE_PAYLOAD);
    });
  });

  describe('after action SET_USER_REFS', () => {
    let newState;
    beforeEach(() => {
      newState = reducer(state, setUserRefs(ROLE_USER_REFERENCES_PAYLOAD));
    });

    it('should define the roles.selected payload', () => {
      expect(newState.selected.userReferences).toEqual(ROLE_USER_REFERENCES_PAYLOAD);
    });
  });
});
