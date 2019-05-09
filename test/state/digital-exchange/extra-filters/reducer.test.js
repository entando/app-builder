import reducer from 'state/digital-exchange/extra-filters/reducer';
import {
  setSelectedDEExtraFilter,
  setDEExtraFilters,
} from 'state/digital-exchange/extra-filters/actions';

import { DE_COMPONENTS_EXTRA_FILTERS } from 'state/digital-exchange/extra-filters/const';

describe('digital-exchange/extra-filters/reducer', () => {
  const state = reducer();

  it('should return an object', () => {
    expect(typeof state).toBe('object');
  });

  describe('after action setSelectedDEExtraFilter', () => {
    let newState;
    beforeEach(() => {
      newState = reducer(state, setSelectedDEExtraFilter('explore'));
    });

    it('should define the extra filter payload', () => {
      expect(newState).toHaveProperty('selected', 'explore');
    });
  });

  describe('list reducer', () => {
    it('should return an object', () => {
      expect(typeof state.list).toBe('object');
      expect(state.list instanceof Array).toBe(true);
    });

    describe('after action setDEExtraFilters', () => {
      it('should define extra filter list', () => {
        const newState = reducer({}, setDEExtraFilters(Object.keys(DE_COMPONENTS_EXTRA_FILTERS)));
        expect(newState.list).toHaveLength(4);
      });
    });
  });
});
