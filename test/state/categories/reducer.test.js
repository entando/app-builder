import reducer from 'state/categories/reducer';

import {
  HOME_PAYLOAD,
  MYCATEGORY1_PAYLOAD,
  MYCATEGORY2_PAYLOAD,
  MYCATEGORY3_PAYLOAD,
  MOCK_REFERENCES,
} from 'test/mocks/categories';

import {
  setCategories, toggleCategoryExpanded,
  setCategoryLoading, setCategoryLoaded, removeCategory,
  setSelectedCategory, setReferences,
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

    describe('action TOGGLE_CATEGORY_EXPANDED', () => {
      let newState;
      const CATEGORY_CODE = 'home';
      it('should toggle the category expanded flag', () => {
        newState = reducer(state, toggleCategoryExpanded(CATEGORY_CODE));
        expect(newState.statusMap[CATEGORY_CODE].expanded).toBe(true);

        newState = reducer(newState, toggleCategoryExpanded(CATEGORY_CODE));
        expect(newState.statusMap[CATEGORY_CODE].expanded).toBe(false);
      });
    });

    describe('action SET_CATEGORY_LOADING', () => {
      let newState;
      const CATEGORY_CODE = 'home';
      it('sets the category loading flag to true', () => {
        newState = reducer(state, setCategoryLoading(CATEGORY_CODE));
        expect(newState.statusMap[CATEGORY_CODE].loading).toBe(true);
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

    describe('after action REMOVE_CATEGORY', () => {
      const CATEGORY_CODE = MYCATEGORY1_PAYLOAD.code;
      const PARENT_CODE = MYCATEGORY1_PAYLOAD.parentCode;
      const newState = reducer(state, setCategories(CATEGORIES));

      it('should remove the group from map and list', () => {
        const stateAfterRemove = reducer(newState, removeCategory(CATEGORY_CODE, PARENT_CODE));
        expect(newState.map).not.toEqual(stateAfterRemove.map);
        expect(stateAfterRemove.map[CATEGORY_CODE]).toBeUndefined();
        expect(stateAfterRemove.childrenMap[CATEGORY_CODE]).toBeUndefined();
        expect(stateAfterRemove.childrenMap[PARENT_CODE]).not.toContain(CATEGORY_CODE);

        expect(newState.list).not.toBe(stateAfterRemove.list);
        expect(stateAfterRemove.list.includes(CATEGORY_CODE)).toBe(false);
      });
    });

    describe('after action SET_SELECTED_CATEGORY', () => {
      const CATEGORY_CODE = MYCATEGORY1_PAYLOAD.code;
      const newState = reducer(state, setSelectedCategory(MYCATEGORY1_PAYLOAD));

      it('should define the categories.selected payload', () => {
        expect(newState).toHaveProperty('selected');
        expect(newState.selected).toHaveProperty('code', CATEGORY_CODE);
      });

      it('should define the categories.selected.referenceKeyList payload', () => {
        expect(newState).toHaveProperty('selected.referenceKeyList');
        expect(newState.selected.referenceKeyList).toHaveLength(2);
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
