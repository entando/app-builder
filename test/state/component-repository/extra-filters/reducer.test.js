import reducer from 'state/component-repository/extra-filters/reducer';
import {
  setSelectedECRExtraFilter,
  setECRExtraFilters,
} from 'state/component-repository/extra-filters/actions';

import { ECR_COMPONENTS_EXTRA_FILTERS } from 'state/component-repository/extra-filters/const';

describe('component-repository/extra-filters/reducer', () => {
  const state = reducer();

  it('should return an object', () => {
    expect(typeof state).toBe('object');
  });

  describe('after action setSelectedECRExtraFilter', () => {
    let newState;
    beforeEach(() => {
      newState = reducer(state, setSelectedECRExtraFilter('explore'));
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

    describe('after action setECRExtraFilters', () => {
      it('should define extra filter list', () => {
        const newState = reducer({}, setECRExtraFilters(Object.keys(ECR_COMPONENTS_EXTRA_FILTERS)));
        expect(newState.list).toHaveLength(4);
      });
    });
  });
});
