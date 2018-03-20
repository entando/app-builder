import reducer from 'state/groups/reducer';
import { setGroups } from 'state/groups/actions';
import { getGroupsList } from 'state/groups/selectors';
import { GROUPS_OK_PAGE_1 } from 'test/mocks/groups';

describe('state/groups/reducer', () => {
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
      newState = reducer(state, setGroups(GROUPS_OK_PAGE_1.payload));
    });

    it('should define the groups payload', () => {
      expect(getGroupsList({ groups: newState })).toEqual(GROUPS_OK_PAGE_1.payload);
    });
  });
});
