import reducer from 'state/categories/reducer';

import {
  HOME_PAYLOAD,
  MYCATEGORY1_PAYLOAD,
  MYCATEGORY2_PAYLOAD,
  MYCATEGORY3_PAYLOAD,
  MOCK_REFERENCES,
} from 'test/mocks/categories';

import {
  setCategories, setCategoryExpanded,
  setCategoryLoaded,
  setReferences,
} from 'state/categories/actions';


const CATEGORIES = [
  HOME_PAYLOAD,
  MYCATEGORY1_PAYLOAD,
  MYCATEGORY2_PAYLOAD,
  MYCATEGORY3_PAYLOAD,
];

describe('state/categories/reducer', () => {
  it('should return an object', () => {
    const state = reducer();
    expect(typeof state).toBe('object');
  });

  describe('after action SET_CATEGORIES', () => {
    let state;
    beforeEach(() => {
      state = reducer({}, setCategories(CATEGORIES));
    });

    it('should define the categories map', () => {
      expect(state.map).toBeDefined();
      CATEGORIES.forEach((category) => {
        expect(state.map[category.code]).toBeDefined();
      });
    });

    it('should define the childrenMap', () => {
      expect(state.childrenMap).toBeDefined();
      CATEGORIES.forEach((category) => {
        expect(state.childrenMap[category.code]).toBeDefined();
      });
    });

    it('should define the titlesMap', () => {
      expect(state.titlesMap).toBeDefined();
      CATEGORIES.forEach((category) => {
        expect(state.titlesMap[category.code]).toBeDefined();
      });
    });

    describe('action SET_CATEGORY_EXPANDED', () => {
      let newState;
      const CATEGORY_CODE = 'home';
      it('should set the category expanded flag', () => {
        newState = reducer(state, setCategoryExpanded(CATEGORY_CODE));
        expect(newState.statusMap[CATEGORY_CODE].expanded).toBe(true);

        newState = reducer(newState, setCategoryExpanded(CATEGORY_CODE, false));
        expect(newState.statusMap[CATEGORY_CODE].expanded).toBe(false);
      });
    });

    describe('action SET_CATEGORY_LOADED', () => {
      let newState;
      const CATEGORY_CODE = 'home';
      it('sets the category loaded flag to true', () => {
        newState = reducer(state, setCategoryLoaded(CATEGORY_CODE));
        expect(newState.statusMap[CATEGORY_CODE].loaded).toBe(true);
      });
      it('sets the category loading flag to false', () => {
        newState = reducer(state, setCategoryLoaded(CATEGORY_CODE));
        expect(newState.statusMap[CATEGORY_CODE].loading).toBe(false);
      });
    });

    describe('after action SET_REFERENCES', () => {
      const newState = reducer(state, setReferences({
        jacmsContentManager: MOCK_REFERENCES.jacmsContentManager,
      }));

      it('should define the categories.selected.referenceMap', () => {
        expect(newState).toHaveProperty('selected.referenceMap');
        expect(newState.selected.referenceMap).toHaveProperty('jacmsContentManager');
      });
    });
  });
});
