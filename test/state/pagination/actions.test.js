import { setPage } from 'state/pagination/actions';
import { SET_PAGE } from 'state/pagination/types';

describe('pagination actions', () => {
  describe('setPage', () => {
    it('test setPage action sets the correct type and default namespace', () => {
      const action = setPage({});
      expect(action).toHaveProperty('type', SET_PAGE);
      expect(action).toHaveProperty('payload');
      expect(action).toHaveProperty('payload.page', {});
      expect(action).toHaveProperty('payload.namespace', 'global');
    });

    it('sets a custom namespace', () => {
      const action = setPage({}, 'custom');
      expect(action).toHaveProperty('type', SET_PAGE);
      expect(action).toHaveProperty('payload');
      expect(action).toHaveProperty('payload.page', {});
      expect(action).toHaveProperty('payload.namespace', 'custom');
    });
  });
});
