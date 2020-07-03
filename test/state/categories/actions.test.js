import configureMockStore from 'redux-mock-store';
import { initialize } from 'redux-form';
import thunk from 'redux-thunk';
import { ADD_ERRORS, ADD_TOAST } from '@entando/messages';
import {
  setCategories,
  toggleCategoryExpanded,
  setCategoryLoading,
  setCategoryLoaded,
  setSelectedCategory,
  setReferences,
  fetchCategoryTree,
  handleExpandCategory,
  fetchCategory,
  sendPostCategory,
  sendPutCategory,
  sendDeleteCategory,
  fetchCategoryDetail,
  wrapApiCall,
  fetchReferences,
  initCategoryForm,
} from 'state/categories/actions';

import {
  getCategoryTree,
  postCategory,
  getCategory,
  putCategory,
  deleteCategory,
  getReferences,
} from 'api/categories';
import { mockApi } from 'test/testUtils';

import {
  SET_CATEGORIES, TOGGLE_CATEGORY_EXPANDED, SET_CATEGORY_LOADING,
  SET_CATEGORY_LOADED, CATEGORY_TREE_HOME, SET_SELECTED_CATEGORY,
  SET_REFERENCES,
} from 'state/categories/types';

import { TOGGLE_LOADING } from 'state/loading/types';
import { getCategoriesMap } from 'state/categories/selectors';
import { STATE_NORMALIZED, BODY_OK, CONTENT_REFERENCES } from 'test/mocks/categories';
import { history, ROUTE_CATEGORY_ADD } from 'app-init/router';

const CATEGORY_CODE = 'category_code';
const REFERENCE_KEY = 'jacmsContentManager';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const INITIAL_STATE = {
  categories: {
    list: [],
    map: {
      parentCode: {
        parentCode: '123',
      },
    },
    childrenMap: {},
    titlesMap: {},
    statusMap: {},
    selected: null,
  },
};

jest.mock('app-init/router', () => ({
  history: {
    push: jest.fn(),
  },
}));

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

  it('setSelectedCategory() should return a well formed action', () => {
    const action = setSelectedCategory(BODY_OK);
    expect(action).toHaveProperty('type', SET_SELECTED_CATEGORY);
    expect(action.payload.category).toHaveProperty('code', BODY_OK.code);
  });

  it('setReferences() should return a well formed action', () => {
    const CATEGORY_REFS = {};
    const action = setReferences(CATEGORY_REFS);
    expect(action).toHaveProperty('type', SET_REFERENCES);
    expect(action.payload).toHaveProperty('references', {});
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
      jest.mock('state/categories/selectors', () => ({ getCategoriesMap: () => ({ parentCode: { parentCode: '123' } }) }));
      store.dispatch(sendPostCategory(BODY_OK)).then(() => {
        expect(postCategory).toHaveBeenCalled();
        done();
      }).catch(done.fail);
    });
  });

  describe('fetchCategory()', () => {
    it('when getCategory succeeds should call post action', (done) => {
      getCategory.mockImplementation(mockApi({ payload: BODY_OK }));
      store.dispatch(fetchCategory(CATEGORY_CODE)).then(() => {
        expect(getCategory).toHaveBeenCalledWith(CATEGORY_CODE);
        done();
      }).catch(done.fail);
    });
  });

  describe('sendPutCategory()', () => {
    it('when putCategory succeeds should call post action', (done) => {
      putCategory.mockImplementation(mockApi({ payload: BODY_OK }));
      store.dispatch(sendPutCategory(BODY_OK)).then(() => {
        expect(putCategory).toHaveBeenCalledWith(BODY_OK);
        done();
      }).catch(done.fail);
    });
  });

  describe('fetchCategoryDetail()', () => {
    it('when getCategory succeeds should call post action', (done) => {
      getCategory.mockImplementation(mockApi({ payload: BODY_OK }));
      store.dispatch(fetchCategoryDetail(CATEGORY_CODE)).then(() => {
        const actions = store.getActions();
        expect(actions).toHaveLength(3);
        expect(actions[0]).toHaveProperty('type', TOGGLE_LOADING);
        expect(actions[1]).toHaveProperty('type', SET_SELECTED_CATEGORY);
        expect(actions[2]).toHaveProperty('type', TOGGLE_LOADING);
        done();
      }).catch(done.fail);
    });
  });

  describe('sendDeleteCategory()', () => {
    it('when deleteCategory succeeds should call post action', (done) => {
      deleteCategory.mockImplementation(mockApi({ payload: CATEGORY_CODE }));
      store.dispatch(sendDeleteCategory(CATEGORY_CODE)).then(() => {
        expect(deleteCategory).toHaveBeenCalledWith(CATEGORY_CODE);
        done();
      }).catch(done.fail);
    });
  });

  describe('fetchReferences()', () => {
    it('when getReferences succeeds should call post action', (done) => {
      getReferences.mockImplementation(mockApi({ payload: CONTENT_REFERENCES }));
      const page = { page: 1, pageSize: 10 };
      store.dispatch(fetchReferences(CATEGORY_CODE, REFERENCE_KEY, page)).then(() => {
        expect(getReferences).toHaveBeenCalledWith(CATEGORY_CODE, REFERENCE_KEY, page);
        done();
      }).catch(done.fail);
    });
  });


  describe('wrapApiCall()', () => {
    it('when wrapApiCall succeeds should call api function, the returns a json', (done) => {
      const genericApi = jest.fn().mockImplementation(mockApi({ payload: BODY_OK }));
      store.dispatch(wrapApiCall(genericApi)(BODY_OK)).then(() => {
        expect(genericApi).toHaveBeenCalledWith(BODY_OK);
        done();
      }).catch(done.fail);
    });

    it('when wrapApiCall fails should dispatch addErros function', async () => {
      const genericApi = jest.fn().mockImplementation(mockApi({ errors: true }));
      return store.dispatch(wrapApiCall(genericApi)(BODY_OK)).catch((e) => {
        const actions = store.getActions();
        expect(actions).toHaveLength(2);
        expect(actions[0]).toHaveProperty('type', ADD_ERRORS);
        expect(actions[1]).toHaveProperty('type', ADD_TOAST);
        expect(e).toHaveProperty('errors');
        e.errors.forEach((error, index) => {
          expect(error.message).toEqual(actions[0].payload.errors[index]);
        });
      });
    });

    it('when api does not return json, wrapApiCall throws a TypeError', async () => {
      const genericApi = jest.fn().mockReturnValue('error_result, error_result');
      return store.dispatch(wrapApiCall(genericApi)(BODY_OK)).catch((e) => {
        expect(e instanceof TypeError).toBe(true);
      });
    });
  });

  describe('initCategoryForm()', () => {
    it('when initCategoryForm is called should dispatch initialize action then go to route', () => {
      store = mockStore(STATE_NORMALIZED);
      store.dispatch(initCategoryForm({ parentCode: CATEGORY_CODE }));
      expect(initialize).toHaveBeenCalledWith('category', {
        parentCode: CATEGORY_CODE,
      });
      expect(history.push).toHaveBeenCalledWith(ROUTE_CATEGORY_ADD);
    });
  });
});
