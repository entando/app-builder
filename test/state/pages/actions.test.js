import { isFSA } from 'flux-standard-action';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { gotoRoute } from '@entando/router';
import { initialize } from 'redux-form';

import { mockApi } from 'test/testUtils';

import { SET_PAGE } from 'state/pagination/types';

import {
  addPages, setPageLoading, setPageLoaded, togglePageExpanded, movePageSync, setPageParentSync,
  handleExpandPage, setPageParent, movePageBelow, movePageAbove, sendPostPage, fetchSearchPages,
  fetchPageForm, sendPutPage, setFreePages, fetchFreePages, fetchPageSettings, publishSelectedPage,
  unpublishSelectedPage, loadSelectedPage, removePage, sendDeletePage, clearSearchPage, clearSearch,
  fetchReferencesPage, setReferenceSelectedPage, clonePage,
} from 'state/pages/actions';

import {
  ADD_PAGES, SET_PAGE_LOADING, SET_PAGE_LOADED, TOGGLE_PAGE_EXPANDED, MOVE_PAGE, SET_PAGE_PARENT,
  SET_FREE_PAGES, SET_SELECTED_PAGE, REMOVE_PAGE, UPDATE_PAGE, CLEAR_SEARCH, SEARCH_PAGES,
  SET_REFERENCES_SELECTED_PAGE,
} from 'state/pages/types';

import { SET_PUBLISHED_PAGE_CONFIG } from 'state/page-config/types';

import { ADD_ERRORS } from 'state/errors/types';

import {
  HOMEPAGE_PAYLOAD, DASHBOARD_PAYLOAD, SERVICE_PAYLOAD, CONTACTS_PAYLOAD, ERROR_PAYLOAD,
  LOGIN_PAYLOAD, NOTFOUND_PAYLOAD, FREE_PAGES_PAYLOAD,
} from 'test/mocks/pages';

import {
  setPagePosition, postPage, putPage, getPage, getPageChildren, getPageSettingsList,
  putPageStatus, deletePage, getFreePages, getSearchPages, getReferencesPage,
} from 'api/pages';
import { ROUTE_PAGE_TREE, ROUTE_PAGE_CLONE } from 'app-init/router';
import { getSelectedPageConfig } from 'state/page-config/selectors';
import { getSelectedPage, getPagesMap, getChildrenMap, getStatusMap, getReferencesFromSelectedPage } from 'state/pages/selectors';

jest.mock('state/page-config/selectors', () => ({
  getSelectedPageConfig: jest.fn(),
}));

jest.mock('state/pages/selectors', () => ({
  getStatusMap: jest.fn(),
  getPagesMap: jest.fn(),
  getChildrenMap: jest.fn(),
  getSelectedPage: jest.fn(),
  getReferencesFromSelectedPage: jest.fn(() => []),
}));

const mockStore = configureStore([thunk]);

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
    freePages: FREE_PAGES_PAYLOAD,
    search: [],
  },
};

const PAGE_CODE = 'pagecode';
const OLD_PARENT_CODE = 'oldParent';
const NEW_PARENT_CODE = 'newParent';
const NEW_POSITION = 2;


beforeEach(jest.clearAllMocks);

describe('state/pages/actions', () => {
  it('addPages() should return a well formed action', () => {
    const PAGES = [];
    const action = addPages(PAGES);
    expect(action.type).toBe(ADD_PAGES);
    expect(action.payload).toEqual({ pages: PAGES });
  });

  describe('clearSearch', () => {
    let action;
    beforeEach(() => {
      action = clearSearch();
    });

    it('is FSA compliant', () => {
      expect(isFSA(action)).toBe(true);
    });

    it('actions is correct setup ', () => {
      expect(action).toHaveProperty('type', CLEAR_SEARCH);
    });
  });

  describe('setReferenceSelectedPage', () => {
    let action;
    beforeEach(() => {
      action = setReferenceSelectedPage(['references']);
    });

    it('is FSA compliant', () => {
      expect(isFSA(action)).toBe(true);
    });

    it('actions is correct setup ', () => {
      expect(action).toHaveProperty('type', SET_REFERENCES_SELECTED_PAGE);
      expect(action).toHaveProperty('payload', { references: ['references'] });
    });
  });

  describe('removePage', () => {
    let action;
    beforeEach(() => {
      action = removePage({ code: PAGE_CODE });
    });

    it('is FSA compliant', () => {
      expect(isFSA(action)).toBe(true);
    });

    it('actions is correct setup ', () => {
      expect(action).toHaveProperty('type', REMOVE_PAGE);
      expect(action).toHaveProperty('payload.page', { code: PAGE_CODE });
    });
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
    beforeEach(() => {
      getStatusMap.mockReturnValue(INITIALIZED_STATE.pages.statusMap);
      getPage.mockImplementation(mockApi({ payload: HOMEPAGE_PAYLOAD }));
      getPageChildren.mockImplementation(mockApi({ payload: [CONTACTS_PAYLOAD] }));
    });

    it('when loading an already expanded page (homepage) set page expanded to false', (done) => {
      const store = mockStore();
      store.dispatch(handleExpandPage()).then(() => {
        const actionTypes = store.getActions().map(action => action.type);
        expect(actionTypes.includes(SET_PAGE_LOADING)).toBe(false);
        expect(actionTypes.includes(SET_PAGE_LOADED)).toBe(false);
        expect(actionTypes.includes(TOGGLE_PAGE_EXPANDED)).toBe(true);
        expect(actionTypes.includes(ADD_PAGES)).toBe(false);
        done();
      }).catch(done.fail);
    });

    it('when loading homepage, should download homepage and its children', (done) => {
      const store = mockStore();
      getStatusMap.mockReturnValue({});
      store.dispatch(handleExpandPage('homepage')).then(() => {
        const actionTypes = store.getActions().map(action => action.type);
        expect(actionTypes.includes(SET_PAGE_LOADING)).toBe(true);
        expect(actionTypes.includes(SET_PAGE_LOADED)).toBe(true);
        expect(actionTypes.includes(TOGGLE_PAGE_EXPANDED)).toBe(true);
        expect(actionTypes.includes(ADD_PAGES)).toBe(true);
        done();
      }).catch(done.fail);
    });

    it('when loading an not expanded page (contacts) set page expanded to true', (done) => {
      const store = mockStore();
      store.dispatch(handleExpandPage('contacts')).then(() => {
        const actionTypes = store.getActions().map(action => action.type);
        expect(actionTypes.includes(SET_PAGE_LOADING)).toBe(true);
        expect(actionTypes.includes(SET_PAGE_LOADED)).toBe(true);
        expect(actionTypes.includes(TOGGLE_PAGE_EXPANDED)).toBe(true);
        expect(actionTypes.includes(ADD_PAGES)).toBe(true);
        done();
      }).catch(done.fail);
    });
  });

  describe('setPageParent()', () => {
    beforeEach(() => {
      getPagesMap.mockReturnValue(INITIALIZED_STATE.pages.map);
      getChildrenMap.mockReturnValue(INITIALIZED_STATE.pages.childrenMap);
    });

    it('when setting a new parent name, should call API and then dispatch action', (done) => {
      const store = mockStore(INITIALIZED_STATE);
      store.dispatch(setPageParent('contacts', 'service')).then(() => {
        const actionTypes = store.getActions().map(action => action.type);
        expect(actionTypes).toEqual([SET_PAGE_PARENT]);
        expect(setPagePosition).toHaveBeenCalled();
        done();
      }).catch(done.fail);
    });

    it('when setting the same parent name, should not call API nor dispatch action', (done) => {
      const store = mockStore(INITIALIZED_STATE);
      store.dispatch(setPageParent('dashboard', 'homepage')).then(() => {
        const actionTypes = store.getActions().map(action => action.type);
        expect(actionTypes.length).toBe(0);
        expect(setPagePosition).not.toHaveBeenCalled();
        done();
      }).catch(done.fail);
    });
  });

  describe('movePageBelow()', () => {
    beforeEach(() => {
      getPagesMap.mockReturnValue(INITIALIZED_STATE.pages.map);
      getChildrenMap.mockReturnValue(INITIALIZED_STATE.pages.childrenMap);
    });

    it('moving a page below another, under the same parent', (done) => {
      const store = mockStore(INITIALIZED_STATE);
      store.dispatch(movePageBelow('dashboard', 'contacts')).then(() => {
        const actions = store.getActions();
        expect(setPagePosition).toHaveBeenCalledWith('dashboard', 3, 'homepage');
        expect(actions[0]).toEqual(movePageSync('dashboard', 'homepage', 'homepage', 3));
        done();
      }).catch(done.fail);
    });

    it('moving a page below another, under the same parent', (done) => {
      const store = mockStore(INITIALIZED_STATE);
      store.dispatch(movePageBelow('contacts', 'dashboard')).then(() => {
        const actions = store.getActions();
        expect(setPagePosition).toHaveBeenCalledWith('contacts', 2, 'homepage');
        expect(actions[0]).toEqual(movePageSync('contacts', 'homepage', 'homepage', 2));
        done();
      }).catch(done.fail);
    });

    it('moving a page below another, under a different parent', (done) => {
      const store = mockStore(INITIALIZED_STATE);
      store.dispatch(movePageBelow('dashboard', 'notfound')).then(() => {
        const actions = store.getActions();
        expect(setPagePosition).toHaveBeenCalledWith('dashboard', 2, 'service');
        expect(actions[0]).toEqual(movePageSync('dashboard', 'homepage', 'service', 2));
        done();
      }).catch(done.fail);
    });

    it('moving a page below itself should do nothing', (done) => {
      const store = mockStore(INITIALIZED_STATE);
      store.dispatch(movePageBelow('dashboard', 'dashboard')).then(() => {
        const actions = store.getActions();
        expect(setPagePosition).not.toHaveBeenCalled();
        expect(actions.length).toBe(0);
        done();
      }).catch(done.fail);
    });
  });

  describe('movePageAbove()', () => {
    beforeEach(() => {
      getPagesMap.mockReturnValue(INITIALIZED_STATE.pages.map);
      getChildrenMap.mockReturnValue(INITIALIZED_STATE.pages.childrenMap);
    });

    it('moving a page above another, under the same parent', (done) => {
      const store = mockStore(INITIALIZED_STATE);
      store.dispatch(movePageAbove('dashboard', 'contacts')).then(() => {
        const actions = store.getActions();
        expect(setPagePosition).toHaveBeenCalledWith('dashboard', 2, 'homepage');
        expect(actions[0]).toEqual(movePageSync('dashboard', 'homepage', 'homepage', 2));
        done();
      }).catch(done.fail);
    });

    it('moving a page above another, under the same parent', (done) => {
      const store = mockStore(INITIALIZED_STATE);
      store.dispatch(movePageAbove('contacts', 'dashboard')).then(() => {
        const actions = store.getActions();
        expect(setPagePosition).toHaveBeenCalledWith('contacts', 1, 'homepage');
        expect(actions[0]).toEqual(movePageSync('contacts', 'homepage', 'homepage', 1));
        done();
      }).catch(done.fail);
    });

    it('moving a page above another, under a different parent', (done) => {
      const store = mockStore(INITIALIZED_STATE);
      store.dispatch(movePageAbove('dashboard', 'notfound')).then(() => {
        const actions = store.getActions();
        expect(setPagePosition).toHaveBeenCalledWith('dashboard', 1, 'service');
        expect(actions[0]).toEqual(movePageSync('dashboard', 'homepage', 'service', 1));
        done();
      }).catch(done.fail);
    });

    it('moving a page above itself should do nothing', (done) => {
      const store = mockStore(INITIALIZED_STATE);
      store.dispatch(movePageAbove('dashboard', 'dashboard')).then(() => {
        const actions = store.getActions();
        expect(setPagePosition).not.toHaveBeenCalled();
        expect(actions.length).toBe(0);
        done();
      }).catch(done.fail);
    });
  });

  describe('sendPostPage()', () => {
    let store;
    beforeEach(() => {
      store = mockStore(INITIALIZED_STATE);
    });

    it('when postPage succeeds, should dispatch ADD_PAGES', (done) => {
      postPage.mockImplementation(mockApi({ payload: CONTACTS_PAYLOAD }));
      store.dispatch(sendPostPage(CONTACTS_PAYLOAD)).then(() => {
        const addPagesAction = store.getActions().find(action => action.type === ADD_PAGES);
        expect(postPage).toHaveBeenCalledWith(CONTACTS_PAYLOAD);
        expect(addPagesAction).toBeDefined();
        done();
      }).catch(done.fail);
    });

    it('when postPage fails, should dispatch ADD_ERRORS', (done) => {
      postPage.mockImplementation(mockApi({ errors: true }));
      store.dispatch(sendPostPage(CONTACTS_PAYLOAD)).then(() => {
        const addErrorsAction = store.getActions().find(action => action.type === ADD_ERRORS);
        expect(postPage).toHaveBeenCalledWith(CONTACTS_PAYLOAD);
        expect(addErrorsAction).toBeDefined();
        done();
      }).catch(done.fail);
    });
  });

  describe('sendPutPage()', () => {
    let store;
    beforeEach(() => {
      store = mockStore(INITIALIZED_STATE);
    });

    it('when putPage succeeds, should dispatch ADD_PAGES', (done) => {
      store.dispatch(sendPutPage(CONTACTS_PAYLOAD)).then(() => {
        const actions = store.getActions();
        expect(actions).toHaveLength(1);
        expect(actions[0]).toHaveProperty('type', UPDATE_PAGE);
        expect(putPage).toHaveBeenCalledWith(CONTACTS_PAYLOAD);
        done();
      }).catch(done.fail);
    });

    it('if the response is not ok, dispatch add errors', async () => {
      putPage.mockImplementation(mockApi({ errors: true }));
      return store.dispatch(sendPutPage(CONTACTS_PAYLOAD)).catch((e) => {
        expect(putPage).toHaveBeenCalled();
        const actions = store.getActions();
        expect(actions).toHaveLength(1);
        expect(actions[0]).toHaveProperty('type', ADD_ERRORS);
        expect(e).toHaveProperty('errors');
        e.errors.forEach((error, index) => {
          expect(error.message).toEqual(actions[0].payload.errors[index]);
        });
      });
    });
  });

  describe('sendDeletePage', () => {
    let store;
    beforeEach(() => {
      store = mockStore(INITIALIZED_STATE);
    });

    it('calls removePage and gotoRoute', (done) => {
      store.dispatch(sendDeletePage(DASHBOARD_PAYLOAD)).then(() => {
        expect(deletePage).toHaveBeenCalled();
        const actions = store.getActions();
        expect(actions).toHaveLength(1);
        expect(actions[0]).toHaveProperty('type', REMOVE_PAGE);
        expect(gotoRoute).toHaveBeenCalledWith(ROUTE_PAGE_TREE);
        done();
      }).catch(done.fail);
    });

    it('if the response is not ok, dispatch add errors', async () => {
      deletePage.mockImplementation(mockApi({ errors: true }));
      return store.dispatch(sendDeletePage(DASHBOARD_PAYLOAD)).catch((e) => {
        expect(deletePage).toHaveBeenCalled();
        const actions = store.getActions();
        expect(actions).toHaveLength(1);
        expect(actions[0]).toHaveProperty('type', ADD_ERRORS);
        expect(e).toHaveProperty('errors');
        e.errors.forEach((error, index) => {
          expect(error.message).toEqual(actions[0].payload.errors[index]);
        });
      });
    });
  });

  describe('fetchPageForm()', () => {
    let store;
    beforeEach(() => {
      store = mockStore(INITIALIZED_STATE);
    });

    it('when getPage succeeds, should dispatch redux-form initialize', (done) => {
      getPage.mockImplementation(mockApi({ payload: CONTACTS_PAYLOAD }));
      store.dispatch(fetchPageForm(CONTACTS_PAYLOAD.code)).then(() => {
        expect(getPage).toHaveBeenCalledWith(CONTACTS_PAYLOAD.code);
        expect(initialize).toHaveBeenCalledWith('page', CONTACTS_PAYLOAD);
        done();
      }).catch(done.fail);
    });

    it('when putPage fails, should dispatch ADD_ERRORS', (done) => {
      getPage.mockImplementation(mockApi({ errors: true }));
      store.dispatch(fetchPageForm(CONTACTS_PAYLOAD.code)).then(() => {
        const addErrorsAction = store.getActions().find(action => action.type === ADD_ERRORS);
        expect(getPage).toHaveBeenCalledWith(CONTACTS_PAYLOAD.code);
        expect(addErrorsAction).toBeDefined();
        done();
      }).catch(done.fail);
    });
  });

  describe('fetchPageSettings()', () => {
    let store;
    beforeEach(() => {
      store = mockStore(INITIALIZED_STATE);
    });

    it('when getPageSettingsList succeeds, should dispatch redux-form initialize', (done) => {
      getPageSettingsList.mockImplementation(mockApi({ payload: { param: [{ name: 'a', value: 'b' }] } }));
      store.dispatch(fetchPageSettings()).then(() => {
        expect(getPageSettingsList).toHaveBeenCalled();
        expect(initialize).toHaveBeenCalledWith('settings', { a: 'b' });
        done();
      }).catch(done.fail);
    });

    it('if the response is not ok, dispatch add errors', async () => {
      getPageSettingsList.mockImplementation(mockApi({ errors: true }));
      return store.dispatch(fetchPageSettings()).catch((e) => {
        expect(getPageSettingsList).toHaveBeenCalled();
        const actions = store.getActions();
        expect(actions).toHaveLength(1);
        expect(actions[0]).toHaveProperty('type', ADD_ERRORS);
        expect(e).toHaveProperty('errors');
        e.errors.forEach((error, index) => {
          expect(error.message).toEqual(actions[0].payload.errors[index]);
        });
      });
    });
  });

  describe('setFreePages()', () => {
    const FREE_PAGES_MOCKED = {
      type: SET_FREE_PAGES,
      payload: {
        freePages: [],
      },
    };
    it('test FREE_PAGES_MOCKED for empty object on initial state', () => {
      expect(setFreePages([])).toEqual(FREE_PAGES_MOCKED);
    });

    it('checks action type', () => {
      const action = setFreePages();
      expect(action.type).toBe(SET_FREE_PAGES);
    });

    describe('fetchFreePages', () => {
      let store;
      beforeEach(() => {
        store = mockStore(INITIALIZED_STATE);
      });

      it('when getPageSettingsList succeeds, should dispatch redux-form initialize', (done) => {
        store.dispatch(fetchFreePages()).then(() => {
          expect(getFreePages).toHaveBeenCalled();
          const actions = store.getActions();
          expect(actions[0].type).toEqual(SET_FREE_PAGES);
          done();
        }).catch(done.fail);
      });

      it('if the response is not ok, dispatch add errors', async () => {
        getFreePages.mockImplementation(mockApi({ errors: true }));
        return store.dispatch(fetchFreePages()).catch((e) => {
          expect(getFreePages).toHaveBeenCalled();
          const actions = store.getActions();
          expect(actions).toHaveLength(1);
          expect(actions[0]).toHaveProperty('type', ADD_ERRORS);
          expect(e).toHaveProperty('errors');
          e.errors.forEach((error, index) => {
            expect(error.message).toEqual(actions[0].payload.errors[index]);
          });
        });
      });
    });
  });
});

describe('publish/unpublish', () => {
  let store;
  beforeEach(() => {
    getSelectedPage.mockReturnValue(HOMEPAGE_PAYLOAD);
    getSelectedPageConfig.mockReturnValue([null, null]);
    putPageStatus.mockImplementation(mockApi({ payload: HOMEPAGE_PAYLOAD }));
    store = mockStore();
  });

  describe('publishSelectedPage()', () => {
    it('when putPageStatus succeeds, should dispatch setSelectedPage', (done) => {
      store.dispatch(publishSelectedPage()).then(() => {
        expect(putPageStatus).toHaveBeenCalled();
        const actions = store.getActions();
        expect(actions).toHaveLength(3);
        expect(actions[0]).toHaveProperty('type', SET_SELECTED_PAGE);
        expect(actions[1]).toHaveProperty('type', UPDATE_PAGE);
        expect(actions[2]).toHaveProperty('type', SET_PUBLISHED_PAGE_CONFIG);
        done();
      }).catch(done.fail);
    });

    it('when putPageStatus fails, should not dispatch anything', (done) => {
      putPageStatus.mockImplementation(mockApi({ errors: true }));
      store.dispatch(publishSelectedPage()).then(() => {
        expect(putPageStatus).toHaveBeenCalled();
        const actionsTypes = store.getActions().map(action => action.type);
        expect(actionsTypes).toEqual([]);
        done();
      }).catch(done.fail);
    });

    it('when there is no selected page, should not dispatch anything', (done) => {
      getSelectedPage.mockReturnValue(null);
      store.dispatch(publishSelectedPage()).then(() => {
        expect(putPageStatus).not.toHaveBeenCalled();
        const actionsTypes = store.getActions().map(action => action.type);
        expect(actionsTypes).toEqual([]);
        done();
      }).catch(done.fail);
    });
  });

  describe('unpublishSelectedPage()', () => {
    it('when putPageStatus succeeds, should dispatch setSelectedPage', (done) => {
      store.dispatch(unpublishSelectedPage()).then(() => {
        expect(putPageStatus).toHaveBeenCalled();
        const actions = store.getActions();
        expect(actions).toHaveLength(3);
        expect(actions[0]).toHaveProperty('type', SET_SELECTED_PAGE);
        expect(actions[1]).toHaveProperty('type', UPDATE_PAGE);
        expect(actions[2]).toHaveProperty('type', SET_PUBLISHED_PAGE_CONFIG);
        done();
      }).catch(done.fail);
    });

    it('when putPageStatus fails, should not dispatch anything', (done) => {
      putPageStatus.mockImplementation(mockApi({ errors: true }));
      store.dispatch(unpublishSelectedPage()).then(() => {
        expect(putPageStatus).toHaveBeenCalled();
        const actionsTypes = store.getActions().map(action => action.type);
        expect(actionsTypes).toEqual([]);
        done();
      }).catch(done.fail);
    });

    it('when there is no selected page, should not dispatch anything', (done) => {
      getSelectedPage.mockReturnValue(null);
      store.dispatch(unpublishSelectedPage()).then(() => {
        expect(putPageStatus).not.toHaveBeenCalled();
        const actionsTypes = store.getActions().map(action => action.type);
        expect(actionsTypes).toEqual([]);
        done();
      }).catch(done.fail);
    });
  });
});

describe('loadSelectedPage', () => {
  let store;
  beforeEach(() => {
    store = mockStore();
  });

  it('if there is no selected page, load the page (error)', (done) => {
    getSelectedPage.mockReturnValue(null);
    getPage.mockImplementation(mockApi({ errors: true }));

    store.dispatch(loadSelectedPage(PAGE_CODE)).then(() => {
      expect(getPage).toHaveBeenCalled();
      const actionsTypes = store.getActions().map(action => action.type);
      expect(actionsTypes).toEqual([ADD_ERRORS]);
      done();
    }).catch(done.fail);
  });

  it('if there is no selected page, load the page (ok)', (done) => {
    getSelectedPage.mockReturnValue(null);
    getPage.mockImplementation(mockApi({ payload: HOMEPAGE_PAYLOAD }));

    store.dispatch(loadSelectedPage(PAGE_CODE)).then(() => {
      expect(getPage).toHaveBeenCalled();
      const actionsTypes = store.getActions().map(action => action.type);
      expect(actionsTypes).toEqual([SET_SELECTED_PAGE]);
      done();
    }).catch(done.fail);
  });
});

describe('clearSearchPage', () => {
  let store;
  beforeEach(() => {
    jest.clearAllMocks();
    store = mockStore({});
  });

  it('calls action clearSearch and initialize form search ', () => {
    store.dispatch(clearSearchPage());
    const actions = store.getActions();
    expect(actions).toHaveLength(2);
    expect(actions[0]).toHaveProperty('type', CLEAR_SEARCH);
    expect(initialize).toHaveBeenCalled();
  });
});


describe('fetchSearchPages', () => {
  let store;
  beforeEach(() => {
    store = mockStore(INITIALIZED_STATE);
  });

  it('when fetchSearchPages succeeds, should dispatch SEARCH_PAGE and SET_PAGE', (done) => {
    store.dispatch(fetchSearchPages('page')).then(() => {
      expect(getSearchPages).toHaveBeenCalled();
      const actions = store.getActions();
      expect(actions).toHaveLength(2);
      expect(actions[0]).toHaveProperty('type', SEARCH_PAGES);
      expect(actions[1]).toHaveProperty('type', SET_PAGE);
      done();
    }).catch(done.fail);
  });

  it('if the response is not ok, dispatch add errors', async () => {
    getSearchPages.mockImplementation(mockApi({ errors: true }));
    return store.dispatch(fetchSearchPages('page')).catch((e) => {
      expect(getSearchPages).toHaveBeenCalled();
      const actions = store.getActions();
      expect(actions).toHaveLength(1);
      expect(actions[0]).toHaveProperty('type', ADD_ERRORS);
      expect(e).toHaveProperty('errors');
      e.errors.forEach((error, index) => {
        expect(error.message).toEqual(actions[0].payload.errors[index]);
      });
    });
  });
});

describe('clonePage', () => {
  let store;
  beforeEach(() => {
    store = mockStore(INITIALIZED_STATE);
  });

  it('when clonePage succeeds, should dispatch gotoRoute PAGE_ADD and initialize FORM', (done) => {
    store.dispatch(clonePage('page')).then(() => {
      const actions = store.getActions();
      expect(actions).toHaveLength(1);
      expect(gotoRoute).toHaveBeenCalledWith(ROUTE_PAGE_CLONE);
      expect(initialize).toHaveBeenCalled();

      done();
    }).catch(done.fail);
  });
});

describe('fetchReferencesPage', () => {
  let store;
  beforeEach(() => {
    store = mockStore(INITIALIZED_STATE);
  });

  it('when fetchReferencesPage succeeds, should dispatch SET_REFERENCES_SELECTED_PAGE with empty data', (done) => {
    store.dispatch(fetchReferencesPage(store.getState)).then(() => {
      const actions = store.getActions();
      expect(actions).toHaveLength(1);
      expect(actions[0]).toHaveProperty('type', SET_REFERENCES_SELECTED_PAGE);
      done();
    }).catch(done.fail);
  });

  it('when fetchSearchPages succeeds, should get a references array and dispatch SET_REFERENCES_SELECTED_PAGE', (done) => {
    getReferencesFromSelectedPage.mockReturnValue(['jacmsContentManager']);
    store.dispatch(fetchReferencesPage(store.getState)).then(() => {
      expect(getReferencesPage).toHaveBeenCalled();
      const actions = store.getActions();
      expect(actions).toHaveLength(1);
      expect(actions[0]).toHaveProperty('type', SET_REFERENCES_SELECTED_PAGE);
      done();
    }).catch(done.fail);
  });

  it('if the response is not ok, dispatch add errors', async () => {
    getReferencesFromSelectedPage.mockReturnValue(['jacmsContentManager']);
    getReferencesPage.mockImplementation(mockApi({ errors: true }));
    return store.dispatch(fetchReferencesPage(store.getState)).catch((e) => {
      expect(getReferencesPage).toHaveBeenCalled();
      const actions = store.getActions();
      expect(actions).toHaveLength(1);
      expect(actions[0]).toHaveProperty('type', ADD_ERRORS);
      expect(e).toHaveProperty('errors');
      e.errors.forEach((error, index) => {
        expect(error.message).toEqual(actions[0].payload.errors[index]);
      });
    });
  });
});
