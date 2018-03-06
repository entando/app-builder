
import { getGroups } from 'state/groups/selectors';
import { GROUPS } from 'test/mocks/groups';

const STATE = {
  groups: GROUPS,
};


describe('state/errors/selectors', () => {
  describe('getErrors', () => {
    it('returns the errors state', () => {
      expect(getGroups(STATE)).toEqual(GROUPS);
    });
  });
});
