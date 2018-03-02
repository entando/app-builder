
import { addGroups } from 'state/groups/actions';
import { GROUPS } from 'test/mocks/groups';
import reducer from 'state/groups/reducer';


describe('state/groups/reducer', () => {
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

  describe('on action addGroups', () => {
    let newState;
    beforeEach(() => {
      newState = reducer(state, addGroups(GROUPS));
    });
    it('should be equal to the added groups', () => {
      expect(newState).toEqual(GROUPS);
    });
  });
});
