
import { getRoles } from 'state/roles/selectors';
import { ROLES } from 'test/mocks/roles';

const STATE = {
  roles: ROLES,
};

describe('state/errors/selectors', () => {
  describe('getErrors', () => {
    it('returns the errors state', () => {
      expect(getRoles(STATE)).toEqual(ROLES);
    });
  });
});
