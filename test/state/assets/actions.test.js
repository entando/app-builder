import { mockApi } from 'test/testUtils';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import 'jest-canvas-mock';
import {
  setAssetCategoryFilter,
  setActiveFilters,
  setAssets,
  removeActiveFilter,
  makeFilter,
  applyAssetsFilter,
  sortAssetsList,
  filterAssetsBySearch,
  changeFileType,
  changeAssetsView,
  fetchAssets,
  sendPostAssetEdit,
  sendDeleteAsset,
  resetFilteringCategories,
  setAssetsCount,
  fetchAssetsCount,
  fetchAssetsPaged,
  advancedSearchFilter,
  sendCloneAsset,
  sendUploadAsset,
} from 'state/assets/actions';
import { SORT_DIRECTIONS } from '@entando/utils';
import {
  SET_ASSETS,
  SET_ASSET_CATEGORY_FILTER,
  SET_ACTIVE_FILTERS,
  REMOVE_ACTIVE_FILTER,
  ASSETS_VIEW_CHANGE,
  FILE_TYPE_CHANGE,
  SET_ASSET_SYNC,
  SET_LIST_FILTER_PARAMS,
  SET_ASSET_SEARCH_KEYWORD,
  RESET_FILTERING_CATEGORIES,
  SET_ASSET_COUNT,
} from 'state/assets/types';
import { SET_PAGE } from 'state/pagination/types';
import { TOGGLE_LOADING } from 'state/loading/types';
import {
  getAssets, editAsset, deleteAsset, cloneAsset, createAsset,
} from 'api/assets';

const ADD_ERRORS = 'errors/add-errors';
const CLEAR_ERRORS = 'errors/clear-errors';
const ADD_TOAST = 'toasts/add-toast';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

jest.unmock('@entando/utils');

jest.mock('api/assets', () => ({
  getAssets: jest.fn(mockApi({ payload: ['a', 'b'], ok: true })),
  editAsset: jest.fn(res => mockApi({ payload: res })()),
  deleteAsset: jest.fn(id => mockApi({ payload: { id } })()),
  cloneAsset: jest.fn(id => mockApi({ payload: { id } })()),
  createAsset: jest.fn(payload => mockApi({ payload })()),
}));

describe('state/assets/actions', () => {
  let store;

  beforeEach(() => {
    store = mockStore({ assets: { filteringCategories: [] } });
  });

  it('checks if setting a category filter works ok', () => {
    setAssetCategoryFilter('fifa_18');
    const state = store.getState();
    expect(state).toHaveProperty('assets');
    const { assets } = state;
    expect(assets).toHaveProperty('filteringCategories');
  });

  it('setAssetCategoryFilter() should return a well formed action', () => {
    const action = setAssetCategoryFilter('fifa_18');
    expect(action).toHaveProperty('type', SET_ASSET_CATEGORY_FILTER);
    expect(action.payload).toEqual({ categories: 'fifa_18' });
  });

  it('setAssetsCount() should return a well formed action', () => {
    const action = setAssetsCount('image', 5);
    expect(action).toHaveProperty('type', SET_ASSET_COUNT);
    expect(action.payload).toEqual({ type: 'image', count: 5 });
  });

  it('setActiveFilters() should return a well formed action', () => {
    const action = setActiveFilters(['fifa_18', 'news']);
    expect(action).toHaveProperty('type', SET_ACTIVE_FILTERS);
    expect(action.payload).toEqual(['fifa_18', 'news']);
  });

  it('resetFilteringCategories() should return a well formed action', () => {
    const action = resetFilteringCategories();
    expect(action).toHaveProperty('type', RESET_FILTERING_CATEGORIES);
    expect(action.payload).toEqual(undefined);
  });

  it('setAssets() should return a well formed action', () => {
    const action = setAssets(['a', 'b']);
    expect(action).toHaveProperty('type', SET_ASSETS);
    expect(action.payload).toEqual(['a', 'b']);
  });

  it('removeActiveFilter() should return a well formed action', () => {
    const action = removeActiveFilter('fifa_18');
    expect(action).toHaveProperty('type', REMOVE_ACTIVE_FILTER);
    expect(action.payload).toEqual('fifa_18');
  });

  it('changeFileType() should return a well formed action', () => {
    const action = changeFileType('image');
    expect(action).toHaveProperty('type', FILE_TYPE_CHANGE);
    expect(action.payload).toEqual('image');
  });

  it('changeAssetsView() should return a well formed action', () => {
    const action = changeAssetsView('grid');
    expect(action).toHaveProperty('type', ASSETS_VIEW_CHANGE);
    expect(action.payload).toEqual('grid');
  });

  describe('fetchAssets()', () => {
    it('when fetching assets it fires all the appropriate actions', (done) => {
      getAssets.mockImplementationOnce(mockApi({ payload: ['a', 'b'], ok: true }));
      store = mockStore({
        assets: { assets: [] },
      });
      store
        .dispatch(fetchAssets())
        .then(() => {
          const actionTypes = store.getActions().map(action => action.type);
          expect(actionTypes).toHaveLength(4);
          expect(actionTypes.includes(TOGGLE_LOADING)).toBe(true);
          expect(actionTypes.includes(SET_ASSETS)).toBe(true);
          done();
        })
        .catch(done.fail);
    });
    it('when fetching assets it reports errors succesfully', (done) => {
      getAssets.mockImplementationOnce(mockApi({ errors: true }));
      store = mockStore({
        assets: { assets: [] },
      });
      store.dispatch(fetchAssets()).then(() => {
        const actions = store.getActions().map(action => action.type);
        expect(actions).toHaveLength(3);
        expect(actions.includes(TOGGLE_LOADING)).toBe(true);
        expect(actions[1]).toEqual(ADD_ERRORS);
        done();
      });
    });
  });

  describe('fetchAssetsCount()', () => {
    it('when fetching assets count it fires all the appropriate actions', (done) => {
      getAssets.mockImplementationOnce(mockApi({ metaData: { totalItems: 10 }, ok: true }));
      store = mockStore({
        assets: { assets: [], assetsCount: {} },
      });
      store
        .dispatch(fetchAssetsCount('image'))
        .then(() => {
          const actionTypes = store.getActions().map(action => action.type);
          expect(actionTypes).toHaveLength(1);
          done();
        })
        .catch(done.fail);
    });
    it('when fetching assets count it fires all the appropriate actions', (done) => {
      getAssets.mockImplementationOnce(mockApi({ ok: true, metaData: null }));
      store = mockStore({
        assets: { assets: [], assetsCount: {} },
      });
      store
        .dispatch(fetchAssetsCount('image'))
        .then(() => {
          const actionTypes = store.getActions().map(action => action.type);
          expect(actionTypes).toHaveLength(1);
          done();
        })
        .catch(done.fail);
    });
    it('when fetching assets count it resolves still successfully', (done) => {
      getAssets.mockImplementationOnce(mockApi({ errors: true }));
      store = mockStore({
        assets: { assets: [] },
      });
      store.dispatch(fetchAssetsCount()).then(() => {
        const actions = store.getActions().map(action => action.type);
        expect(actions).toHaveLength(0);
        done();
      });
    });
  });

  describe('filtering options', () => {
    beforeEach(() => {
      store = mockStore({
        assets: {
          assets: [], filterParams: {}, fileType: 'image', filteringCategories: ['news'],
        },
        pagination: { global: { page: 1, pageSize: 10 } },
      });
    });
    it('applyAssetsFilter', (done) => {
      const filters = { categories: makeFilter(['news', 'bits']) };
      store.dispatch(applyAssetsFilter(filters)).then(() => {
        const actions = store.getActions();
        expect(actions).toHaveLength(5);
        expect(actions[0]).toHaveProperty('type', SET_LIST_FILTER_PARAMS);
        expect(actions[0]).toHaveProperty('payload', {
          formValues: { categories: ['news', 'bits'] },
          operators: { categories: 'eq' },
          sorting: undefined,
        });
        expect(actions[1]).toHaveProperty('type', TOGGLE_LOADING);
        expect(actions[2]).toHaveProperty('type', SET_ASSETS);
        expect(actions[3]).toHaveProperty('type', SET_PAGE);
        expect(actions[4]).toHaveProperty('type', TOGGLE_LOADING);
        done();
      }).catch(done.fail);
    });

    it('applyAssetsFilter', (done) => {
      const filters = { categories: makeFilter(['news', 'bits']) };
      store = mockStore({
        assets: {
          assets: [], filterParams: {}, fileType: 'image', filteringCategories: ['news'],
        },
        pagination: { },
      });
      store.dispatch(applyAssetsFilter(filters)).then(() => {
        const actions = store.getActions();
        expect(actions).toHaveLength(5);
        expect(actions[0]).toHaveProperty('type', SET_LIST_FILTER_PARAMS);
        expect(actions[0]).toHaveProperty('payload', {
          formValues: { categories: ['news', 'bits'] },
          operators: { categories: 'eq' },
          sorting: undefined,
        });
        expect(actions[1]).toHaveProperty('type', TOGGLE_LOADING);
        expect(actions[2]).toHaveProperty('type', SET_ASSETS);
        expect(actions[3]).toHaveProperty('type', SET_PAGE);
        expect(actions[4]).toHaveProperty('type', TOGGLE_LOADING);
        done();
      }).catch(done.fail);
    });

    it('sortAssetsList', (done) => {
      const attribute = 'name';
      store.dispatch(sortAssetsList(attribute)).then(() => {
        const actions = store.getActions();
        expect(actions).toHaveLength(5);
        expect(actions[0]).toHaveProperty('type', SET_LIST_FILTER_PARAMS);
        expect(actions[0]).toHaveProperty('payload', {
          sorting: { attribute, direction: SORT_DIRECTIONS.ASCENDANT },
        });
        expect(actions[1]).toHaveProperty('type', TOGGLE_LOADING);
        expect(actions[2]).toHaveProperty('type', SET_ASSETS);
        expect(actions[3]).toHaveProperty('type', SET_PAGE);
        expect(actions[4]).toHaveProperty('type', TOGGLE_LOADING);
        done();
      });
    });

    it('sortAssetsList', (done) => {
      const attribute = 'name';
      store = mockStore({
        assets: {
          assets: [], filterParams: {}, fileType: 'image', filteringCategories: ['news'],
        },
        pagination: { },
      });
      store.dispatch(sortAssetsList(attribute)).then(() => {
        const actions = store.getActions();
        expect(actions).toHaveLength(5);
        expect(actions[0]).toHaveProperty('type', SET_LIST_FILTER_PARAMS);
        expect(actions[0]).toHaveProperty('payload', {
          sorting: { attribute, direction: SORT_DIRECTIONS.ASCENDANT },
        });
        expect(actions[1]).toHaveProperty('type', TOGGLE_LOADING);
        expect(actions[2]).toHaveProperty('type', SET_ASSETS);
        expect(actions[3]).toHaveProperty('type', SET_PAGE);
        expect(actions[4]).toHaveProperty('type', TOGGLE_LOADING);
        done();
      });
    });

    it('sortAssetsList on reciprocating direction', (done) => {
      const attribute = 'name';
      const filterParams = {
        formValues: { cats: 1 },
        operators: { cats: 'eq' },
        sorting: { attribute, direction: SORT_DIRECTIONS.ASCENDANT },
      };
      store = mockStore({
        assets: {
          assets: [],
          filterParams,
          fileType: 'image',
          filteringCategories: ['cats'],
        },
        pagination: { global: { page: 1, pageSize: 10 } },
      });
      store.dispatch(sortAssetsList(attribute)).then(() => {
        const actions = store.getActions();
        expect(actions).toHaveLength(5);
        expect(actions[0]).toHaveProperty('type', SET_LIST_FILTER_PARAMS);
        expect(actions[0]).toHaveProperty('payload', {
          ...filterParams,
          sorting: {
            attribute,
            direction: SORT_DIRECTIONS.ASCENDANT,
          },
        });
        done();
      });
    });

    it('filterAssetsBySearch', (done) => {
      const keyword = 'keye';
      store.dispatch(filterAssetsBySearch(keyword)).then(() => {
        const actions = store.getActions();
        expect(actions).toHaveLength(6);
        expect(actions[0]).toHaveProperty('type', SET_ASSET_SEARCH_KEYWORD);
        expect(actions[1]).toHaveProperty('type', SET_LIST_FILTER_PARAMS);
        expect(actions[1]).toHaveProperty('payload', {
          formValues: {
            description: keyword,
          },
          operators: {
            description: 'like',
          },
          sorting: undefined,
        });
        done();
      });
    });

    it('filterAssetsBy advanced Search', (done) => {
      const values = { owner: 'admin' };
      store.dispatch(advancedSearchFilter(values)).then(() => {
        const actions = store.getActions();
        expect(actions).toHaveLength(6);
        expect(actions[0]).toHaveProperty('type', 'assets/set-list-filter-params');
        expect(actions[1]).toHaveProperty('type', 'assets/set-list-filter-params');
        expect(actions[2]).toHaveProperty('type', TOGGLE_LOADING);
        expect(actions[3]).toHaveProperty('type', SET_ASSETS);
        expect(actions[4]).toHaveProperty('type', SET_PAGE);
        expect(actions[5]).toHaveProperty('type', TOGGLE_LOADING);
        done();
      });
    });

    it('filterAssetsBy advanced Search', (done) => {
      const values = { fromDate: '01/10/2020', toDate: '01/11/2010' };
      store = mockStore({
        assets: { filterParams: {} },
        pagination: { global: { page: 1, pageSize: 10 } },
      });
      store.dispatch(advancedSearchFilter(values)).then(() => {
        const actions = store.getActions();
        expect(actions).toHaveLength(6);
        expect(actions[0]).toHaveProperty('type', 'assets/set-list-filter-params');
        expect(actions[1]).toHaveProperty('type', 'assets/set-list-filter-params');
        expect(actions[2]).toHaveProperty('type', TOGGLE_LOADING);
        expect(actions[3]).toHaveProperty('type', SET_ASSETS);
        expect(actions[4]).toHaveProperty('type', SET_PAGE);
        expect(actions[5]).toHaveProperty('type', TOGGLE_LOADING);
        done();
      });
    });

    it('filterAssetsBy advanced Search', (done) => {
      const values = { group: 'free' };
      store = mockStore({
        assets: { filterParams: {}, fileType: 'image' },
        pagination: { global: { page: 1, pageSize: 10 } },
      });
      store.dispatch(advancedSearchFilter(values)).then(() => {
        const actions = store.getActions();
        expect(actions).toHaveLength(6);
        expect(actions[0]).toHaveProperty('type', 'assets/set-list-filter-params');
        expect(actions[1]).toHaveProperty('type', 'assets/set-list-filter-params');
        expect(actions[2]).toHaveProperty('type', TOGGLE_LOADING);
        expect(actions[3]).toHaveProperty('type', SET_ASSETS);
        expect(actions[4]).toHaveProperty('type', SET_PAGE);
        expect(actions[5]).toHaveProperty('type', TOGGLE_LOADING);
        done();
      });
    });

    it('filterAssetsBy advanced Search', (done) => {
      const values = { group: 'free' };
      store = mockStore({
        assets: { filterParams: { }, fileType: 'all' },
        form: {
          assetSearchForm: {
            values: {
              keyword: 'name',
            },
          },
        },
        pagination: { global: { page: 1, pageSize: 10 } },
      });
      store.dispatch(advancedSearchFilter(values)).then(() => {
        const actions = store.getActions();
        expect(actions).toHaveLength(6);
        expect(actions[0]).toHaveProperty('type', 'assets/set-list-filter-params');
        expect(actions[1]).toHaveProperty('type', 'assets/set-list-filter-params');
        expect(actions[2]).toHaveProperty('type', TOGGLE_LOADING);
        expect(actions[3]).toHaveProperty('type', SET_ASSETS);
        expect(actions[4]).toHaveProperty('type', SET_PAGE);
        expect(actions[5]).toHaveProperty('type', TOGGLE_LOADING);
        done();
      });
    });

    it('fetchAssetsPaged with categories', (done) => {
      const filterParams = {
        formValues: { categories: ['yo', 'aa'] },
        operators: { categories: 'like' },
      };
      store = mockStore({
        assets: {
          assets: [],
          filterParams,
          fileType: 'image',
          filteringCategories: ['cats'],
        },
        pagination: { global: { page: 1, pageSize: 10 } },
      });
      store.dispatch(fetchAssetsPaged(null, null, 'admin', ['a'])).then(() => {
        const actions = store.getActions();
        expect(actions).toHaveLength(4);
        done();
      });
    });

    it('fetchAssetsPaged with tabs and no join groups', (done) => {
      const filterParams = {
        formValues: { categories: ['yo', 'aa'] },
        operators: { categories: 'like' },
      };
      store = mockStore({
        assets: {
          assets: [],
          filterParams,
          fileType: 'image',
          filteringCategories: ['cats'],
        },
        pagination: { global: { page: 1, pageSize: 10 } },
      });
      store.dispatch(fetchAssetsPaged(null, null, 'admin')).then(() => {
        const actions = store.getActions();
        expect(actions).toHaveLength(4);
        done();
      });
    });

    it('filterAssetsBySearch on clearing', (done) => {
      const keyword = '';
      const filterParams = {
        formValues: { description: 'yo' },
        operators: { description: 'like' },
      };
      store = mockStore({
        assets: {
          assets: [],
          filterParams,
          fileType: 'image',
          filteringCategories: ['cats'],
        },
        pagination: { global: { page: 1, pageSize: 10 } },
      });
      store.dispatch(filterAssetsBySearch(keyword)).then(() => {
        const actions = store.getActions();
        expect(actions).toHaveLength(6);
        expect(actions[0]).toHaveProperty('type', SET_ASSET_SEARCH_KEYWORD);
        expect(actions[1]).toHaveProperty('type', SET_LIST_FILTER_PARAMS);
        expect(actions[1]).toHaveProperty('payload', {
          formValues: {},
          operators: {},
          sorting: undefined,
        });
        done();
      });
    });

    it('filterAssetsBySearch on clearing', (done) => {
      const keyword = '';
      const filterParams = {
        formValues: { description: 'yo' },
        operators: { description: 'like' },
      };
      store = mockStore({
        assets: {
          assets: [],
          filterParams,
          fileType: 'image',
          filteringCategories: ['cats'],
        },
        pagination: { },
      });
      store.dispatch(filterAssetsBySearch(keyword)).then(() => {
        const actions = store.getActions();
        expect(actions).toHaveLength(6);
        expect(actions[0]).toHaveProperty('type', SET_ASSET_SEARCH_KEYWORD);
        expect(actions[1]).toHaveProperty('type', SET_LIST_FILTER_PARAMS);
        expect(actions[1]).toHaveProperty('payload', {
          formValues: {},
          operators: {},
          sorting: undefined,
        });
        done();
      });
    });
  });

  describe('sendPostAssetEdit', () => {
    const tosend = { id: 1, filename: 'jojo.jpg', description: 'jojopic' };
    const fileblob = new Blob([JSON.stringify({ hello: 'world' }, null, 2)], { type: 'application/json' });
    it('sendPostAssetEdit success', (done) => {
      store
        .dispatch(sendPostAssetEdit(tosend, fileblob))
        .then(() => {
          expect(editAsset).toHaveBeenCalledWith(tosend.id, expect.any(Object));
          const actions = store.getActions();
          expect(actions).toHaveLength(3);
          expect(actions[0]).toHaveProperty('type', TOGGLE_LOADING);
          expect(actions[1]).toHaveProperty('type', TOGGLE_LOADING);
          expect(actions[2]).toHaveProperty('type', SET_ASSET_SYNC);
          done();
        })
        .catch(done.fail);
    });

    it('sendPostAssetEdit error', (done) => {
      editAsset.mockImplementationOnce(mockApi({ errors: true }));
      store
        .dispatch(sendPostAssetEdit(tosend, fileblob))
        .then((res) => {
          expect(editAsset).toHaveBeenCalledWith(tosend.id, expect.any(Object));
          expect(res).toEqual(undefined);
          const actions = store.getActions();
          expect(actions).toHaveLength(5);
          expect(actions[0]).toHaveProperty('type', TOGGLE_LOADING);
          expect(actions[1]).toHaveProperty('type', TOGGLE_LOADING);
          expect(actions[2]).toHaveProperty('type', 'errors/add-errors');
          expect(actions[3]).toHaveProperty('type', 'errors/clear-errors');
          expect(actions[4]).toHaveProperty('type', 'toasts/add-toast');
          done();
        })
        .catch(done.fail);
    });
  });

  describe('sendUploadAsset', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      store = mockStore({
        assets: {
          assets: [], filterParams: {}, fileType: 'image', filteringCategories: ['news'],
        },
        pagination: { global: { page: 1, pageSize: 10 } },
      });
    });

    it('should call createAsset with correct form data', (done) => {
      const file = {
        fileObject: new Blob(['test'], { type: 'application/json' }),
        group: 'testgroup',
        categories: ['cat1', 'cat2'],
        filename: 'testfile.json',
      };
      store
        .dispatch(sendUploadAsset(file))
        .then(() => {
          const createAssetArg = createAsset.mock.calls[0][0];
          expect(createAssetArg).toBeInstanceOf(FormData);
          expect(createAssetArg.get('file')).toBeInstanceOf(File);
          const expectedMetadata = JSON.stringify({ group: file.group, categories: file.categories, type: 'file' });
          expect(createAssetArg.get('metadata')).toBe(expectedMetadata);
          const actions = store.getActions();
          expect(actions).toHaveLength(1);
          done();
        }).catch(done.fail);
    });

    it('should convert svg to bitmap image before calling createAsset with correct form data', (done) => {
      const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50">
          <circle cx="25" cy="25" r="20"/>
        </svg>
      `;
      const file = {
        fileObject: new Blob([svg], { type: 'image/svg+xml' }),
        group: 'testgroup',
        categories: ['cat1', 'cat2'],
        filename: 'testfile.svg',
      };
      store
        .dispatch(sendUploadAsset(file))
        .then(() => {
          const createAssetArg = createAsset.mock.calls[0][0];
          expect(createAssetArg).toBeInstanceOf(FormData);
          const formFile = createAssetArg.get('file');
          expect(formFile).toBeInstanceOf(File);
          expect(formFile.name).toBe('testfile.png');
          const expectedMetadata = JSON.stringify({ group: file.group, categories: file.categories, type: 'image' });
          expect(createAssetArg.get('metadata')).toBe(expectedMetadata);
          const actions = store.getActions();
          expect(actions).toHaveLength(1);
          done();
        }).catch(done.fail);
    });

    it('should dispatch correct actions when error occurs', (done) => {
      createAsset.mockImplementationOnce(mockApi({ errors: true }));
      const file = {
        fileObject: new Blob(['test'], { type: 'application/json' }),
        group: 'testgroup',
        categories: ['cat1', 'cat2'],
        filename: 'testfile.json',
      };
      store
        .dispatch(sendUploadAsset(file))
        .then(() => {
          const actions = store.getActions();
          expect(actions).toHaveLength(3);
          expect(actions[0]).toHaveProperty('type', 'errors/add-errors');
          expect(actions[1]).toHaveProperty('type', 'errors/clear-errors');
          expect(actions[2]).toHaveProperty('type', 'toasts/add-toast');
          done();
        }).catch(done.fail);
    });
  });

  describe('deleteAsset()', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      store = mockStore({
        assets: {
          assets: [], filterParams: {}, fileType: 'image', filteringCategories: ['news'],
        },
        pagination: { global: { page: 1, pageSize: 10 } },
      });
    });
    it('deleting asset', (done) => {
      store
        .dispatch(sendDeleteAsset(1))
        .then(() => {
          const actionTypes = store.getActions().map(action => action.type);
          expect(actionTypes).toHaveLength(1);
          expect(actionTypes.includes(TOGGLE_LOADING)).toBe(true);
          done();
        })
        .catch(done.fail);
    });

    it('when deleting asset it reports errors succesfully', (done) => {
      deleteAsset.mockImplementationOnce(mockApi({ errors: true }));
      store.dispatch(sendDeleteAsset(2)).then(() => {
        const actions = store.getActions().map(action => action.type);
        expect(actions).toHaveLength(3);
        expect(actions.includes(ADD_ERRORS)).toBe(true);
        expect(actions.includes(CLEAR_ERRORS)).toBe(true);
        expect(actions.includes(ADD_TOAST)).toBe(true);
        done();
      }).catch(done.fail);
    });
  });


  describe('cloneAsset()', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      store = mockStore({
        assets: {
          assets: [], filterParams: {}, fileType: 'image', filteringCategories: ['news'],
        },
        pagination: { global: { page: 1, pageSize: 10 } },
      });
    });
    it('clone asset', (done) => {
      store
        .dispatch(sendCloneAsset(1))
        .then(() => {
          const actionTypes = store.getActions().map(action => action.type);
          expect(actionTypes).toHaveLength(3);
          expect(actionTypes.includes(TOGGLE_LOADING)).toBe(true);
          done();
        })
        .catch(done.fail);
    });

    it('when cloning asset it reports errors succesfully', (done) => {
      cloneAsset.mockImplementationOnce(mockApi({ errors: true }));
      store.dispatch(sendCloneAsset(2)).then(() => {
        const actions = store.getActions().map(action => action.type);
        expect(actions).toHaveLength(5);
        expect(actions.includes(ADD_ERRORS)).toBe(true);
        expect(actions.includes(CLEAR_ERRORS)).toBe(true);
        expect(actions.includes(ADD_TOAST)).toBe(true);
        done();
      }).catch(done.fail);
    });
  });
});
