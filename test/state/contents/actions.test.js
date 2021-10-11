import { mockApi } from 'test/testUtils';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { TOGGLE_LOADING } from 'state/loading/types';
import { SET_PAGE } from 'state/pagination/types';
import {
  getContents, deleteContent, publishContent, updateContents,
  publishMultipleContents, getContentsStatus, cloneContent,
} from 'api/contents';
import {
  setQuickFilter, setContentType, setGroup, setSort,
  setContentCategoryFilter, checkStatus, checkAccess,
  checkAuthor, setCurrentAuthorShow, setCurrentStatusShow,
  selectRow, selectAllRows, fetchContents,
  sendDeleteContent, sendPublishContent, setJoinContentCategory,
  resetJoinContentCategories, sendUpdateContents, fetchContentsPaged, setTabSearch,
  sendPublishMultipleContents,
  sendCloneContent,
  resetAuthorStatus,
  leaveContentsPage,
  selectSingleRow,
  fetchContentsStatus,
} from 'state/contents/actions';
import { MOCK_CONTENTS_STATUS } from 'test/mocks/contents';
import {
  SET_QUICK_FILTER, SET_CONTENT_TYPE, SET_GROUP,
  SET_SORT, SET_CONTENT_CATEGORY_FILTER, CHECK_STATUS, CHECK_ACCESS,
  CHECK_AUTHOR, SET_CURRENT_AUTHOR_SHOW, SET_CURRENT_STATUS_SHOW,
  SELECT_ROW, SELECT_ALL_ROWS, SET_CONTENTS,
  SET_JOIN_CONTENT_CATEGORY, RESET_JOIN_CONTENT_CATEGORIES, SET_TAB_SEARCH, RESET_AUTHOR_STATUS,
  CLEAR_CONTENTS_STATE, SELECT_SINGLE_ROW, SET_CONTENTS_STATUS,
} from 'state/contents/types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const ADD_ERRORS = 'errors/add-errors';
const CLEAR_ERRORS = 'errors/clear-errors';
const ADD_TOAST = 'toasts/add-toast';

jest.mock('api/contents', () => ({
  getContents: jest.fn(mockApi({ payload: ['a', 'b'], ok: true })),
  deleteContent: jest.fn(mockApi({ payload: { result: 'ok' } })),
  cloneContent: jest.fn(mockApi({ payload: { result: 'ok' } })),
  publishContent: jest.fn(mockApi({ payload: { result: 'ok' } })),
  updateContents: jest.fn(mockApi({ payload: { result: 'ok' } })),
  publishMultipleContents: jest.fn(mockApi({ payload: { result: 'ok' } })),
  getContentsStatus: jest.fn(mockApi({ payload: {} })),
}));

jest.mock('api/editContent', () => ({
  postAddContent: jest.fn(mockApi({ payload: { a: 1, contentType: { typeCode: 'NEWS', typeDescription: 'News' } } })),
}));

describe('state/contents/actions', () => {
  let store;

  beforeEach(() => {
    store = mockStore({ assets: { filteringCategories: [] } });
  });

  it('setQuickFilter() should return a well formed action', () => {
    const action = setQuickFilter({ name: 'code', value: 'NEW2' });
    expect(action).toHaveProperty('type', SET_QUICK_FILTER);
    expect(action.payload.name).toEqual('code');
    expect(action.payload.value).toEqual('NEW2');
  });

  it('setTabSearch() should return a well formed action', () => {
    const action = setTabSearch(true);
    expect(action).toHaveProperty('type', SET_TAB_SEARCH);
    expect(action.payload).toEqual(true);
  });

  it('setContentType() should return a well formed action', () => {
    const action = setContentType('NEWS');
    expect(action).toHaveProperty('type', SET_CONTENT_TYPE);
    expect(action.payload).toEqual('NEWS');
  });

  it('leaveContentsPage() should return a well formed action', () => {
    const action = leaveContentsPage();
    expect(action).toHaveProperty('type', CLEAR_CONTENTS_STATE);
  });

  it('selectSingleRow() should return a well formed action', () => {
    const action = selectSingleRow(1);
    expect(action).toHaveProperty('type', SELECT_SINGLE_ROW);
    expect(action.payload).toEqual(1);
  });

  it('setGroup() should return a well formed action', () => {
    const action = setGroup('free');
    expect(action).toHaveProperty('type', SET_GROUP);
    expect(action.payload).toEqual('free');
  });

  it('setSort() should return a well formed action', () => {
    const action = setSort({ description: { direction: 'ASC', position: 0 } });
    expect(action).toHaveProperty('type', SET_SORT);
    expect(action.payload).toEqual({ description: { direction: 'ASC', position: 0 } });
  });

  it('setContentCategoryFilter() should return a well formed action', () => {
    const action = setContentCategoryFilter([{ code: 'NEWS', name: 'News' }]);
    expect(action).toHaveProperty('type', SET_CONTENT_CATEGORY_FILTER);
    expect(action.payload).toEqual({ categories: [{ code: 'NEWS', name: 'News' }] });
  });

  it('setJoinContentCategory() should return a well formed action', () => {
    const action = setJoinContentCategory([{ code: 'NEWS', name: 'News' }]);
    expect(action).toHaveProperty('type', SET_JOIN_CONTENT_CATEGORY);
    expect(action.payload).toEqual({ categories: [{ code: 'NEWS', name: 'News' }] });
  });

  it('resetJoinContentCategories() should return a well formed action', () => {
    const action = resetJoinContentCategories();
    expect(action).toHaveProperty('type', RESET_JOIN_CONTENT_CATEGORIES);
  });

  it('checkStatus() should return a well formed action', () => {
    const action = checkStatus('approved');
    expect(action).toHaveProperty('type', CHECK_STATUS);
    expect(action.payload).toEqual('approved');
  });

  it('checkAccess() should return a well formed action', () => {
    const action = checkAccess('open');
    expect(action).toHaveProperty('type', CHECK_ACCESS);
    expect(action.payload).toEqual('open');
  });

  it('checkAuthor() should return a well formed action', () => {
    const action = checkAuthor('me');
    expect(action).toHaveProperty('type', CHECK_AUTHOR);
    expect(action.payload).toEqual('me');
  });

  it('setCurrentAuthorShow() should return a well formed action', () => {
    const action = setCurrentAuthorShow('me');
    expect(action).toHaveProperty('type', SET_CURRENT_AUTHOR_SHOW);
    expect(action.payload).toEqual('me');
  });

  it('setCurrentStatusShow() should return a well formed action', () => {
    const action = setCurrentStatusShow('approved');
    expect(action).toHaveProperty('type', SET_CURRENT_STATUS_SHOW);
    expect(action.payload).toEqual('approved');
  });

  it('resetAuthorStatus() should return a well formed action', () => {
    const action = resetAuthorStatus();
    expect(action).toHaveProperty('type', RESET_AUTHOR_STATUS);
  });

  it('selectRow() should return a well formed action', () => {
    const action = selectRow({ id: 'row1' });
    expect(action).toHaveProperty('type', SELECT_ROW);
    expect(action.payload).toEqual({ id: 'row1' });
  });

  it('selectAllRows() should return a well formed action', () => {
    const action = selectAllRows(true);
    expect(action).toHaveProperty('type', SELECT_ALL_ROWS);
    expect(action.payload).toEqual(true);
  });

  describe('fetchContents()', () => {
    it('when fetching contents it fires all the appropriate actions', (done) => {
      getContents.mockImplementationOnce(mockApi({ payload: ['a', 'b'], ok: true }));
      store = mockStore({
        contents: { contents: [] },
      });
      store
        .dispatch(fetchContents())
        .then(() => {
          const actionTypes = store.getActions().map(action => action.type);
          expect(actionTypes).toHaveLength(5);
          expect(actionTypes.includes(TOGGLE_LOADING)).toBe(true);
          expect(actionTypes.includes(SET_CONTENTS)).toBe(true);
          expect(actionTypes.includes(SET_PAGE)).toBe(true);
          expect(actionTypes.includes(SELECT_ALL_ROWS)).toBe(true);
          done();
        })
        .catch(done.fail);
    });
    it('when fetching contents it reports errors succesfully', (done) => {
      getContents.mockImplementationOnce(mockApi({ errors: true }));
      store = mockStore({
        contents: { contents: [] },
      });
      store.dispatch(fetchContents()).then(() => {
        const actions = store.getActions().map(action => action.type);
        expect(actions).toHaveLength(6);
        expect(actions.includes(TOGGLE_LOADING)).toBe(true);
        expect(actions.includes(SELECT_ALL_ROWS)).toBe(true);
        expect(actions[1]).toEqual(ADD_ERRORS);
        expect(actions[2]).toEqual(CLEAR_ERRORS);
        done();
      });
    });
  });
  describe('deleteContent()', () => {
    it('when deleting content it fires all the appropriate actions', (done) => {
      deleteContent.mockImplementationOnce(mockApi({ payload: { result: 'ok' } }));
      store = mockStore({
        contents: {
          contents: [],
          currentQuickFilter: { id: 'id', value: 'test' },
          sortingColumns: {
            attribute: 'created',
            direction: 'ASC',
          },
        },
        pagination: { global: { page: 1, pageSize: 10 } },
      });
      store
        .dispatch(sendDeleteContent('NEW1'))
        .then(() => {
          const actionTypes = store.getActions().map(action => action.type);
          expect(actionTypes).toHaveLength(1);
          expect(actionTypes.includes(TOGGLE_LOADING)).toBe(true);
          done();
        })
        .catch(done.fail);
    });
    it('when deleting content it reports errors succesfully', (done) => {
      deleteContent.mockImplementationOnce(mockApi({ errors: true }));
      store = mockStore({
        contents: {
          contents: [],
          currentQuickFilter: { id: 'id', value: 'test' },
          sortingColumns: {
            attribute: 'created',
            direction: 'ASC',
          },
        },
      });
      store.dispatch(sendDeleteContent('NEW1')).then(() => {
        const actions = store.getActions().map(action => action.type);
        expect(actions).toHaveLength(3);
        expect(actions.includes(ADD_ERRORS)).toBe(true);
        expect(actions.includes(CLEAR_ERRORS)).toBe(true);
        expect(actions.includes(ADD_TOAST)).toBe(true);
        done();
      });
    });
  });
  describe('publishMultipleContents()', () => {
    it('when publishing multiple contents it fires all the appropriate actions', (done) => {
      publishMultipleContents.mockImplementationOnce(mockApi({ payload: { result: 'ok' } }));
      store = mockStore({
        contents: {
          contents: [],
          currentQuickFilter: { id: 'id', value: 'test' },
          sortingColumns: {
            attribute: 'created',
            direction: 'ASC',
          },
        },
        pagination: { global: { page: 1, pageSize: 10 } },
      });
      store
        .dispatch(sendPublishMultipleContents(['id1', 'id2'], 'published'))
        .then(() => {
          const actionTypes = store.getActions().map(action => action.type);
          expect(actionTypes).toHaveLength(1);
          expect(actionTypes.includes(TOGGLE_LOADING)).toBe(true);
          done();
        })
        .catch(done.fail);
    });
    it('when publishing multiple contents it reports errors succesfully', (done) => {
      publishMultipleContents.mockImplementationOnce(mockApi({ errors: true }));
      store = mockStore({
        contents: {
          contents: [],
          currentQuickFilter: { id: 'id', value: 'test' },
          sortingColumns: {
            attribute: 'created',
            direction: 'ASC',
          },
        },
      });
      store.dispatch(sendPublishMultipleContents(['id1', 'id2'], 'published')).then(() => {
        const actions = store.getActions().map(action => action.type);
        expect(actions).toHaveLength(3);
        expect(actions.includes(ADD_ERRORS)).toBe(true);
        expect(actions.includes(CLEAR_ERRORS)).toBe(true);
        expect(actions.includes(ADD_TOAST)).toBe(true);
        done();
      });
    });
  });
  describe('Test cloning a content', () => {
    it('when publishing multiple contents it fires all the appropriate actions', (done) => {
      cloneContent.mockImplementationOnce(mockApi({ payload: { result: 'ok' } }));
      store = mockStore({
        contents: {
          contents: [],
          currentQuickFilter: { id: 'id', value: 'test' },
          sortingColumns: {
            attribute: 'created',
            direction: 'ASC',
          },
        },
        pagination: { global: { page: 1, pageSize: 10 } },
      });
      store
        .dispatch(sendCloneContent({}))
        .then((res) => {
          expect(res).not.toBe(null);
          done();
        })
        .catch(done.fail);
    });
    it('when publishing multiple contents it reports errors succesfully', (done) => {
      cloneContent.mockImplementationOnce(mockApi({ errors: true }));
      store = mockStore({
        contents: {
          contents: [],
          currentQuickFilter: { id: 'id', value: 'test' },
          sortingColumns: {
            attribute: 'created',
            direction: 'ASC',
          },
        },
      });
      store.dispatch(sendCloneContent({})).then(() => {
        const actions = store.getActions().map(action => action.type);
        expect(actions).toHaveLength(3);
        expect(actions.includes(ADD_ERRORS)).toBe(true);
        expect(actions.includes(CLEAR_ERRORS)).toBe(true);
        expect(actions.includes(ADD_TOAST)).toBe(true);
        done();
      });
    });
  });
  describe('publishContent()', () => {
    it('when publishing/unpublishing content it fires all the appropriate actions', (done) => {
      publishContent.mockImplementationOnce(mockApi({ payload: { result: 'ok' } }));
      store = mockStore({
        contents: {
          contents: [],
          currentQuickFilter: { id: 'id', value: 'test' },
          sortingColumns: {
            attribute: 'created',
            direction: 'ASC',
          },
        },
        pagination: { global: { page: 1, pageSize: 10 } },
      });
      store
        .dispatch(sendPublishContent('NEW1', 'published'))
        .then((res) => {
          expect(res).not.toBe(null);
          done();
        })
        .catch(done.fail);
    });
    it('when publishing/unpublishing content it reports errors succesfully', (done) => {
      publishContent.mockImplementationOnce(mockApi({ errors: true }));
      store = mockStore({
        contents: { contents: [] },
      });
      store.dispatch(sendPublishContent('NEW1', 'published')).then(() => {
        const actions = store.getActions().map(action => action.type);
        expect(actions).toHaveLength(3);
        expect(actions.includes(ADD_ERRORS)).toBe(true);
        expect(actions.includes(CLEAR_ERRORS)).toBe(true);
        expect(actions.includes(ADD_TOAST)).toBe(true);
        done();
      });
    });
  });
  describe('sendUpdateContents()', () => {
    it('when updating batch of contents it fires all the appropriate actions', (done) => {
      updateContents.mockImplementationOnce(mockApi({ payload: { result: 'ok' } }));
      store = mockStore({
        contents: {
          contents: [],
          currentQuickFilter: { id: 'id', value: 'test' },
          sortingColumns: {
            attribute: 'created',
            direction: 'ASC',
          },
        },
        pagination: { global: { page: 1, pageSize: 10 } },
      });
      store
        .dispatch(sendUpdateContents([{ a: 1 }]))
        .then(() => {
          const actionTypes = store.getActions().map(action => action.type);
          expect(actionTypes).toHaveLength(1);
          expect(actionTypes.includes(TOGGLE_LOADING)).toBe(true);
          done();
        })
        .catch(done.fail);
    });

    it('when updating batch of contents it fires all the appropriate actions', (done) => {
      updateContents.mockImplementationOnce(mockApi({ payload: { result: 'ok' } }));
      store = mockStore({
        contents: {
          contents: [],
          sortingColumns: {
            attribute: 'created',
            direction: 'ASC',
          },
          currentQuickFilter: { id: 'id', value: '' },
          filteringCategories: ['a', 'b'],
          contentType: 'OLD',
          group: 'free',
          statusChecked: 'draft',
          accessChecked: 'free',
          authorChecked: 'admin',
        },
        pagination: { global: { page: 1, pageSize: 10 } },
      });
      store
        .dispatch(sendUpdateContents([{ a: 1 }]))
        .then(() => {
          const actionTypes = store.getActions().map(action => action.type);
          expect(actionTypes).toHaveLength(1);
          expect(actionTypes.includes(TOGGLE_LOADING)).toBe(true);
          done();
        })
        .catch(done.fail);
    });

    it('when updating batch of contents it fires all the appropriate actions', (done) => {
      updateContents.mockImplementationOnce(mockApi({ payload: { result: 'ok' } }));
      store = mockStore({
        contents: {
          contents: [],
          sortingColumns: {
            attribute: 'created',
            direction: 'ASC',
          },
          currentQuickFilter: { id: 'id', value: '' },
          filteringCategories: ['a', 'b'],
          currentStatusShow: 'draft',
          currentAuthorShow: 'admin',
        },
        pagination: { global: { page: 1, pageSize: 10 } },
      });
      store
        .dispatch(sendUpdateContents([{ a: 1 }]))
        .then(() => {
          const actionTypes = store.getActions().map(action => action.type);
          expect(actionTypes).toHaveLength(1);
          expect(actionTypes.includes(TOGGLE_LOADING)).toBe(true);
          done();
        })
        .catch(done.fail);
    });

    it('when updating batch of contents it fires all the appropriate actions', (done) => {
      updateContents.mockImplementationOnce(mockApi({ payload: { result: 'ok' } }));
      store = mockStore({
        contents: {
          contents: [],
          sortingColumns: {
            attribute: 'created',
            direction: 'ASC',
          },
          accessChecked: 'administrators',
          currentQuickFilter: { id: 'id', value: '' },
        },
        pagination: { global: { page: 1, pageSize: 10 } },
      });
      store
        .dispatch(sendUpdateContents([{ a: 1 }]))
        .then(() => {
          const actionTypes = store.getActions().map(action => action.type);
          expect(actionTypes).toHaveLength(1);
          expect(actionTypes.includes(TOGGLE_LOADING)).toBe(true);
          done();
        })
        .catch(done.fail);
    });

    it('when updating batch of contents it reports errors succesfully', (done) => {
      updateContents.mockImplementationOnce(mockApi({ errors: true }));
      store = mockStore({
        contents: { contents: [], currentQuickFilter: { id: 'id', value: 'test' } },
      });
      store.dispatch(sendUpdateContents([{ a: 1 }])).then(() => {
        const actions = store.getActions().map(action => action.type);
        expect(actions).toHaveLength(3);
        expect(actions.includes(ADD_ERRORS)).toBe(true);
        expect(actions.includes(CLEAR_ERRORS)).toBe(true);
        expect(actions.includes(ADD_TOAST)).toBe(true);
        done();
      });
    });

    it('when updating batch of contents it fires all the appropriate actions', (done) => {
      store = mockStore({
        contents: {
          contents: [],
          accessChecked: 'administrators',
          currentQuickFilter: { id: 'id', value: '' },
          currentStatusShow: 'published',
          sortingColumns: {
            attribute: 'created',
            direction: 'ASC',
          },
        },
        pagination: { global: { page: 1, pageSize: 10 } },
      });
      store
        .dispatch(fetchContentsPaged({ params: '?test=a' }))
        .then(() => {
          const actionTypes = store.getActions().map(action => action.type);
          expect(actionTypes).toHaveLength(5);
          expect(actionTypes.includes(TOGGLE_LOADING)).toBe(true);
          expect(actionTypes.includes(SET_CONTENTS)).toBe(true);
          expect(actionTypes.includes(SET_PAGE)).toBe(true);
          expect(actionTypes.includes(SELECT_ALL_ROWS)).toBe(true);
          done();
        })
        .catch(done.fail);
    });

    it('when fetching contents paged all the necessary actions are triggered', (done) => {
      store = mockStore({
        contents: {
          contents: [],
          accessChecked: 'administrators',
          currentStatusShow: 'published',
          currentAuthorShow: 'all',
          currentQuickFilter: {},
          sortingColumns: {
            attribute: 'created',
            direction: 'ASC',
          },
          tabSearchEnabled: true,
        },
        pagination: { global: { page: 1, pageSize: 10 } },
      });
      store
        .dispatch(fetchContentsPaged({ params: '?test=a' }))
        .then(() => {
          const actionTypes = store.getActions().map(action => action.type);
          expect(actionTypes).toHaveLength(5);
          expect(actionTypes.includes(TOGGLE_LOADING)).toBe(true);
          expect(actionTypes.includes(SET_CONTENTS)).toBe(true);
          expect(actionTypes.includes(SET_PAGE)).toBe(true);
          expect(actionTypes.includes(SELECT_ALL_ROWS)).toBe(true);
          done();
        })
        .catch(done.fail);
    });
    it('when fetching contents paged all the necessary actions are triggered', (done) => {
      store = mockStore({
        contents: {
          contents: [],
          currentAuthorShow: 'me',
          currentStatusShow: 'draft',
          currentQuickFilter: {},
          sortingColumns: {
            attribute: 'created',
            direction: 'ASC',
          },
          tabSearchEnabled: true,
        },
        pagination: { global: { page: 1, pageSize: 10 } },
      });
      store
        .dispatch(fetchContentsPaged({ params: '?test=a' }))
        .then(() => {
          const actionTypes = store.getActions().map(action => action.type);
          expect(actionTypes).toHaveLength(5);
          expect(actionTypes.includes(TOGGLE_LOADING)).toBe(true);
          expect(actionTypes.includes(SET_CONTENTS)).toBe(true);
          expect(actionTypes.includes(SET_PAGE)).toBe(true);
          expect(actionTypes.includes(SELECT_ALL_ROWS)).toBe(true);
          done();
        })
        .catch(done.fail);
    });

    it('when fetching contents paged all the necessary actions are triggered', (done) => {
      store = mockStore({
        contents: {
          contents: [],
          currentAuthorShow: 'me',
          currentStatusShow: 'published',
          statusChecked: 'published',
          currentQuickFilter: {},
          sortingColumns: {
            attribute: 'created',
            direction: 'ASC',
          },
        },
        pagination: { global: { page: 1, pageSize: 10 } },
      });
      store
        .dispatch(fetchContentsPaged({ ownerGroup: 'administrators', joinGroups: ['a'] }))
        .then(() => {
          const actionTypes = store.getActions().map(action => action.type);
          expect(actionTypes).toHaveLength(5);
          expect(actionTypes.includes(TOGGLE_LOADING)).toBe(true);
          expect(actionTypes.includes(SET_CONTENTS)).toBe(true);
          expect(actionTypes.includes(SET_PAGE)).toBe(true);
          expect(actionTypes.includes(SELECT_ALL_ROWS)).toBe(true);
          done();
        })
        .catch(done.fail);
    });
    it('fetch contents with tab filter', (done) => {
      store = mockStore({
        contents: {
          contents: [],
          currentAuthorShow: 'me',
          currentStatusShow: 'published',
          statusChecked: 'published',
          currentQuickFilter: {},
          sortingColumns: {
            attribute: 'created',
            direction: 'ASC',
          },
        },
        pagination: { global: { page: 1, pageSize: 10 } },
      });
      store
        .dispatch(fetchContentsPaged({ tabSearch: true, ownerGroup: 'administrators', joinGroups: ['a'] }))
        .then(() => {
          const actionTypes = store.getActions().map(action => action.type);
          expect(actionTypes).toHaveLength(5);
          expect(actionTypes.includes(TOGGLE_LOADING)).toBe(true);
          expect(actionTypes.includes(SET_CONTENTS)).toBe(true);
          expect(actionTypes.includes(SET_PAGE)).toBe(true);
          expect(actionTypes.includes(SELECT_ALL_ROWS)).toBe(true);
          done();
        })
        .catch(done.fail);
    });
    it('fetch contents with tab filter but without group params', (done) => {
      store = mockStore({
        contents: {
          contents: [],
          currentAuthorShow: 'me',
          currentStatusShow: 'published',
          statusChecked: 'published',
          currentQuickFilter: {},
          sortingColumns: {
            attribute: 'created',
            direction: 'ASC',
          },
        },
        pagination: { global: { page: 1, pageSize: 10 } },
      });
      store
        .dispatch(fetchContentsPaged({ tabSearch: true }))
        .then(() => {
          const actionTypes = store.getActions().map(action => action.type);
          expect(actionTypes).toHaveLength(5);
          expect(actionTypes.includes(TOGGLE_LOADING)).toBe(true);
          expect(actionTypes.includes(SET_CONTENTS)).toBe(true);
          expect(actionTypes.includes(SET_PAGE)).toBe(true);
          expect(actionTypes.includes(SELECT_ALL_ROWS)).toBe(true);
          done();
        })
        .catch(done.fail);
    });
    it('fetch contents with tab filter but without group params', (done) => {
      store = mockStore({
        contents: {
          contents: [],
          currentAuthorShow: 'me',
          currentStatusShow: 'draft',
          statusChecked: 'draft',
          currentQuickFilter: {},
          sortingColumns: {
            attribute: 'created',
            direction: 'ASC',
          },
        },
        pagination: { global: { page: 1, pageSize: 10 } },
      });
      store
        .dispatch(fetchContentsPaged({ tabSearch: true }))
        .then(() => {
          const actionTypes = store.getActions().map(action => action.type);
          expect(actionTypes).toHaveLength(5);
          expect(actionTypes.includes(TOGGLE_LOADING)).toBe(true);
          expect(actionTypes.includes(SET_CONTENTS)).toBe(true);
          expect(actionTypes.includes(SET_PAGE)).toBe(true);
          expect(actionTypes.includes(SELECT_ALL_ROWS)).toBe(true);
          done();
        })
        .catch(done.fail);
    });
  });

  describe('fetchContentsStatus', () => {
    it('should call the correct actions on success', (done) => {
      getContentsStatus.mockImplementation(mockApi({ payload: MOCK_CONTENTS_STATUS }));
      store.dispatch(fetchContentsStatus()).then(() => {
        const actions = store.getActions();
        expect(actions).toEqual([{ type: SET_CONTENTS_STATUS, payload: MOCK_CONTENTS_STATUS }]);
        done();
      }).catch(done.fail);
    });
    it('should call the correction actions on error', (done) => {
      getContentsStatus.mockImplementation(mockApi({ errors: true }));
      store.dispatch(fetchContentsStatus()).then(() => {
        const actions = store.getActions();
        expect(actions).toHaveLength(2);
        expect(actions[0]).toHaveProperty('type', ADD_ERRORS);
        expect(actions[1]).toHaveProperty('type', ADD_TOAST);
        done();
      }).catch(done.fail);
    });
  });
});
