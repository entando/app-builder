import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  setCategories,
  toggleCategoryExpanded,
  setCategoryLoading,
  setCategoryLoaded,
  fetchCategoryTree,
  handleExpandCategory,
  sendPostCategory,
  wrapApiCall,
} from 'state/categories/actions';

import {
  getCategoryTree,
  postCategory,
} from 'api/categories';
import { mockApi } from 'test/testUtils';

import {
  SET_CATEGORIES, TOGGLE_CATEGORY_EXPANDED, SET_CATEGORY_LOADING,
  SET_CATEGORY_LOADED, CATEGORY_TREE_HOME,
} from 'state/categories/types';

import { ADD_ERRORS } from 'state/errors/types';
import { TOGGLE_LOADING } from 'state/loading/types';

import { STATE_NORMALIZED, BODY_OK } from 'test/mocks/categories';

const CATEGORY_CODE = 'category_code';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const INITIAL_STATE = {
  categories: {
    list: [],
    map: {},
    childrenMap: {},
    titlesMap: {},
    statusMap: {},
    selected: null,
  },
};

describe('state/categories/actions', () => {
  let store;

  beforeEach(() => {
    store = mockStore(INITIAL_STATE);
  });

  it('setCategories() should return a well formed action', () => {
    const CATEGORIES = [];
    const action = setCategories(CATEGORIES);
    expect(action).toHaveProperty('type', SET_CATEGORIES);
    expect(action.payload).toHaveProperty('categories', []);
  });

  it('toggleCategoryExpanded() should return a well formed action', () => {
    const action = toggleCategoryExpanded(CATEGORY_CODE, true);
    expect(action).toHaveProperty('type', TOGGLE_CATEGORY_EXPANDED);
    expect(action.payload).toHaveProperty('categoryCode', CATEGORY_CODE);
    expect(action.payload).toHaveProperty('expanded', true);
  });

  it('setCategoryLoading() should return a well formed action', () => {
    const action = setCategoryLoading(CATEGORY_CODE);
    expect(action).toHaveProperty('type', SET_CATEGORY_LOADING);
    expect(action.payload).toHaveProperty('categoryCode', CATEGORY_CODE);
  });

  it('setCategoryLoaded() should return a well formed action', () => {
    const action = setCategoryLoaded(CATEGORY_CODE);
    expect(action).toHaveProperty('type', SET_CATEGORY_LOADED);
    expect(action.payload).toHaveProperty('categoryCode', CATEGORY_CODE);
  });

  describe('handleExpandCategory()', () => {
    beforeEach(() => {
      getCategoryTree.mockImplementation(mockApi({ payload: CATEGORY_TREE_HOME }));
    });
    it('when loading an already expanded category (home) set category expanded to false', (done) => {
      store = mockStore(STATE_NORMALIZED);
      store.dispatch(handleExpandCategory()).then(() => {
        const actions = store.getActions();
        expect(actions).toHaveLength(1);
        expect(actions[0]).toHaveProperty('type', TOGGLE_CATEGORY_EXPANDED);
        expect(actions[0].payload).toHaveProperty('expanded', false);
        done();
      }).catch(done.fail);
    });

    it('when loading root category, should download the root and its children', (done) => {
      store = mockStore({
        categories: { statusMap: { home: { expandend: false, loaded: false } } },
      });
      store.dispatch(handleExpandCategory('home')).then(() => {
        const actionTypes = store.getActions().map(action => action.type);
        expect(actionTypes).toHaveLength(2);
        expect(actionTypes.includes(TOGGLE_LOADING)).toBe(true);
        expect(actionTypes.includes(SET_CATEGORY_LOADING)).toBe(true);
        done();
      }).catch(done.fail);
    });
  });

  describe('fetchCategoryTree', () => {
    beforeEach(() => {
      getCategoryTree.mockImplementation(mockApi({ payload: CATEGORY_TREE_HOME }));
    });

    it('fetchCategoryTree call setCategories', (done) => {
      store.dispatch(fetchCategoryTree()).then(() => {
        const actions = store.getActions();
        expect(actions).toHaveLength(5);
        expect(actions[0]).toHaveProperty('type', TOGGLE_LOADING);
        expect(actions[1]).toHaveProperty('type', SET_CATEGORY_LOADED);
        expect(actions[2]).toHaveProperty('type', TOGGLE_CATEGORY_EXPANDED);
        expect(actions[3]).toHaveProperty('type', TOGGLE_LOADING);
        expect(actions[4]).toHaveProperty('type', SET_CATEGORIES);
        done();
      }).catch(done.fail);
    });

    it('if categoryCode is not home, only dispatch setCategories action', (done) => {
      store.dispatch(fetchCategoryTree('mycategory1')).then(() => {
        const actions = store.getActions();
        expect(actions).toHaveLength(1);
        expect(actions[0]).toHaveProperty('type', SET_CATEGORIES);
        done();
      }).catch(done.fail);
    });
  });

  describe('sendPostCategory()', () => {
    it('when postCategory succeeds should call post action', (done) => {
      postCategory.mockImplementation(mockApi({ payload: BODY_OK }));
      store.dispatch(sendPostCategory(BODY_OK)).then(() => {
        expect(postCategory).toHaveBeenCalled();
        done();
      }).catch(done.fail);
    });
  });
});
