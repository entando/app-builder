import { mockApi } from 'test/testUtils';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { TOGGLE_LOADING } from 'state/loading/types';
import { SET_PAGE } from 'state/pagination/types';
import { getContents, getContentsStatus } from 'api/contents';
import {
  setQuickFilter, setContentType, setGroup, setSort,
  setContentCategoryFilter, checkStatus, checkAccess,
  checkAuthor, setCurrentAuthorShow, setCurrentStatusShow,
  selectAllRows, fetchContents,
  setJoinContentCategory,
  setTabSearch,
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
  SELECT_ALL_ROWS, SET_CONTENTS,
  SET_JOIN_CONTENT_CATEGORY, SET_TAB_SEARCH, RESET_AUTHOR_STATUS,
  CLEAR_CONTENTS_STATE, SELECT_SINGLE_ROW, SET_CONTENTS_STATUS,
} from 'state/contents/types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const ADD_ERRORS = 'errors/add-errors';
const CLEAR_ERRORS = 'errors/clear-errors';
const ADD_TOAST = 'toasts/add-toast';

jest.mock('api/contents', () => ({
  getContents: jest.fn(mockApi({ payload: ['a', 'b'], ok: true })),
  getContentsStatus: jest.fn(mockApi({ payload: {} })),
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
