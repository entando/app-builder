
import { setPageModels, setSelectedPageModel, removePageModelSync, setSelectedPageModelPageRefs } from 'state/page-models/actions';
import { PAGE_MODELS_LIST, PAGE_MODELS_ID_LIST, PAGE_MODELS_MAP, PAGE_REFS_MAP } from 'test/mocks/pageModels';
import reducer from 'state/page-models/reducer';


const PAGE_MODEL = PAGE_MODELS_LIST[0];
const PAGE_MODEL_CODE = PAGE_MODEL.code;

const MOCK_STATE = {
  idList: PAGE_MODELS_ID_LIST,
  map: PAGE_MODELS_MAP,
  selected: PAGE_MODEL,
};

describe('state/page-models/reducer', () => {
  let state;
  beforeEach(() => {
    state = reducer();
  });

  describe('default state', () => {
    it('should define a "idList" array', () => {
      expect(state.idList).toBeDefined();
      expect(Array.isArray(state.idList)).toBe(true);
    });

    it('should define a "map" array', () => {
      expect(state.map).toBeInstanceOf(Object);
    });

    it('should define a "selected" object', () => {
      expect(state.selected).toBeDefined();
      expect(typeof state.selected).toBe('object');
    });
  });

  describe('on action SET_PAGE_MODELS', () => {
    let newState;
    beforeEach(() => {
      newState = reducer(state, setPageModels(PAGE_MODELS_LIST));
    });

    it('state.idList should be equal to the added page models', () => {
      expect(newState.idList).toEqual(PAGE_MODELS_ID_LIST);
    });
  });

  describe('on action SET_SELECTED_PAGE_MODEL', () => {
    let newState;
    beforeEach(() => {
      newState = reducer(state, setSelectedPageModel(PAGE_MODEL));
    });

    it('state.selected should be equal to the selected page model', () => {
      expect(newState.selected).toEqual(PAGE_MODEL);
    });
  });

  describe('after action REMOVE_PAGE_MODEL (present item)', () => {
    let newState;
    beforeEach(() => {
      state = reducer(MOCK_STATE);
      newState = reducer(state, removePageModelSync(PAGE_MODEL_CODE));
    });

    it('should return a new state', () => {
      expect(newState).not.toBe(state);
    });

    it('state.idList should have the page model code removed', () => {
      const expected = PAGE_MODELS_ID_LIST.filter(code => code !== PAGE_MODEL_CODE);
      expect(newState.idList).toEqual(expected);
    });

    it('state.map should have the page model removed', () => {
      const expected = { ...PAGE_MODELS_MAP };
      delete expected[PAGE_MODEL_CODE];
      expect(newState.map).toEqual(expected);
    });
  });

  describe('after action REMOVE_PAGE_MODEL (non present item)', () => {
    let newState;
    beforeEach(() => {
      state = reducer(MOCK_STATE);
      newState = reducer(state, removePageModelSync('blah blah'));
    });

    it('should return the old state', () => {
      expect(newState).toBe(state);
    });

    it('state.idList should be unchanged', () => {
      expect(newState.idList).toBe(state.idList);
    });

    it('state.map should be unchanged', () => {
      expect(newState.map).toBe(state.map);
    });
  });

  describe('after action SET_SELECTED_PAGE_MODEL_PAGE_REFS (non present item)', () => {
    let newState;
    beforeEach(() => {
      state = reducer();
      newState = reducer(state, setSelectedPageModelPageRefs(PAGE_REFS_MAP.homepage));
    });

    it('should return a new state', () => {
      expect(newState).not.toBe(state);
    });

    it('state.selected should be changed', () => {
      expect(newState.selected).not.toBe(state.selected);
    });

    it('state.selected should contain pageReferences', () => {
      expect(newState.selected.pageReferences).toBe(PAGE_REFS_MAP.homepage);
    });
  });

  describe('after action SET_SELECTED_PAGE_MODEL_PAGE_REFS (present item)', () => {
    let newState;
    beforeEach(() => {
      state = reducer({
        selected: PAGE_MODEL,
      });
      newState = reducer(state, setSelectedPageModelPageRefs(PAGE_REFS_MAP.homepage));
    });

    it('should return a new state', () => {
      expect(newState).not.toBe(state);
    });

    it('state.selected should be changed', () => {
      expect(newState.selected).not.toBe(state.selected);
    });

    it('state.selected should contain pageReferences', () => {
      expect(newState.selected.pageReferences).toBe(PAGE_REFS_MAP.homepage);
    });
  });
});
