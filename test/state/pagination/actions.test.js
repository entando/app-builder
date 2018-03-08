
import { setPage } from 'state/pagination/actions';
import { SET_PAGE } from 'state/pagination/types';

describe('pagination actions', () => {
  describe('setPage', () => {
    it('test setFragments action sets the correct type', () => {
      const action = setPage({});
      expect(action.type).toEqual(SET_PAGE);
    });
  });
});
