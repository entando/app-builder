
import { setPageModels } from 'state/page-models/actions';
import { GET_LIST_RESPONSE } from 'test/mocks/pageModels';
import reducer from 'state/page-models/reducer';

const PAGE_MODELS = GET_LIST_RESPONSE.payload;

describe('state/page-models/reducer', () => {
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

  describe('on action setPageModels', () => {
    let newState;
    beforeEach(() => {
      newState = reducer(state, setPageModels(PAGE_MODELS));
    });
    it('should be equal to the added page models', () => {
      expect(newState).toEqual(PAGE_MODELS);
    });
  });
});
