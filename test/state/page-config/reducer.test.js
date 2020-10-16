import {
  toggleContent, setSearchFilter, setPageConfig, setPublishedPageConfig,
  setPageWidget, removePageWidgetSync, toggleContentToolbarExpanded,
} from 'state/page-config/actions';
import reducer from 'state/page-config/reducer';
import { WIDGET_LIST, PAGES } from 'state/page-config/const';
import { HOMEPAGE_CONFIG } from 'test/mocks/pageConfig';


const PAGE_CONFIG = HOMEPAGE_CONFIG;
const EMPTY_FRAME_INDEX = PAGE_CONFIG.findIndex(item => item === null);
const FULL_FRAME_INDEX = PAGE_CONFIG.findIndex(item => item !== null);


describe('state/page-config/reducer', () => {
  let state;
  beforeEach(() => {
    state = reducer();
  });

  describe('default state', () => {
    it('should define a content', () => {
      expect(state.content).toBeDefined();
      expect(typeof state.content).toBe('string');
    });

    it('should define a searchFilter', () => {
      expect(state.searchFilter).toBeDefined();
      expect(typeof state.searchFilter).toBe('object');
    });

    it('should define configMap', () => {
      expect(state.configMap).toBeDefined();
      expect(typeof state.configMap).toBe('object');
    });

    it('should define publishedConfigMap', () => {
      expect(state.publishedConfigMap).toBeDefined();
      expect(typeof state.publishedConfigMap).toBe('object');
    });

    describe('on action TOOGLE_CONTENT', () => {
      it('state.content should be equal to default WIDGET_LIST', () => {
        const newState = reducer();
        expect(newState.content).toEqual(WIDGET_LIST);
      });

      it('state.content should be equal to PAGES', () => {
        const newState = reducer(state, toggleContent());
        expect(newState.content).toEqual(PAGES);
      });

      it('state.content should toggle between WIDGET_LIST and PAGES', () => {
        let newState = reducer();
        expect(newState.content).toEqual(WIDGET_LIST);
        newState = reducer(newState, toggleContent());
        expect(newState.content).toEqual(PAGES);
        newState = reducer(newState, toggleContent());
        expect(newState.content).toEqual(WIDGET_LIST);
      });
    });

    describe('on action SET_SEARCH_FILTER', () => {
      let newState;
      beforeEach(() => {
        newState = reducer(state, setSearchFilter('aaa'));
      });

      it('state.searchFilter should be equal to input value', () => {
        expect(newState.searchFilter).toEqual('aaa');
      });
    });
  });

  describe('after action TOGGLE_TOOLBAR_EXPANDED', () => {
    it('with no argument, should toggle the toolbar expanded value', () => {
      state = reducer({}, toggleContentToolbarExpanded());
      expect(state.toolbarExpanded).toBe(true);
      state = reducer(state, toggleContentToolbarExpanded());
      expect(state.toolbarExpanded).toBe(false);
    });

    it('with true argument, should expand the toolbar', () => {
      state = reducer({}, toggleContentToolbarExpanded(true));
      expect(state.toolbarExpanded).toBe(true);
      state = reducer(state, toggleContentToolbarExpanded(true));
      expect(state.toolbarExpanded).toBe(true);
    });

    it('with false argument, should collapse the toolbar', () => {
      state = reducer({}, toggleContentToolbarExpanded(false));
      expect(state.toolbarExpanded).toBe(false);
      state = reducer(state, toggleContentToolbarExpanded(false));
      expect(state.toolbarExpanded).toBe(false);
    });
  });


  describe('after action SET_PAGE_CONFIG', () => {
    const PAGE_CODE = 'some_page';
    beforeEach(() => {
      state = reducer({}, setPageConfig(PAGE_CODE, PAGE_CONFIG));
    });
    it('the page config should be added to the configMap', () => {
      expect(state.configMap[PAGE_CODE]).toEqual(PAGE_CONFIG);
    });
  });

  describe('after action SET_PUBLISHED_PAGE_CONFIG', () => {
    const PAGE_CODE = 'some_page';
    beforeEach(() => {
      state = reducer({}, setPublishedPageConfig(PAGE_CODE, PAGE_CONFIG));
    });
    it('the page config should be added to the publishedConfigMap', () => {
      expect(state.publishedConfigMap[PAGE_CODE]).toEqual(PAGE_CONFIG);
    });
  });

  describe('after action SET_PAGE_WIDGET', () => {
    const PAGE_CODE = 'some_page';
    const WIDGET_ID = 'sample_widget';
    const initialState = { configMap: { [PAGE_CODE]: PAGE_CONFIG } };

    describe('moving a widget to the same frame', () => {
      beforeEach(() => {
        state = reducer(
          initialState,
          setPageWidget(PAGE_CODE, WIDGET_ID, FULL_FRAME_INDEX, FULL_FRAME_INDEX),
        );
      });

      it('should do nothing', () => {
        expect(state.configMap).toEqual(initialState.configMap);
      });
    });

    describe('moving a widget to an empty frame', () => {
      beforeEach(() => {
        state = reducer(
          initialState,
          setPageWidget(PAGE_CODE, WIDGET_ID, FULL_FRAME_INDEX, EMPTY_FRAME_INDEX),
        );
      });

      it('the widget should be removed from its previous place', () => {
        expect(state.configMap[PAGE_CODE][FULL_FRAME_INDEX]).toBe(null);
      });

      it('the widget should be inserted to its new place', () => {
        expect(state.configMap[PAGE_CODE][EMPTY_FRAME_INDEX])
          .toEqual(initialState.configMap[PAGE_CODE][FULL_FRAME_INDEX]);
      });
    });

    describe('moving a widget to an already full frame', () => {
      beforeEach(() => {
        state = reducer(
          initialState,
          setPageWidget(PAGE_CODE, WIDGET_ID, undefined, FULL_FRAME_INDEX),
        );
      });

      it('the widget should be inserted to its new place', () => {
        expect(state.configMap[PAGE_CODE][FULL_FRAME_INDEX]).toEqual({
          code: WIDGET_ID,
          config: undefined,
        });
      });
    });

    describe('adding a new widget (no source frame)', () => {
      beforeEach(() => {
        state = reducer(
          initialState,
          setPageWidget(PAGE_CODE, WIDGET_ID, undefined, EMPTY_FRAME_INDEX),
        );
      });

      it('the widget should be inserted to its new place', () => {
        expect(state.configMap[PAGE_CODE][EMPTY_FRAME_INDEX]).toEqual({
          code: WIDGET_ID,
        });
      });
    });
  });

  describe('after action REMOVE_PAGE_WIDGET', () => {
    const PAGE_CODE = 'some_page';
    const initialState = { configMap: { [PAGE_CODE]: PAGE_CONFIG } };
    beforeEach(() => {
      state = reducer(
        initialState,
        removePageWidgetSync(PAGE_CODE, FULL_FRAME_INDEX),
      );
    });

    it('the widget should be removed from its previous place', () => {
      expect(state.configMap[PAGE_CODE][FULL_FRAME_INDEX]).toBe(null);
    });
  });
});
