import reducer from 'state/content-template/reducer';
import {
  setContentTemplateList,
  setSearchKeyword,
  setListFilterProps,
} from 'state/content-template/actions';

describe('state/locale/reducer', () => {
  it('should return an object', () => {
    const state = reducer();
    expect(typeof state).toBe('object');
  });

  describe('after action SET_CONTENT_TEMPLATES', () => {
    let state;
    beforeEach(() => {
      state = reducer({ list: [], opened: {} }, setContentTemplateList(['a', 'b']));
    });

    it('list should not be empty', () => {
      expect(state).toHaveProperty('list');
      expect(state.list).toHaveLength(2);
    });

    it('filters exists', () => {
      state = reducer(state, setSearchKeyword('lator'));
      const pp = { out: 1 };
      state = reducer(state, setListFilterProps(pp));
      expect(state).toHaveProperty('filters');
      expect(state.filters).toHaveProperty('filterProps');
      expect(state.filters).toHaveProperty('attribute');
      expect(state.filters).toHaveProperty('keyword');
      expect(state.filters.keyword).toEqual('lator');
      expect(state.filters.filterProps).toEqual(pp);
    });
  });
});
