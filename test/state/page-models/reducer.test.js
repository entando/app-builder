
import { setPageModels, setSelectedPageModel } from 'state/page-models/actions';
import { GET_LIST_RESPONSE } from 'test/mocks/pageModels';
import reducer from 'state/page-models/reducer';

const PAGE_MODELS = GET_LIST_RESPONSE.payload;

describe('state/page-models/reducer', () => {
  let state;
  beforeEach(() => {
    state = reducer();
  });

  describe('default state', () => {
    it('should define a "list" array', () => {
      expect(state.list).toBeDefined();
      expect(Array.isArray(state.list)).toBe(true);
    });

    it('should define a "selected" object', () => {
      expect(state.selected).toBeDefined();
      expect(typeof state.selected).toBe('object');
    });
  });

  describe('on action setPageModels', () => {
    let newState;
    beforeEach(() => {
      newState = reducer(state, setPageModels(PAGE_MODELS));
    });

    it('state.list should be equal to the added page models', () => {
      expect(newState.list).toEqual(PAGE_MODELS);
    });
  });

  describe('on action setSelectedPageModel', () => {
    let newState;
    beforeEach(() => {
      newState = reducer(state, setSelectedPageModel(PAGE_MODELS[0]));
    });

    it('state.selected should be equal to the selected page model', () => {
      expect(newState.selected).toEqual(PAGE_MODELS[0]);
    });
  });
});
