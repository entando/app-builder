import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { ADD_ERRORS, ADD_TOAST } from '@entando/messages';
import {
  setCategories,
  setCategoryExpanded,
  setCategoryLoaded,
  setReferences,
  fetchCategoryTree,
  wrapApiCall,
  fetchReferences,
} from 'state/categories/actions';

import {
  getCategoryTree,
  getReferences,
} from 'api/categories';
import { mockApi } from 'test/testUtils';

import {
  SET_CATEGORIES, SET_CATEGORY_EXPANDED,
  SET_CATEGORY_LOADED, CATEGORY_TREE_HOME,
  SET_REFERENCES,
} from 'state/categories/types';

import { TOGGLE_LOADING } from 'state/loading/types';
import { BODY_OK, CONTENT_REFERENCES } from 'test/mocks/categories';

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

  it('setCategoryExpanded() should return a well formed action', () => {
    const action = setCategoryExpanded(CATEGORY_CODE, true);
    expect(action).toHaveProperty('type', SET_CATEGORY_EXPANDED);
    expect(action.payload).toHaveProperty('categoryCode', CATEGORY_CODE);
    expect(action.payload).toHaveProperty('expanded', true);
  });

  it('setCategoryLoaded() should return a well formed action', () => {
    const action = setCategoryLoaded(CATEGORY_CODE);
    expect(action).toHaveProperty('type', SET_CATEGORY_LOADED);
    expect(action.payload).toHaveProperty('categoryCode', CATEGORY_CODE);
  });

  it('setReferences() should return a well formed action', () => {
    const CATEGORY_REFS = {};
    const action = setReferences(CATEGORY_REFS);
    expect(action).toHaveProperty('type', SET_REFERENCES);
    expect(action.payload).toHaveProperty('references', {});
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
        expect(actions[2]).toHaveProperty('type', SET_CATEGORY_EXPANDED);
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
});
