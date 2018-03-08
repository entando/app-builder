import { setApi } from 'state/api/actions';
import { SET_API } from 'state/api/types';

describe('api actions', () => {
  describe('setApi', () => {
    it('test setApi action sets the correct type', () => {
      const action = setApi({});
      expect(action.type).toEqual(SET_API);
    });
  });
});
