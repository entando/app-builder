import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { getCategoryTree } from 'api/categories';
import rootReducer from 'state/rootReducer';
import {
  setCategories,
  toggleCategoryExpanded,
  setCategoryLoading,
  setCategoryLoaded,
  fetchCategoryTree,
  handleExpandCategory,
} from 'state/categories/actions';

import {
  SET_CATEGORIES, TOGGLE_CATEGORY_EXPANDED, SET_CATEGORY_LOADING,
  SET_CATEGORY_LOADED, CATEGORY_TREE_HOME,
} from 'state/categories/types';

import { ADD_ERRORS } from 'state/errors/types';
import { TOGGLE_LOADING } from 'state/loading/types';

import { STATE_NORMALIZED } from 'test/mocks/categories';

jest.mock('api/categories', () => ({
  getCategoryTree: jest.fn(),
}));

const GET_CATEGORY_TREE_PROMISE = {
  ok: true,
  json: () => new Promise(res => res({ payload: CATEGORY_TREE_HOME })),
};

const MOCK_RETURN_PROMISE_ERROR =
  {
    ok: false,
    json: () => new Promise(err => err({
      errors: [
        { message: 'what went wrong' },
      ],
    })),
  };

getCategoryTree.mockReturnValue(new Promise(resolve => resolve(GET_CATEGORY_TREE_PROMISE)));

jest.mock('state/page-config/selectors', () => ({
  getSelectedPageConfig: jest.fn(),
}));

const CATEGORY_CODE = 'category_code';

const mockStore = configureStore([thunk]);
const INITIAL_STATE = rootReducer();

describe('state/categories/actions', () => {
  beforeEach(jest.clearAllMocks);

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
    it('when loading an already expanded category (home) set category expanded to false', (done) => {
      const store = mockStore(STATE_NORMALIZED);
      store.dispatch(handleExpandCategory()).then(() => {
        const actions = store.getActions();
        expect(actions).toHaveLength(1);
        expect(actions[0]).toHaveProperty('type', TOGGLE_CATEGORY_EXPANDED);
        done();
      }).catch(done.fail);
    });

    it('when loading root category, should download the root and its children', (done) => {
      const store = mockStore(INITIAL_STATE);
      store.dispatch(handleExpandCategory()).then(() => {
        const actionTypes = store.getActions().map(action => action.type);
        expect(actionTypes).toHaveLength(6);
        expect(actionTypes.includes(TOGGLE_LOADING)).toBe(true);
        expect(actionTypes.includes(SET_CATEGORY_LOADING)).toBe(true);
        expect(actionTypes.includes(SET_CATEGORY_LOADED)).toBe(true);
        expect(actionTypes.includes(TOGGLE_CATEGORY_EXPANDED)).toBe(true);
        expect(actionTypes.includes(SET_CATEGORIES)).toBe(true);
        done();
      }).catch(done.fail);
    });

    it('when loading an not expanded category (mycategory1) set category expanded to true', (done) => {
      const store = mockStore(STATE_NORMALIZED);
      store.dispatch(handleExpandCategory('mycategory1')).then(() => {
        const actionTypes = store.getActions().map(action => action.type);
        expect(actionTypes.includes(SET_CATEGORY_LOADING)).toBe(true);
        expect(actionTypes.includes(SET_CATEGORY_LOADED)).toBe(true);
        expect(actionTypes.includes(TOGGLE_CATEGORY_EXPANDED)).toBe(true);
        expect(actionTypes.includes(SET_CATEGORIES)).toBe(true);
        done();
      }).catch(done.fail);
    });
  });

  describe('fetchCategoryTree', () => {
    const store = mockStore(STATE_NORMALIZED);

    it('fetchCategoryTree call setCategories', (done) => {
      store.dispatch(fetchCategoryTree()).then(() => {
        const actions = store.getActions();
        expect(actions).toHaveLength(3);
        expect(actions[0]).toHaveProperty('type', TOGGLE_LOADING);
        expect(actions[1]).toHaveProperty('type', SET_CATEGORIES);
        expect(actions[2]).toHaveProperty('type', TOGGLE_LOADING);
        done();
      }).catch(done.fail);
    });

    it('when fetchCategoryTree get error, should dispatch addErrors', (done) => {
      getCategoryTree
        .mockReturnValueOnce(new Promise(resolve => resolve(MOCK_RETURN_PROMISE_ERROR)));
      store.dispatch(fetchCategoryTree()).then(() => {
        expect(getCategoryTree).toHaveBeenCalled();
        const actions = store.getActions();
        expect(actions).toHaveLength(5);
        expect(actions[0]).toHaveProperty('type', TOGGLE_LOADING);
        expect(actions[1]).toHaveProperty('type', SET_CATEGORIES);
        expect(actions[2]).toHaveProperty('type', TOGGLE_LOADING);
        expect(actions[3]).toHaveProperty('type', ADD_ERRORS);
        done();
      }).catch(done.fail);
    });
  });
});
