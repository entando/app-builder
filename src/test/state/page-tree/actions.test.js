import {
  TOGGLE_PAGE_EXPANDED,
  SET_PAGE_LOADING,
  SET_PAGE_LOADED,
} from 'state/page-tree/types';

import {
  togglePageExpanded,
  setPageLoading,
  setPageLoaded,
} from 'state/page-tree/actions';

const PAGE_CODE = 'homepage';

describe('state/page-tree/actions', () => {
  describe('togglePageExpanded', () => {
    it('sets the correct type', () => {
      const action = togglePageExpanded(PAGE_CODE);
      expect(action.type).toBe(TOGGLE_PAGE_EXPANDED);
    });
    it('sets the correct payload', () => {
      const action = togglePageExpanded(PAGE_CODE);
      expect(action.payload).toEqual({ pageCode: PAGE_CODE });
    });
  });

  describe('setPageLoading', () => {
    it('sets the correct type', () => {
      const action = setPageLoading(PAGE_CODE, true);
      expect(action.type).toBe(SET_PAGE_LOADING);
    });
    it('sets the correct payload', () => {
      const action = setPageLoading(PAGE_CODE, true);
      expect(action.payload).toEqual({ pageCode: PAGE_CODE, loading: true });
    });
  });

  describe('setPageLoaded', () => {
    it('sets the correct type', () => {
      const action = setPageLoaded(PAGE_CODE, true);
      expect(action.type).toBe(SET_PAGE_LOADED);
    });
    it('sets the correct payload', () => {
      const action = setPageLoaded(PAGE_CODE, true);
      expect(action.payload).toEqual({ pageCode: PAGE_CODE, loaded: true });
    });
  });
});
