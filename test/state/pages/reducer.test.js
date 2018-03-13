import reducer from 'state/pages/reducer';

import {
  HOMEPAGE_PAYLOAD, DASHBOARD_PAYLOAD, SERVICE_PAYLOAD, CONTACTS_PAYLOAD, ERROR_PAYLOAD,
  LOGIN_PAYLOAD, NOTFOUND_PAYLOAD, FREE_PAGES_PAYLOAD,
} from 'test/mocks/pages';

import {
  addPages, setPageParentSync, movePageSync, togglePageExpanded, setPageLoading, setPageLoaded,
  setFreePages,
} from 'state/pages/actions';

import { setPageWidgets, setPageWidget, removePageWidgetSync } from 'state/page-config/actions';

const PAGES = [
  HOMEPAGE_PAYLOAD, DASHBOARD_PAYLOAD, SERVICE_PAYLOAD, CONTACTS_PAYLOAD, ERROR_PAYLOAD,
  LOGIN_PAYLOAD, NOTFOUND_PAYLOAD,
];

const PAGE_WIDGETS = [
  null,
  { type: 'login_form' },
  null,
];
const EMPTY_FRAME_INDEX = 2;
const FULL_FRAME_INDEX = 1;


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

    it('should define the widgetsMap', () => {
      expect(state.widgetsMap).toBeDefined();
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

  describe('after action SET_PAGE_WIDGETS', () => {
    const PAGE_CODE = 'some_page';
    let state;
    beforeEach(() => {
      state = reducer({}, setPageWidgets(PAGE_CODE, PAGE_WIDGETS));
    });
    it('the pageWidgets should be added to the widgetsMap', () => {
      expect(state.widgetsMap[PAGE_CODE]).toEqual(PAGE_WIDGETS);
    });
  });

  describe('after action SET_PAGE_WIDGET', () => {
    const PAGE_CODE = 'some_page';
    const WIDGET = { code: 'another_widget', name: 'Another Widget' };
    const initialState = { widgetsMap: { [PAGE_CODE]: PAGE_WIDGETS } };

    describe('moving a widget to an empty frame', () => {
      let state;
      beforeEach(() => {
        state = reducer(
          initialState,
          setPageWidget(PAGE_CODE, WIDGET, EMPTY_FRAME_INDEX, FULL_FRAME_INDEX),
        );
      });

      it('the widget should be removed from its previous place', () => {
        expect(state.widgetsMap[PAGE_CODE][FULL_FRAME_INDEX]).toBe(null);
      });

      it('the widget should be inserted to its new place', () => {
        expect(state.widgetsMap[PAGE_CODE][EMPTY_FRAME_INDEX]).toEqual({
          type: WIDGET.code,
          config: undefined,
        });
      });
    });

    describe('moving a widget to an already full frame', () => {
      let state;
      beforeEach(() => {
        state = reducer(
          initialState,
          setPageWidget(PAGE_CODE, WIDGET, FULL_FRAME_INDEX),
        );
      });

      it('the widget should be inserted to its new place', () => {
        expect(state.widgetsMap[PAGE_CODE][FULL_FRAME_INDEX]).toEqual({
          type: WIDGET.code,
          config: undefined,
        });
      });
    });
  });

  describe('after action REMOVE_PAGE_WIDGET', () => {
    const PAGE_CODE = 'some_page';
    const initialState = { widgetsMap: { [PAGE_CODE]: PAGE_WIDGETS } };
    let state;
    beforeEach(() => {
      state = reducer(
        initialState,
        removePageWidgetSync(PAGE_CODE, FULL_FRAME_INDEX),
      );
    });

    it('the widget should be removed from its previous place', () => {
      expect(state.widgetsMap[PAGE_CODE][FULL_FRAME_INDEX]).toBe(null);
    });
  });
});
