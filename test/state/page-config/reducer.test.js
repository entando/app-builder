import { setContentToolbar, setSearchFilter, changeViewList } from 'state/page-config/actions';
import reducer from 'state/page-config/reducer';
import { WIDGET_LIST } from 'state/page-config/const';


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

    it('should define a viewList', () => {
      expect(state.viewList).toBeDefined();
      expect(typeof state.viewList).toBe('string');
    });

    describe('on action SET_CONTENT_TOOLBAR', () => {
      let newState;
      beforeEach(() => {
        newState = reducer(state, setContentToolbar(WIDGET_LIST));
      });

      it('state.content should be equal to WIDGET_LIST', () => {
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
    describe('on action SET_VIEW_LIST', () => {
      let newState;
      beforeEach(() => {
        newState = reducer(state, changeViewList('card'));
      });

      it('state.viewList should be equal to input vlaue', () => {
        expect(newState.viewList).toEqual('card');
      });
    });
  });
});
