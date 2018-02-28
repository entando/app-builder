import reducer from 'state/groups/reducer';
import { addGroups } from 'state/groups/actions';
import { GROUPS } from 'test/mocks/groups';

const GROUPS_PAYLOAD = GROUPS.payload;

describe('state/groups/reducer', () => {
  it('should return an object', () => {
    const state = reducer();
    expect(typeof state).toBe('object');
  });

  describe('after action ADD_GROUPS', () => {
    let state;
    beforeEach(() => {
      state = reducer({}, addGroups(GROUPS_PAYLOAD));
    });
    it('should define groups array', () => {
      expect(state[0]).toEqual(GROUPS_PAYLOAD[0]);
    });
  });
});
