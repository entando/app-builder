import reducer from 'state/pages/reducer';

import {
  HOMEPAGE_PAYLOAD, DASHBOARD_PAYLOAD, SERVICE_PAYLOAD, CONTACTS_PAYLOAD, ERROR_PAYLOAD,
  LOGIN_PAYLOAD, NOTFOUND_PAYLOAD, FREE_PAGES_PAYLOAD,
} from 'test/mocks/pages';

import {
  addPages, setPageParentSync, movePageSync, togglePageExpanded, setPageLoading, setPageLoaded,
  setFreePages, setSelectedPage, removePage, updateStatusPage,
} from 'state/pages/actions';

const PAGES = [
  HOMEPAGE_PAYLOAD, DASHBOARD_PAYLOAD, SERVICE_PAYLOAD, CONTACTS_PAYLOAD, ERROR_PAYLOAD,
  LOGIN_PAYLOAD, NOTFOUND_PAYLOAD,
];

describe('state/pages/reducer', () => {
  it('should return an object', () => {
    const state = reducer();
    expect(typeof state).toBe('object');
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


    describe('after action SET_PAGE_PARENT', () => {
      let newState;
      const OLD_PARENT_CODE = 'homepage';
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
      const OLD_PARENT_CODE = 'homepage';
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

    describe('action TOGGLE_PAGE_EXPANDED', () => {
      let newState;
      const PAGE_CODE = 'homepage';
      it('should toggle the page expanded flag', () => {
        newState = reducer(state, togglePageExpanded(PAGE_CODE));
        expect(newState.statusMap[PAGE_CODE].expanded).toBe(true);

        newState = reducer(newState, togglePageExpanded(PAGE_CODE));
        expect(newState.statusMap[PAGE_CODE].expanded).toBe(false);
      });
    });

    describe('action SET_PAGE_LOADING', () => {
      let newState;
      const PAGE_CODE = 'homepage';
      it('sets the page loading flag to true', () => {
        newState = reducer(state, setPageLoading(PAGE_CODE));
        expect(newState.statusMap[PAGE_CODE].loading).toBe(true);
      });
    });

    describe('action SET_PAGE_LOADED', () => {
      let newState;
      const PAGE_CODE = 'homepage';
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
  describe('after UPDATE_STATUS_PAGE', () => {
    let state = {
      selected: DASHBOARD_PAYLOAD,
    };
    beforeEach(() => {
      state = reducer(state, addPages(PAGES));
    });

    it('status will be update', () => {
      const newState = reducer(state, updateStatusPage({ ...DASHBOARD_PAYLOAD, status: 'unpublished' }));
      expect(newState.map[DASHBOARD_PAYLOAD.code]).toHaveProperty('status', 'unpublished');
    });
  });
});
