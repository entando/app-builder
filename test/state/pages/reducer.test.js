import reducer from 'state/pages/reducer';

import {
  HOMEPAGE_PAYLOAD, DASHBOARD_PAYLOAD, SERVICE_PAYLOAD, CONTACTS_PAYLOAD, ERROR_PAYLOAD,
  LOGIN_PAYLOAD, NOTFOUND_PAYLOAD, FREE_PAGES_PAYLOAD, CONTENT_REFERENCES,
} from 'test/mocks/pages';

import {
  addPages, setPageParentSync, movePageSync, setPageExpanded, setPageLoading, setPageLoaded,
  setFreePages, setSelectedPage, removePage, updatePage, setSearchPages, clearSearch,
  setReferenceSelectedPage, clearTree, collapseAll, setBatchExpanded,
} from 'state/pages/actions';

import { HOMEPAGE_CODE } from 'state/pages/const';

const PAGES = [
  HOMEPAGE_PAYLOAD, DASHBOARD_PAYLOAD, SERVICE_PAYLOAD, CONTACTS_PAYLOAD, ERROR_PAYLOAD,
  LOGIN_PAYLOAD, NOTFOUND_PAYLOAD,
];

describe('state/pages/reducer', () => {
  it('should return an object', () => {
    const state = reducer();
    expect(typeof state).toBe('object');
    expect(state).toHaveProperty('map', {});
    expect(state).toHaveProperty('childrenMap', {});
    expect(state).toHaveProperty('titlesMap', {});
    expect(state).toHaveProperty('statusMap', {});
    expect(state).toHaveProperty('freePages', []);
    expect(state).toHaveProperty('selected', null);
    expect(state).toHaveProperty('search', []);
  });

  describe('after action ADD_PAGES', () => {
    let state;
    beforeEach(() => {
      state = reducer({}, addPages(PAGES));
    });

    it('should define the pages map', () => {
      expect(state.map).toBeDefined();
      PAGES.forEach((page) => {
        expect(state.map[page.code]).toBeDefined();
      });
    });

    it('should define the childrenMap', () => {
      expect(state.childrenMap).toBeDefined();
      PAGES.forEach((page) => {
        expect(state.childrenMap[page.code]).toBeDefined();
      });
    });

    it('should define the titlesMap', () => {
      expect(state.titlesMap).toBeDefined();
      PAGES.forEach((page) => {
        expect(state.titlesMap[page.code]).toBeDefined();
      });
    });

    describe('after action CLEAR_TREE', () => {
      beforeEach(() => {
        state = reducer(state, setFreePages(FREE_PAGES_PAYLOAD));
        state = reducer(state, setSelectedPage(HOMEPAGE_PAYLOAD));
        state = reducer(state, setPageExpanded(HOMEPAGE_CODE));

        state = reducer(state, clearTree());
      });

      it('should have an empty map', () => {
        expect(state).toHaveProperty('map', {});
      });

      it('should have an empty childrenMap', () => {
        expect(state).toHaveProperty('childrenMap', {});
      });

      it('should have an empty titlesMap', () => {
        expect(state).toHaveProperty('titlesMap', {});
      });

      it('should have an empty statusMap', () => {
        expect(state).toHaveProperty('statusMap', {});
      });

      it('should have an empty freePages', () => {
        expect(state).toHaveProperty('freePages', []);
      });

      it('should have an empty selected', () => {
        expect(state).toHaveProperty('selected', null);
      });
    });


    describe('after action SET_PAGE_PARENT', () => {
      let newState;
      const OLD_PARENT_CODE = HOMEPAGE_CODE;
      const NEW_PARENT_CODE = 'service';
      const PAGE_CODE = 'dashboard';
      beforeEach(() => {
        // setting service as parent of dashboard
        newState = reducer(state, setPageParentSync(PAGE_CODE, OLD_PARENT_CODE, NEW_PARENT_CODE));
      });
      it('should set parentCode on the child page', () => {
        expect(newState.map[PAGE_CODE].parentCode).toBe(NEW_PARENT_CODE);
      });
      it('should set the child page in the parent\'s children', () => {
        expect(newState.childrenMap[NEW_PARENT_CODE].includes(PAGE_CODE)).toBe(true);
      });
      it('should remove the child from the old parent\'s children', () => {
        expect(newState.childrenMap[OLD_PARENT_CODE].includes(PAGE_CODE)).toBe(false);
      });
      it('should put the child in the end of the array', () => {
        const childrenArray = newState.childrenMap[NEW_PARENT_CODE];
        expect(childrenArray.indexOf(PAGE_CODE)).toBe(childrenArray.length - 1);
      });
    });


    describe('after action MOVE_PAGE', () => {
      let newState;
      const OLD_PARENT_CODE = HOMEPAGE_CODE;
      const NEW_PARENT_CODE = 'service';
      const PAGE_CODE = 'dashboard';
      const NEW_POSITION = 2;
      beforeEach(() => {
        // setting service as parent of dashboard
        newState = reducer(
          state,
          movePageSync(PAGE_CODE, OLD_PARENT_CODE, NEW_PARENT_CODE, NEW_POSITION),
        );
      });
      it('should set parentCode on the child page', () => {
        expect(newState.map[PAGE_CODE].parentCode).toBe(NEW_PARENT_CODE);
      });
      it('should set the child page in the parent\'s children', () => {
        expect(newState.childrenMap[NEW_PARENT_CODE].includes(PAGE_CODE)).toBe(true);
      });
      it('should remove the child from the old parent\'s children', () => {
        expect(newState.childrenMap[OLD_PARENT_CODE].includes(PAGE_CODE)).toBe(false);
      });
      it('should put the child in the right index', () => {
        expect(newState.childrenMap[NEW_PARENT_CODE].indexOf(PAGE_CODE)).toBe(1);
      });
    });

    describe('action SET_PAGE_EXPANDED', () => {
      let newState;
      const PAGE_CODE = HOMEPAGE_CODE;
      it('should toggle the page expanded flag', () => {
        newState = reducer(state, setPageExpanded(PAGE_CODE));
        expect(newState.statusMap[PAGE_CODE].expanded).toBe(true);

        newState = reducer(newState, setPageExpanded(PAGE_CODE, false));
        expect(newState.statusMap[PAGE_CODE].expanded).toBe(false);
      });
    });

    describe('action SET_PAGE_LOADING', () => {
      let newState;
      const PAGE_CODE = HOMEPAGE_CODE;
      it('sets the page loading flag to true', () => {
        newState = reducer(state, setPageLoading(PAGE_CODE));
        expect(newState.statusMap[PAGE_CODE].loading).toBe(true);
      });
    });

    describe('action SET_PAGE_LOADED', () => {
      let newState;
      const PAGE_CODE = HOMEPAGE_CODE;
      it('sets the page loaded flag to true', () => {
        newState = reducer(state, setPageLoaded(PAGE_CODE));
        expect(newState.statusMap[PAGE_CODE].loaded).toBe(true);
      });
      it('sets the page loading flag to false', () => {
        newState = reducer(state, setPageLoaded(PAGE_CODE));
        expect(newState.statusMap[PAGE_CODE].loading).toBe(false);
      });
    });
  });

  describe('after action SET_FREE_PAGES', () => {
    let state;
    beforeEach(() => {
      state = reducer({}, setFreePages(FREE_PAGES_PAYLOAD));
    });
    it('state should be valued with an array of options', () => {
      expect(state.freePages[0]).toEqual(FREE_PAGES_PAYLOAD[0]);
    });
  });

  describe('after action SET_SELECTED_PAGE', () => {
    it('state should be valued with an object information from selected page', () => {
      const state = reducer({}, setSelectedPage(HOMEPAGE_PAYLOAD));
      expect(state).toHaveProperty('selected', HOMEPAGE_PAYLOAD);
    });
  });

  describe('after action REMOVE_PAGE', () => {
    let state = {
      selected: DASHBOARD_PAYLOAD,
    };
    beforeEach(() => {
      state = reducer(state, addPages(PAGES));
    });

    it('state map should be changed', () => {
      const keys = Object.keys(state.map);
      const newState = reducer(state, removePage(DASHBOARD_PAYLOAD));
      expect(newState).toHaveProperty('map');
      const newKeys = Object.keys(newState.map);
      expect(keys.length).toBeGreaterThan(newKeys.length);
      expect(newState.map).not.toEqual(expect.objectContaining(DASHBOARD_PAYLOAD));
    });

    it('state childrenMap should be changed', () => {
      const keys = Object.keys(state.childrenMap);
      const newState = reducer(state, removePage(DASHBOARD_PAYLOAD));
      expect(newState).toHaveProperty('childrenMap');
      const newKeys = Object.keys(newState.childrenMap);
      expect(keys.length).toBeGreaterThan(newKeys.length);
      expect(newState.childrenMap)
        .not.toEqual(expect.objectContaining({ dashboard: expect.any(Object) }));
    });

    it('state titlesMap should be changed', () => {
      const keys = Object.keys(state.titlesMap);
      const newState = reducer(state, removePage(DASHBOARD_PAYLOAD));
      expect(newState).toHaveProperty('titlesMap');
      const newKeys = Object.keys(newState.titlesMap);
      expect(keys.length).toBeGreaterThan(newKeys.length);
      expect(newState.titlesMap)
        .not.toEqual(expect.objectContaining({ dashboard: expect.any(Object) }));
    });

    it('state selected should be changed', () => {
      const newState = reducer(state, removePage(DASHBOARD_PAYLOAD));
      expect(newState).toHaveProperty('selected', null);
    });

    it('state selected should be unchanged ', () => {
      const newState = reducer(state, removePage(HOMEPAGE_PAYLOAD));
      expect(newState).toHaveProperty('selected', DASHBOARD_PAYLOAD);
    });
  });
  describe('after UPDATE_PAGE', () => {
    let state = {
      selected: DASHBOARD_PAYLOAD,
    };
    beforeEach(() => {
      state = reducer(state, addPages(PAGES));
    });

    it('status will be update', () => {
      const newState = reducer(state, updatePage({ ...DASHBOARD_PAYLOAD, status: 'unpublished' }));
      expect(newState.map[DASHBOARD_PAYLOAD.code]).toHaveProperty('status', 'unpublished');
    });

    it('titles will be set correctly', () => {
      const newState = reducer(state, updatePage({ ...DASHBOARD_PAYLOAD }));
      expect(newState.titlesMap[DASHBOARD_PAYLOAD.code]).toBe(DASHBOARD_PAYLOAD.titles);
    });
  });

  describe('SEARCH_PAGES', () => {
    let state;
    beforeEach(() => {
      state = reducer(state);
    });
    it('status will be update', () => {
      const newState = reducer(state, setSearchPages(PAGES));
      expect(newState).toHaveProperty('search', PAGES);
    });
  });

  describe('CLEAR_PAGES', () => {
    let state;
    beforeEach(() => {
      state = reducer(state);
    });
    it('status will be update', () => {
      const newState = reducer(state, clearSearch());
      expect(newState).toHaveProperty('search', null);
    });
  });
  describe('SET_REFERENCES_SELECTED_PAGE', () => {
    let state;
    beforeEach(() => {
      state = reducer(state);
    });
    it('status will be update', () => {
      const newState = reducer(state, setReferenceSelectedPage(CONTENT_REFERENCES));
      expect(newState).toHaveProperty('selected.ref', CONTENT_REFERENCES);
    });
  });

  describe('action CLEAR_TREE', () => {
    let state;
    beforeEach(() => {
      state = reducer({}, addPages(PAGES));
    });

    let newState;
    it('should clear the tree', () => {
      newState = reducer(state, clearTree());
      expect(newState.statusMap).toEqual({});
    });
  });

  describe('action COLLAPSE_ALL', () => {
    let state;
    beforeEach(() => {
      state = reducer({}, addPages(PAGES));
    });

    let newState;
    it('should collapse all the tree', () => {
      newState = reducer(state, setPageExpanded(HOMEPAGE_CODE));
      expect(newState.statusMap.homepage.expanded).toBe(true);
      newState = reducer(newState, collapseAll());
      Object.values(newState.statusMap).map(v => expect(v.expanded).toBe(false));
    });
  });

  describe('action BATCH_TOGGLE_EXPANDED', () => {
    let state;
    beforeEach(() => {
      state = reducer({}, addPages(PAGES));
    });

    let newState;
    it('should collapse all the tree', () => {
      newState = reducer(state, setBatchExpanded([HOMEPAGE_CODE, 'dashboard']));
      expect(newState.statusMap.homepage.expanded).toBe(true);
      expect(newState.statusMap.dashboard.expanded).toBe(true);
    });
  });
});
