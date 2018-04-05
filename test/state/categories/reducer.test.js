import reducer from 'state/categories/reducer';

import {
  HOME_PAYLOAD,
  MYCATEGORY1_PAYLOAD,
  MYCATEGORY2_PAYLOAD,
  MYCATEGORY3_PAYLOAD,
} from 'test/mocks/categories';

import { setCategories, toggleCategoryExpanded, setCategoryLoading, setCategoryLoaded } from 'state/categories/actions';


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
  });
});
