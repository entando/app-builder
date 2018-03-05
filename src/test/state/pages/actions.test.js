import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { gotoRoute } from 'frontend-common-components';
import { initialize } from 'redux-form';

import {
  addPages, setPageLoading, setPageLoaded, togglePageExpanded, movePageSync, setPageParentSync,
  handleExpandPage, setPageParent, movePageBelow, movePageAbove, sendPostPage, sendPutPage,
  fetchPageForm,
} from 'state/pages/actions';

import {
  ADD_PAGES, SET_PAGE_LOADING, SET_PAGE_LOADED, TOGGLE_PAGE_EXPANDED, MOVE_PAGE,
  SET_PAGE_PARENT,
} from 'state/pages/types';

import { ADD_ERRORS } from 'state/errors/types';

import {
  HOMEPAGE_PAYLOAD, DASHBOARD_PAYLOAD, SERVICE_PAYLOAD, CONTACTS_PAYLOAD, ERROR_PAYLOAD,
  LOGIN_PAYLOAD, NOTFOUND_PAYLOAD,
} from 'test/mocks/pages';

import { setPagePosition, postPage, putPage, fetchPage } from 'api/pages';
import rootReducer from 'state/rootReducer';
import { ROUTE_PAGE_TREE } from 'app-init/router';


jest.mock('api/pages', () => ({
  fetchPage: jest.fn().mockReturnValue(new Promise(resolve => resolve({}))),
  fetchPageChildren: () => new Promise(resolve => resolve([])),
  setPagePosition: jest.fn().mockReturnValue(new Promise(resolve => resolve())),
  postPage: jest.fn(),
  putPage: jest.fn(),
}));

const mockPostPageSuccess = page => new Promise(resolve => resolve({ payload: page }));
const mockPostPageFailure = () =>
  new Promise(resolve => resolve({ payload: {}, errors: [{ code: 1, message: 'Wrong!' }] }));

const mockStore = configureStore([thunk]);
const INITIAL_STATE = rootReducer();
const INITIALIZED_STATE = {
  pages: {
    map: {
      homepage: HOMEPAGE_PAYLOAD,
      dashboard: DASHBOARD_PAYLOAD,
      service: SERVICE_PAYLOAD,
      contacts: CONTACTS_PAYLOAD,
      error: ERROR_PAYLOAD,
      login: LOGIN_PAYLOAD,
      notfound: NOTFOUND_PAYLOAD,
    },
    childrenMap: {
      homepage: HOMEPAGE_PAYLOAD.children,
      dashboard: DASHBOARD_PAYLOAD.children,
      service: SERVICE_PAYLOAD.children,
      contacts: CONTACTS_PAYLOAD.children,
      error: ERROR_PAYLOAD.children,
      login: LOGIN_PAYLOAD.children,
      notfound: NOTFOUND_PAYLOAD.children,
    },
    titlesMap: {
      homepage: HOMEPAGE_PAYLOAD.titles,
      dashboard: DASHBOARD_PAYLOAD.titles,
      service: SERVICE_PAYLOAD.titles,
      contacts: CONTACTS_PAYLOAD.titles,
      error: ERROR_PAYLOAD.titles,
      login: LOGIN_PAYLOAD.titles,
      notfound: NOTFOUND_PAYLOAD.titles,
    },
    statusMap: {
      homepage: { expanded: true, loading: false, loaded: true },
      dashboard: {},
      service: {},
      contacts: {},
      error: {},
      login: {},
      notfound: {},
    },
  },
};

const PAGE_CODE = 'pagecode';
const OLD_PARENT_CODE = 'oldParent';
const NEW_PARENT_CODE = 'newParent';
const NEW_POSITION = 2;


describe('state/pages/actions', () => {
  beforeEach(jest.clearAllMocks);

  it('addPages() should return a well formed action', () => {
    const PAGES = [];
    const action = addPages(PAGES);
    expect(action.type).toBe(ADD_PAGES);
    expect(action.payload).toEqual({ pages: PAGES });
  });

  it('setPageLoading() should return a well formed action', () => {
    const action = setPageLoading(PAGE_CODE);
    expect(action.type).toBe(SET_PAGE_LOADING);
    expect(action.payload).toEqual({ pageCode: PAGE_CODE });
  });

  it('setPageLoaded() should return a well formed action', () => {
    const action = setPageLoaded(PAGE_CODE);
    expect(action.type).toBe(SET_PAGE_LOADED);
    expect(action.payload).toEqual({ pageCode: PAGE_CODE });
  });

  it('togglePageExpanded() should return a well formed action', () => {
    const action = togglePageExpanded(PAGE_CODE, true);
    expect(action.type).toBe(TOGGLE_PAGE_EXPANDED);
    expect(action.payload).toEqual({ pageCode: PAGE_CODE, expanded: true });
  });

  it('movePageSync() should return a well formed action', () => {
    const action = movePageSync(PAGE_CODE, OLD_PARENT_CODE, NEW_PARENT_CODE, NEW_POSITION);
    expect(action.type).toBe(MOVE_PAGE);
    expect(action.payload).toEqual({
      pageCode: PAGE_CODE,
      oldParentCode: OLD_PARENT_CODE,
      newParentCode: NEW_PARENT_CODE,
      newPosition: NEW_POSITION,
    });
  });

  it('setPageParentSync() should return a well formed action', () => {
    const action = setPageParentSync(PAGE_CODE, OLD_PARENT_CODE, NEW_PARENT_CODE);
    expect(action.type).toBe(SET_PAGE_PARENT);
    expect(action.payload).toEqual({
      pageCode: PAGE_CODE,
      oldParentCode: OLD_PARENT_CODE,
      newParentCode: NEW_PARENT_CODE,
    });
  });

  describe('handleExpandPage()', () => {
    it('when loading an already expanded page (homepage) set page expanded to false', () => {
      const store = mockStore(INITIALIZED_STATE);
      store.dispatch(handleExpandPage()).then(() => {
        const actionTypes = store.getActions().map(action => action.type);
        expect(actionTypes.includes(SET_PAGE_LOADING)).toBe(false);
        expect(actionTypes.includes(SET_PAGE_LOADED)).toBe(false);
        expect(actionTypes.includes(TOGGLE_PAGE_EXPANDED)).toBe(true);
        expect(actionTypes.includes(ADD_PAGES)).toBe(false);
      });
    });
    it('when loading homepage, should download homepage and its children', () => {
      const store = mockStore(INITIAL_STATE);
      store.dispatch(handleExpandPage()).then(() => {
        const actionTypes = store.getActions().map(action => action.type);
        expect(actionTypes.includes(SET_PAGE_LOADING)).toBe(true);
        expect(actionTypes.includes(SET_PAGE_LOADED)).toBe(true);
        expect(actionTypes.includes(TOGGLE_PAGE_EXPANDED)).toBe(true);
        expect(actionTypes.includes(ADD_PAGES)).toBe(true);
      });
    });

    it('when loading an not expanded page (contacts) set page expanded to true', () => {
      const store = mockStore(INITIALIZED_STATE);
      store.dispatch(handleExpandPage('contacts')).then(() => {
        const actionTypes = store.getActions().map(action => action.type);
        expect(actionTypes.includes(SET_PAGE_LOADING)).toBe(true);
        expect(actionTypes.includes(SET_PAGE_LOADED)).toBe(true);
        expect(actionTypes.includes(TOGGLE_PAGE_EXPANDED)).toBe(true);
        expect(actionTypes.includes(ADD_PAGES)).toBe(true);
      });
    });
  });

  describe('setPageParent()', () => {
    it('when setting a new parent name, should call API and then dispatch action', () => {
      const store = mockStore(INITIALIZED_STATE);
      store.dispatch(setPageParent('contacts', 'service')).then(() => {
        const actionTypes = store.getActions().map(action => action.type);
        expect(actionTypes).toEqual([SET_PAGE_PARENT]);
        expect(setPagePosition).toHaveBeenCalled();
      });
    });

    it('when setting the same parent name, should not call API nor dispatch action', () => {
      const store = mockStore(INITIALIZED_STATE);
      store.dispatch(setPageParent('dashboard', 'homepage')).then(() => {
        const actionTypes = store.getActions().map(action => action.type);
        expect(actionTypes.length).toBe(0);
        expect(setPagePosition).not.toHaveBeenCalled();
      });
    });
  });

  describe('movePageBelow()', () => {
    it('moving a page below another, under the same parent', () => {
      const store = mockStore(INITIALIZED_STATE);
      store.dispatch(movePageBelow('dashboard', 'contacts')).then(() => {
        const actions = store.getActions();
        expect(setPagePosition).toHaveBeenCalledWith('dashboard', 3, 'homepage');
        expect(actions[0]).toEqual(movePageSync('dashboard', 'homepage', 'homepage', 3));
      });
    });

    it('moving a page below another, under the same parent', () => {
      const store = mockStore(INITIALIZED_STATE);
      store.dispatch(movePageBelow('contacts', 'dashboard')).then(() => {
        const actions = store.getActions();
        expect(setPagePosition).toHaveBeenCalledWith('contacts', 2, 'homepage');
        expect(actions[0]).toEqual(movePageSync('contacts', 'homepage', 'homepage', 2));
      });
    });

    it('moving a page below another, under a different parent', () => {
      const store = mockStore(INITIALIZED_STATE);
      store.dispatch(movePageBelow('dashboard', 'notfound')).then(() => {
        const actions = store.getActions();
        expect(setPagePosition).toHaveBeenCalledWith('dashboard', 2, 'service');
        expect(actions[0]).toEqual(movePageSync('dashboard', 'homepage', 'service', 2));
      });
    });

    it('moving a page below itself should do nothing', () => {
      const store = mockStore(INITIALIZED_STATE);
      store.dispatch(movePageBelow('dashboard', 'dashboard')).then(() => {
        const actions = store.getActions();
        expect(setPagePosition).not.toHaveBeenCalled();
        expect(actions.length).toBe(0);
      });
    });
  });

  describe('movePageAbove()', () => {
    it('moving a page above another, under the same parent', () => {
      const store = mockStore(INITIALIZED_STATE);
      store.dispatch(movePageAbove('dashboard', 'contacts')).then(() => {
        const actions = store.getActions();
        expect(setPagePosition).toHaveBeenCalledWith('dashboard', 2, 'homepage');
        expect(actions[0]).toEqual(movePageSync('dashboard', 'homepage', 'homepage', 2));
      });
    });

    it('moving a page above another, under the same parent', () => {
      const store = mockStore(INITIALIZED_STATE);
      store.dispatch(movePageAbove('contacts', 'dashboard')).then(() => {
        const actions = store.getActions();
        expect(setPagePosition).toHaveBeenCalledWith('contacts', 1, 'homepage');
        expect(actions[0]).toEqual(movePageSync('contacts', 'homepage', 'homepage', 1));
      });
    });

    it('moving a page above another, under a different parent', () => {
      const store = mockStore(INITIALIZED_STATE);
      store.dispatch(movePageAbove('dashboard', 'notfound')).then(() => {
        const actions = store.getActions();
        expect(setPagePosition).toHaveBeenCalledWith('dashboard', 1, 'service');
        expect(actions[0]).toEqual(movePageSync('dashboard', 'homepage', 'service', 1));
      });
    });

    it('moving a page above itself should do nothing', () => {
      const store = mockStore(INITIALIZED_STATE);
      store.dispatch(movePageAbove('dashboard', 'dashboard')).then(() => {
        const actions = store.getActions();
        expect(setPagePosition).not.toHaveBeenCalled();
        expect(actions.length).toBe(0);
      });
    });
  });

  describe('sendPostPage()', () => {
    let store;
    beforeEach(() => {
      jest.resetModules();
      store = mockStore(INITIALIZED_STATE);
    });
    it('when postPage succeeds, should dispatch ADD_PAGES', () => {
      postPage.mockImplementation(mockPostPageSuccess);
      store.dispatch(sendPostPage(CONTACTS_PAYLOAD)).then(() => {
        const addPagesAction = store.getActions().find(action => action.type === ADD_PAGES);
        expect(postPage).toHaveBeenCalledWith(CONTACTS_PAYLOAD);
        expect(addPagesAction).toBeDefined();
      });
    });
    it('when postPage fails, should dispatch ADD_ERRORS', () => {
      postPage.mockImplementation(mockPostPageFailure);
      store.dispatch(sendPostPage(CONTACTS_PAYLOAD)).then(() => {
        const addErrorsAction = store.getActions().find(action => action.type === ADD_ERRORS);
        expect(postPage).toHaveBeenCalledWith(CONTACTS_PAYLOAD);
        expect(addErrorsAction).toBeDefined();
      });
    });
  });

  describe('sendPutPage()', () => {
    let store;
    beforeEach(() => {
      jest.resetModules();
      store = mockStore(INITIALIZED_STATE);
    });
    it('when putPage succeeds, should dispatch ADD_PAGES', () => {
      putPage.mockImplementation(mockPostPageSuccess);
      store.dispatch(sendPutPage(CONTACTS_PAYLOAD)).then(() => {
        expect(putPage).toHaveBeenCalledWith(CONTACTS_PAYLOAD);
        expect(gotoRoute).toHaveBeenCalledWith(ROUTE_PAGE_TREE);
      });
    });
    it('when putPage fails, should dispatch ADD_ERRORS', () => {
      putPage.mockImplementation(mockPostPageFailure);
      store.dispatch(sendPutPage(CONTACTS_PAYLOAD)).then(() => {
        const addErrorsAction = store.getActions().find(action => action.type === ADD_ERRORS);
        expect(putPage).toHaveBeenCalledWith(CONTACTS_PAYLOAD);
        expect(addErrorsAction).toBeDefined();
      });
    });
  });

  describe('fetchPageForm()', () => {
    let store;
    beforeEach(() => {
      jest.resetModules();
      store = mockStore(INITIALIZED_STATE);
    });
    it('when fetchPage succeeds, should dispatch redux-form initialize', () => {
      fetchPage.mockImplementation(mockPostPageSuccess);
      store.dispatch(fetchPageForm(CONTACTS_PAYLOAD.code)).then(() => {
        expect(fetchPage).toHaveBeenCalledWith(CONTACTS_PAYLOAD.code);
        expect(initialize).toHaveBeenCalledWith('page', 'contacts');
      });
    });
    it('when putPage fails, should dispatch ADD_ERRORS', () => {
      fetchPage.mockImplementation(mockPostPageFailure);
      store.dispatch(fetchPageForm(CONTACTS_PAYLOAD.code)).then(() => {
        const addErrorsAction = store.getActions().find(action => action.type === ADD_ERRORS);
        expect(fetchPage).toHaveBeenCalledWith(CONTACTS_PAYLOAD.code);
        expect(addErrorsAction).toBeDefined();
      });
    });
  });
});
