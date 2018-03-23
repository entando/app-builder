
import { addRoles } from 'state/roles/actions';
import { ROLES } from 'test/mocks/roles';
import reducer from 'state/roles/reducer';


describe('state/roles/reducer', () => {
  let state;
  beforeEach(() => {
    state = reducer();
  });

  describe('default state', () => {
    it('should be an array', () => {
      expect(state).toBeDefined();
      expect(Array.isArray(state)).toBe(true);
    });
  });

  describe('on action addRoles', () => {
    let newState;
    beforeEach(() => {
      newState = reducer(state, addRoles(ROLES));
    });
    it('should be equal to the added roles', () => {
      expect(newState).toEqual(ROLES);
    });
  });
});
