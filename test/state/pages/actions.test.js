import { initialize } from 'redux-form';
import { isFSA } from 'flux-standard-action';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { ADD_TOAST, ADD_ERRORS } from '@entando/messages';

import { mockApi } from 'test/testUtils';

import { SET_PAGE } from 'state/pagination/types';

import {
  addPages, setPageLoading, setPageLoaded, setPageExpanded, movePageSync, setPageParentSync,
  handleExpandPage, setPageParent, movePageBelow, movePageAbove, sendPostPage, fetchSearchPages,
  fetchPageForm, sendPutPage, setFreePages, fetchFreePages, fetchPageSettings, publishSelectedPage,
  unpublishSelectedPage, loadSelectedPage, removePage, sendDeletePage, clearSearchPage, clearSearch,
  setReferenceSelectedPage, clonePage, clearTree, sendPutPageSettings, sendPatchPage,
  fetchPageTreeAll, setBatchExpanded, fetchDashboardPages, setVirtualRoot, fetchIfPageExists,
  setEditPage,
} from 'state/pages/actions';

import {
  ADD_PAGES, SET_PAGE_LOADING, SET_PAGE_LOADED, SET_PAGE_EXPANDED, MOVE_PAGE, SET_PAGE_PARENT,
  SET_FREE_PAGES, SET_SELECTED_PAGE, REMOVE_PAGE, UPDATE_PAGE, CLEAR_SEARCH, SEARCH_PAGES,
  SET_REFERENCES_SELECTED_PAGE, CLEAR_TREE, BATCH_TOGGLE_EXPANDED, SET_DASHBOARD_PAGES,
  SET_VIRTUAL_ROOT, SET_EDIT_PAGE,
} from 'state/pages/types';

import { SET_PUBLISHED_PAGE_CONFIG } from 'state/page-config/types';

import {
  HOMEPAGE_PAYLOAD, DASHBOARD_PAYLOAD, SERVICE_PAYLOAD, CONTACTS_PAYLOAD, ERROR_PAYLOAD,
  LOGIN_PAYLOAD, NOTFOUND_PAYLOAD, FREE_PAGES_PAYLOAD,
} from 'test/mocks/pages';

import {
  setPagePosition, postPageSEO, putPageSEO, getPage, getPageSEO, getPageChildren, getPageSettings,
  putPageStatus, deletePage, getFreePages, getSearchPages,
  putPageSettings, patchPage,
} from 'api/pages';
import { history, ROUTE_PAGE_TREE, ROUTE_PAGE_CLONE } from 'app-init/router';
import { makeGetSelectedPageConfig } from 'state/page-config/selectors';
import { getSelectedPage, getPagesMap, getChildrenMap, getStatusMap } from 'state/pages/selectors';

import { HOMEPAGE_CODE } from 'state/pages/const';

jest.mock('state/page-config/selectors', () => ({
  makeGetSelectedPageConfig: jest.fn(),
}));

jest.mock('state/pages/selectors', () => ({
  getPage: jest.fn(),
  getStatusMap: jest.fn(),
  getPagesMap: jest.fn(),
  getChildrenMap: jest.fn(),
  getSelectedPage: jest.fn(),
  getReferencesFromSelectedPage: jest.fn(() => []),
  getAllPageTreeLoadedStatus: jest.fn(() => []),
}));

jest.mock('state/languages/selectors', () => ({
  getDefaultLanguage: jest.fn((() => 'en')),
}));

jest.mock('app-init/router', () => ({
  history: {
    push: jest.fn(),
  },
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

  describe('clearTree', () => {
    let action;
    beforeEach(() => {
      action = clearTree();
    });

    it('is FSA compliant', () => {
      expect(isFSA(action)).toBe(true);
    });

    it('actions is correct setup ', () => {
      expect(action).toHaveProperty('type', CLEAR_TREE);
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


  it('setEditPage() should return a well formed action', () => {
    const action = setEditPage(HOMEPAGE_PAYLOAD);
    expect(action.type).toBe(SET_EDIT_PAGE);
    expect(action.payload).toEqual(HOMEPAGE_PAYLOAD);
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

  it('setVirtualRoot() should return a well formed action', () => {
    const action = setVirtualRoot(true);
    expect(action.type).toBe(SET_VIRTUAL_ROOT);
    expect(action.payload).toEqual(true);
  });

  it('setPageExpanded() should return a well formed action', () => {
    const action = setPageExpanded(PAGE_CODE, true);
    expect(action.type).toBe(SET_PAGE_EXPANDED);
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

  it('clearTree() should return a well formed action', () => {
    const action = clearTree();
    expect(action.type).toBe(CLEAR_TREE);
  });

  it('setBatchExpanded() should return a well formed action', () => {
    const action = setBatchExpanded([1, 2, 3]);
    expect(action.type).toBe(BATCH_TOGGLE_EXPANDED);
    expect(action.payload).toEqual([1, 2, 3]);
  });

  it('collapseAll() should return a well formed action', () => {
    const action = clearTree();
    expect(action.type).toBe(CLEAR_TREE);
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
        expect(actionTypes.includes(SET_PAGE_EXPANDED)).toBe(true);
        expect(actionTypes.includes(ADD_PAGES)).toBe(false);
        done();
      }).catch(done.fail);
    });

    it('when loading homepage, should download homepage and its children', (done) => {
      const store = mockStore();
      getStatusMap.mockReturnValue({});
      store.dispatch(handleExpandPage(HOMEPAGE_CODE)).then(() => {
        const actionTypes = store.getActions().map(action => action.type);
        expect(actionTypes.includes(SET_PAGE_LOADING)).toBe(true);
        expect(actionTypes.includes(SET_PAGE_LOADED)).toBe(true);
        expect(actionTypes.includes(SET_PAGE_EXPANDED)).toBe(true);
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
        expect(actionTypes.includes(SET_PAGE_EXPANDED)).toBe(true);
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
        expect(actionTypes).toEqual([SET_PAGE_LOADING, SET_PAGE_PARENT, SET_PAGE_LOADED]);
        expect(setPagePosition).toHaveBeenCalled();
        done();
      }).catch(done.fail);
    });

    it('when setting the same parent name, should not call API nor dispatch action', (done) => {
      const store = mockStore(INITIALIZED_STATE);
      store.dispatch(setPageParent('dashboard', HOMEPAGE_CODE)).then(() => {
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
        expect(setPagePosition).toHaveBeenCalledWith('dashboard', 3, HOMEPAGE_CODE);
        expect(actions[0]).toEqual(movePageSync('dashboard', HOMEPAGE_CODE, HOMEPAGE_CODE, 3));
        done();
      }).catch(done.fail);
    });

    it('moving a page below another, under the same parent', (done) => {
      const store = mockStore(INITIALIZED_STATE);
      store.dispatch(movePageBelow('contacts', 'dashboard')).then(() => {
        const actions = store.getActions();
        expect(setPagePosition).toHaveBeenCalledWith('contacts', 2, HOMEPAGE_CODE);
        expect(actions[0]).toEqual(movePageSync('contacts', HOMEPAGE_CODE, HOMEPAGE_CODE, 2));
        done();
      }).catch(done.fail);
    });

    it('moving a page below another, under a different parent', (done) => {
      const store = mockStore(INITIALIZED_STATE);
      store.dispatch(movePageBelow('dashboard', 'notfound')).then(() => {
        const actions = store.getActions();
        expect(setPagePosition).toHaveBeenCalledWith('dashboard', 2, 'service');
        expect(actions[0]).toEqual(movePageSync('dashboard', HOMEPAGE_CODE, 'service', 2));
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
        expect(setPagePosition).toHaveBeenCalledWith('dashboard', 2, HOMEPAGE_CODE);
        expect(actions[0]).toEqual(movePageSync('dashboard', HOMEPAGE_CODE, HOMEPAGE_CODE, 2));
        done();
      }).catch(done.fail);
    });

    it('moving a page above another, under the same parent', (done) => {
      const store = mockStore(INITIALIZED_STATE);
      store.dispatch(movePageAbove('contacts', 'dashboard')).then(() => {
        const actions = store.getActions();
        expect(setPagePosition).toHaveBeenCalledWith('contacts', 1, HOMEPAGE_CODE);
        expect(actions[0]).toEqual(movePageSync('contacts', HOMEPAGE_CODE, HOMEPAGE_CODE, 1));
        done();
      }).catch(done.fail);
    });

    it('moving a page above another, under a different parent', (done) => {
      const store = mockStore(INITIALIZED_STATE);
      store.dispatch(movePageAbove('dashboard', 'notfound')).then(() => {
        const actions = store.getActions();
        expect(setPagePosition).toHaveBeenCalledWith('dashboard', 1, 'service');
        expect(actions[0]).toEqual(movePageSync('dashboard', HOMEPAGE_CODE, 'service', 1));
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
      postPageSEO.mockImplementation(mockApi({ payload: CONTACTS_PAYLOAD }));
      store.dispatch(sendPostPage(CONTACTS_PAYLOAD)).then(() => {
        const addPagesAction = store.getActions().find(action => action.type === ADD_PAGES);
        expect(postPageSEO).toHaveBeenCalledWith({
          ...CONTACTS_PAYLOAD,
          seoData: { ...CONTACTS_PAYLOAD.seoData, useExtraTitles: CONTACTS_PAYLOAD.seo },
        });
        expect(addPagesAction).toBeDefined();
        done();
      }).catch(done.fail);
    });

    it('when postPage fails, should dispatch ADD_ERRORS', (done) => {
      postPageSEO.mockImplementation(mockApi({ errors: true }));
      store.dispatch(sendPostPage(CONTACTS_PAYLOAD)).then(done.fail).catch(() => {
        const addErrorsAction = store.getActions().find(action => action.type === ADD_ERRORS);
        expect(postPageSEO).toHaveBeenCalledWith({
          ...CONTACTS_PAYLOAD,
          seoData: { ...CONTACTS_PAYLOAD.seoData, useExtraTitles: CONTACTS_PAYLOAD.seo },
        });
        expect(addErrorsAction).toBeDefined();
        done();
      });
    });
  });

  describe('sendPutPage()', () => {
    let store;
    beforeEach(() => {
      store = mockStore(INITIALIZED_STATE);
    });

    it('when putPage succeeds, should dispatch ADD_PAGES', (done) => {
      putPageSEO.mockImplementation(mockApi({ payload: CONTACTS_PAYLOAD }));
      store.dispatch(sendPutPage(CONTACTS_PAYLOAD)).then(() => {
        const actions = store.getActions();
        expect(actions).toHaveLength(2);
        expect(actions[0]).toHaveProperty('type', ADD_TOAST);
        expect(actions[1]).toHaveProperty('type', UPDATE_PAGE);
        expect(putPageSEO).toHaveBeenCalledWith({
          ...CONTACTS_PAYLOAD,
          seoData: { ...CONTACTS_PAYLOAD.seoData, useExtraTitles: CONTACTS_PAYLOAD.seo },
        });
        done();
      }).catch(done.fail);
    });

    it('if the response is not ok, dispatch add errors', async () => {
      putPageSEO.mockImplementation(mockApi({ errors: true }));
      return store.dispatch(sendPutPage(CONTACTS_PAYLOAD)).catch((e) => {
        expect(putPageSEO).toHaveBeenCalled();
        const actions = store.getActions();
        expect(actions).toHaveLength(2);
        expect(actions[0]).toHaveProperty('type', ADD_ERRORS);
        expect(actions[1]).toHaveProperty('type', ADD_TOAST);
        expect(e).toHaveLength(1);
        e.forEach((error, index) => {
          expect(error.message).toEqual(actions[0].payload.errors[index]);
        });
      });
    });
  });

  describe('sendPatchPage()', () => {
    let store;
    beforeEach(() => {
      jest.clearAllMocks();
      getSelectedPage.mockReturnValue(HOMEPAGE_PAYLOAD);
      store = mockStore(INITIALIZED_STATE);
    });

    it('when patchPage succeeds, should dispatch UPDATE_PAGE', (done) => {
      const updatedHomePage = {
        ...HOMEPAGE_PAYLOAD,
        pageModel: 'new_model',
      };
      const jsonPatch = [
        {
          op: 'replace',
          path: '/pageModel',
          value: 'new_model',
        },
      ];
      store.dispatch(sendPatchPage(updatedHomePage)).then(() => {
        const actions = store.getActions();
        expect(actions).toHaveLength(3);
        expect(actions[0]).toHaveProperty('type', SET_SELECTED_PAGE);
        expect(actions[1]).toHaveProperty('type', UPDATE_PAGE);
        expect(actions[2]).toHaveProperty('type', ADD_TOAST);
        expect(patchPage).toHaveBeenCalledWith(jsonPatch, HOMEPAGE_PAYLOAD.code);
        done();
      }).catch(done.fail);
    });

    it('if the response is not ok, dispatch add errors', async () => {
      patchPage.mockImplementation(mockApi({ errors: true }));
      return store.dispatch(sendPatchPage(HOMEPAGE_PAYLOAD)).catch((e) => {
        expect(patchPage).toHaveBeenCalled();
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

    it('calls removePage and router', (done) => {
      store.dispatch(sendDeletePage(DASHBOARD_PAYLOAD)).then(() => {
        expect(deletePage).toHaveBeenCalled();
        const actions = store.getActions();
        expect(actions).toHaveLength(2);
        expect(actions[0]).toHaveProperty('type', ADD_TOAST);
        expect(actions[1]).toHaveProperty('type', REMOVE_PAGE);
        expect(history.push).toHaveBeenCalledWith(ROUTE_PAGE_TREE);
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

    it('when getPage succeeds, should dispatch SET_EDIT_PAGE', (done) => {
      getPageSEO.mockImplementation(mockApi({ payload: CONTACTS_PAYLOAD }));
      store.dispatch(fetchPageForm(CONTACTS_PAYLOAD.code)).then(() => {
        const actions = store.getActions();
        expect(getPageSEO).toHaveBeenCalledWith(CONTACTS_PAYLOAD.code);
        expect(actions).toHaveLength(1);
        expect(actions[0]).toHaveProperty('type', SET_EDIT_PAGE);
        done();
      }).catch(done.fail);
    });

    it('when putPage fails, should dispatch ADD_ERRORS', (done) => {
      getPageSEO.mockImplementation(mockApi({ errors: true }));
      store.dispatch(fetchPageForm(CONTACTS_PAYLOAD.code)).then(() => {
        const addErrorsAction = store.getActions().find(action => action.type === ADD_ERRORS);
        expect(getPageSEO).toHaveBeenCalledWith(CONTACTS_PAYLOAD.code);
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

    it('when getPageSettings succeeds, should dispatch redux-form initialize', (done) => {
      getPageSettings.mockImplementation(mockApi({ payload: { a: 'b' } }));
      store.dispatch(fetchPageSettings()).then(() => {
        expect(getPageSettings).toHaveBeenCalled();
        done();
      }).catch(done.fail);
    });

    it('if the response is not ok, dispatch add errors', async () => {
      getPageSettings.mockImplementation(mockApi({ errors: true }));
      return store.dispatch(fetchPageSettings()).catch((e) => {
        expect(getPageSettings).toHaveBeenCalled();
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

  describe('sendPutPageSettings()', () => {
    let store;
    beforeEach(() => {
      store = mockStore(INITIALIZED_STATE);
    });

    it('when sendPutPageSettings succeeds, should dispatch ADD_TOAST', (done) => {
      store.dispatch(sendPutPageSettings()).then(() => {
        expect(putPageSettings).toHaveBeenCalled();
        const actions = store.getActions();
        expect(actions).toHaveLength(1);
        expect(actions[0]).toHaveProperty('type', ADD_TOAST);
        done();
      }).catch(done.fail);
    });

    it('if the response is not ok, dispatch add errors', async () => {
      putPageSettings.mockImplementationOnce(mockApi({ errors: true }));
      return store.dispatch(sendPutPageSettings()).catch((e) => {
        expect(putPageSettings).toHaveBeenCalled();
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

      it('when getPageSettings succeeds, should dispatch redux-form initialize', (done) => {
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
    makeGetSelectedPageConfig.mockReturnValue(() => [null, null]);
    putPageStatus.mockImplementation(mockApi({ payload: HOMEPAGE_PAYLOAD }));
    store = mockStore();
  });

  describe('publishSelectedPage()', () => {
    it('when putPageStatus succeeds, should dispatch setSelectedPage', (done) => {
      store.dispatch(publishSelectedPage()).then(() => {
        expect(putPageStatus).toHaveBeenCalled();
        const actions = store.getActions();
        expect(actions).toHaveLength(6);
        expect(actions[0]).toHaveProperty('type', SET_PAGE_LOADING);
        expect(actions[1]).toHaveProperty('type', SET_SELECTED_PAGE);
        expect(actions[2]).toHaveProperty('type', UPDATE_PAGE);
        expect(actions[3]).toHaveProperty('type', SET_PUBLISHED_PAGE_CONFIG);
        expect(actions[4]).toHaveProperty('type', ADD_TOAST);
        expect(actions[5]).toHaveProperty('type', SET_PAGE_LOADED);
        done();
      }).catch(done.fail);
    });

    it('when putPageStatus fails, should not dispatch anything', (done) => {
      putPageStatus.mockImplementation(mockApi({ errors: true }));
      store.dispatch(publishSelectedPage()).then(() => {
        expect(putPageStatus).toHaveBeenCalled();
        const actionsTypes = store.getActions().map(action => action.type);
        expect(actionsTypes).toEqual([SET_PAGE_LOADING, SET_PAGE_LOADED]);
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
        expect(actions).toHaveLength(6);
        expect(actions[0]).toHaveProperty('type', SET_PAGE_LOADING);
        expect(actions[1]).toHaveProperty('type', SET_SELECTED_PAGE);
        expect(actions[2]).toHaveProperty('type', UPDATE_PAGE);
        expect(actions[3]).toHaveProperty('type', SET_PUBLISHED_PAGE_CONFIG);
        expect(actions[4]).toHaveProperty('type', ADD_TOAST);
        expect(actions[5]).toHaveProperty('type', SET_PAGE_LOADED);
        done();
      }).catch(done.fail);
    });

    it('when putPageStatus fails, should not dispatch anything', (done) => {
      putPageStatus.mockImplementation(mockApi({ errors: true }));
      store.dispatch(unpublishSelectedPage()).then(() => {
        expect(putPageStatus).toHaveBeenCalled();
        const actionsTypes = store.getActions().map(action => action.type);
        expect(actionsTypes).toEqual([SET_PAGE_LOADING, SET_PAGE_LOADED]);
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
      expect(actionsTypes).toEqual([ADD_ERRORS, ADD_TOAST]);
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
    expect(actions).toHaveLength(1);
    expect(actions[0]).toHaveProperty('type', CLEAR_SEARCH);
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

  it('when clonePage succeeds, should call router PAGE_ADD and initialize FORM', (done) => {
    store.dispatch(clonePage('page')).then(() => {
      const actions = store.getActions();
      expect(actions).toHaveLength(0);
      expect(history.push).toHaveBeenCalledWith(`${ROUTE_PAGE_CLONE}?pageCode=undefined`);
      done();
    }).catch(done.fail);
  });

  it('should pass redirectTo as query parameter', (done) => {
    store.dispatch(clonePage('page', 'redirectToPage')).then(() => {
      expect(history.push).toHaveBeenCalledWith(`${ROUTE_PAGE_CLONE}?pageCode=undefined&redirectTo=redirectToPage`);
      done();
    }).catch(done.fail);
  });
});

describe('fetchPageTreeAll()', () => {
  beforeEach(() => {
    getStatusMap.mockReturnValue(INITIALIZED_STATE.pages.statusMap);
    getPage.mockImplementation(mockApi({ payload: HOMEPAGE_PAYLOAD }));
    getPageChildren.mockImplementation(mockApi({ payload: [CONTACTS_PAYLOAD] }));
  });

  it('when loading homepage, should download homepage and its children', () => {
    const store = mockStore();
    getStatusMap.mockReturnValue({});
    store.dispatch(fetchPageTreeAll());
    const actionTypes = store.getActions().map(action => action.type);
    expect(actionTypes.includes(SET_PAGE_LOADING)).toBe(true);
  });
});

describe('fetchDashboardPages', () => {
  let store;
  beforeEach(() => {
    store = mockStore(INITIALIZED_STATE);
  });

  it('should dispatch SET_DASHBOARD_PAGES and SET_PAGE if successful', (done) => {
    getSearchPages.mockImplementation(mockApi({ payload: [] }));
    store.dispatch(fetchDashboardPages('page')).then(() => {
      expect(getSearchPages).toHaveBeenCalled();
      const actions = store.getActions();
      expect(actions).toHaveLength(2);
      expect(actions[0]).toHaveProperty('type', SET_DASHBOARD_PAGES);
      expect(actions[1]).toHaveProperty('type', SET_PAGE);
      done();
    }).catch(done.fail);
  });

  it('should dispatch add errors if the response is not ok', async () => {
    getSearchPages.mockImplementation(mockApi({ errors: true }));
    return store.dispatch(fetchDashboardPages('page')).catch((e) => {
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

describe('fetchIfPageExists', () => {
  it('fetchIfPageExists promise should resolve true if page exists', () => {
    getPage.mockImplementation(mockApi({ payload: HOMEPAGE_PAYLOAD }));
    return fetchIfPageExists('homepage').then((exists) => {
      expect(exists).toBe(true);
    });
  });

  it('fetchIfPageExists promise should resolve false if page does not exist', () => {
    getPage.mockImplementation(mockApi({ errors: true }));
    return fetchIfPageExists('homepage').then((exists) => {
      expect(exists).toBe(false);
    });
  });
});
