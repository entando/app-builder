import reducer from 'state/page-tree/reducer';


import {
  togglePageExpanded,
  setPageLoading,
  setPageLoaded,
} from 'state/page-tree/actions';

const PAGE_CODE = 'homepage';

describe('state/page-tree/reducer', () => {
  it('should return an empty object as default', () => {
    const state = reducer();
    expect(typeof state).toBe('object');
    expect(Object.keys(state).length).toBe(0);
  });

  describe('on action TOGGLE_PAGE_EXPANDED', () => {
    it('toggles the "expanded" flag on the page', () => {
      const state = reducer(undefined, togglePageExpanded(PAGE_CODE));
      expect(state[PAGE_CODE].expanded).toBe(true);

      const state2 = reducer(state, togglePageExpanded(PAGE_CODE));
      expect(state2[PAGE_CODE].expanded).toBe(false);
    });
  });

  describe('on action SET_PAGE_LOADING', () => {
    it('toggles the "loading" flag on the page', () => {
      const state = reducer(undefined, setPageLoading(PAGE_CODE, true));
      expect(state[PAGE_CODE].loading).toBe(true);

      const state2 = reducer(state, setPageLoading(PAGE_CODE, false));
      expect(state2[PAGE_CODE].loading).toBe(false);
    });
  });

  describe('on action SET_PAGE_LOADED', () => {
    it('toggles the "loaded" flag on the page', () => {
      const state = reducer(undefined, setPageLoaded(PAGE_CODE, true));
      expect(state[PAGE_CODE].loaded).toBe(true);

      const state2 = reducer(state, setPageLoaded(PAGE_CODE, false));
      expect(state2[PAGE_CODE].loaded).toBe(false);
    });
  });
});
