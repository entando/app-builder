import { FILTER_OPERATORS } from '@entando/utils';
import reducer from 'state/digital-exchange/components/reducer';
import {
  setSelectedDEComponent,
  setDEComponents,
  addDEFilter,
  removeDEFilter,
} from 'state/digital-exchange/components/actions';
import {
  LIST_DE_COMPONENTS_OK,
  GET_DE_COMPONENT_OK,
} from 'test/mocks/digital-exchange/components';

describe('Digital Exchange components reducer', () => {
  describe('should add', () => {
    it('first filter', () => {
      const initialState = {
        selected: {},
        list: [],
        componentListViewMode: '',
        filters: {},
      };
      const filterToAdd = {
        formValues: { type: ['category1'] },
        operators: { type: FILTER_OPERATORS.EQUAL },
      };
      const newState = reducer(initialState, addDEFilter(filterToAdd));
      expect(newState).toEqual({
        selected: {},
        list: [],
        componentListViewMode: '',
        filters: {
          formValues: { type: ['category1'] },
          operators: { type: FILTER_OPERATORS.EQUAL },
        },
      });
    });

    it('first filter with a given key', () => {
      const initialState = {
        selected: {},
        list: [],
        componentListViewMode: '',
        filters: {
          formValues: { otherProp: ['value1', 'value2'] },
          operators: { otherProp: FILTER_OPERATORS.LIKE },
        },
      };
      const filterToAdd = {
        formValues: { type: ['category1'] },
        operators: { type: FILTER_OPERATORS.EQUAL },
      };
      const newState = reducer(initialState, addDEFilter(filterToAdd));
      expect(newState).toEqual({
        selected: {},
        list: [],
        componentListViewMode: '',
        filters: {
          formValues: { type: ['category1'], otherProp: ['value1', 'value2'] },
          operators: { type: FILTER_OPERATORS.EQUAL, otherProp: FILTER_OPERATORS.LIKE },
        },
      });
    });

    it('a filter with an existing key', () => {
      const initialState = {
        selected: {},
        list: [],
        componentListViewMode: '',
        filters: {
          formValues: { type: ['category1'] },
          operators: { type: FILTER_OPERATORS.EQUAL },
        },
      };
      const filterToAdd = {
        formValues: { type: ['category2'] },
        operators: { type: FILTER_OPERATORS.EQUAL },
      };
      const newState = reducer(initialState, addDEFilter(filterToAdd));
      expect(newState).toEqual({
        selected: {},
        list: [],
        componentListViewMode: '',
        filters: {
          formValues: { type: ['category1', 'category2'] },
          operators: { type: FILTER_OPERATORS.EQUAL },
        },
      });
    });

    it('filter with unmatching operator (overwrite)', () => {
      const initialState = {
        selected: {},
        list: [],
        componentListViewMode: '',
        filters: {
          formValues: { type: ['category1'] },
          operators: { type: FILTER_OPERATORS.EQUAL },
        },
      };
      const filterToAdd = {
        formValues: { type: ['category2'] },
        operators: { type: FILTER_OPERATORS.LIKE },
      };
      const newState = reducer(initialState, addDEFilter(filterToAdd));
      expect(newState).toEqual({
        selected: {},
        list: [],
        componentListViewMode: '',
        filters: {
          formValues: { type: ['category2'] },
          operators: { type: FILTER_OPERATORS.LIKE },
        },
      });
    });
  });

  describe('should NOT add', () => {
    let filterToAdd;
    const initialState = {
      selected: {},
      list: [],
      componentListViewMode: '',
      filters: {
        formValues: { type: ['category1'] },
        operators: { type: FILTER_OPERATORS.EQUAL },
      },
    };

    it('null filter', () => {
      filterToAdd = null;
      const newState = reducer(initialState, addDEFilter(filterToAdd));
      expect(newState).toEqual(initialState);
    });

    it('incomplete filter 1', () => {
      filterToAdd = { otherProp: 'wrongValue' };
      const newState = reducer(initialState, addDEFilter(filterToAdd));
      expect(newState).toEqual(initialState);
    });

    it('incomplete filter 2', () => {
      filterToAdd = {
        formValues: { type: ['category2'] },
      };
      const newState = reducer(initialState, addDEFilter(filterToAdd));
      expect(newState).toEqual(initialState);
    });

    it('incomplete filter 3', () => {
      filterToAdd = {
        operators: { type: FILTER_OPERATORS.EQUAL },
      };
      const newState = reducer(initialState, addDEFilter(filterToAdd));
      expect(newState).toEqual(initialState);
    });

    it('already existing filter', () => {
      filterToAdd = {
        formValues: { type: ['category1'] },
        operators: { type: FILTER_OPERATORS.EQUAL },
      };
      const newState = reducer(initialState, addDEFilter(filterToAdd));
      expect(newState).toEqual(initialState);
    });
  });

  describe('should remove', () => {
    it('a filter with a given key', () => {
      const initialState = {
        selected: {},
        list: [],
        componentListViewMode: '',
        filters: {
          formValues: { type: ['category1', 'category2'] },
          operators: { type: FILTER_OPERATORS.EQUAL },
        },
      };
      const filterToRemove = {
        formValues: { type: ['category1'] },
        operators: { type: FILTER_OPERATORS.EQUAL },
      };
      const newState = reducer(initialState, removeDEFilter(filterToRemove));
      expect(newState).toEqual({
        selected: {},
        list: [],
        componentListViewMode: '',
        filters: {
          formValues: { type: ['category2'] },
          operators: { type: FILTER_OPERATORS.EQUAL },
        },
      });
    });

    it('last filter with a given key', () => {
      const initialState = {
        selected: {},
        list: [],
        componentListViewMode: '',
        filters: {
          formValues: { type: ['category1'], otherProp: ['value1', 'value2'] },
          operators: { type: FILTER_OPERATORS.EQUAL, otherProp: FILTER_OPERATORS.LIKE },
        },
      };
      const filterToRemove = {
        formValues: { type: ['category1'] },
        operators: { type: FILTER_OPERATORS.EQUAL },
      };
      const newState = reducer(initialState, removeDEFilter(filterToRemove));
      expect(newState).toEqual({
        selected: {},
        list: [],
        componentListViewMode: '',
        filters: {
          formValues: { otherProp: ['value1', 'value2'] },
          operators: { otherProp: FILTER_OPERATORS.LIKE },
        },
      });
    });

    it('last filter', () => {
      const initialState = {
        selected: {},
        list: [],
        componentListViewMode: '',
        filters: {
          formValues: { type: ['category1'] },
          operators: { type: FILTER_OPERATORS.EQUAL },
        },
      };
      const filterToRemove = {
        formValues: { type: ['category1'] },
        operators: { type: FILTER_OPERATORS.EQUAL },
      };
      const newState = reducer(initialState, removeDEFilter(filterToRemove));
      expect(newState).toEqual({
        selected: {},
        list: [],
        componentListViewMode: '',
        filters: {},
      });
    });
  });

  describe('should NOT remove', () => {
    let filterToRemove;
    const initialState = {
      selected: {},
      list: [],
      componentListViewMode: '',
      filters: {
        formValues: { type: ['category1', 'category2'] },
        operators: { type: FILTER_OPERATORS.EQUAL },
      },
    };

    it('null filter', () => {
      filterToRemove = null;
      const newState = reducer(initialState, removeDEFilter(filterToRemove));
      expect(newState).toEqual(initialState);
    });

    it('unmatching and incomplete filter', () => {
      filterToRemove = { otherProp: 'wrongValue' };
      const newState = reducer(initialState, removeDEFilter(filterToRemove));
      expect(newState).toEqual(initialState);
    });

    it('incomplete filter', () => {
      filterToRemove = {
        formValues: { type: ['category1'] },
      };
      const newState = reducer(initialState, removeDEFilter(filterToRemove));
      expect(newState).toEqual(initialState);
    });

    it('unmatching filter 1', () => {
      filterToRemove = {
        formValues: { otherProp: ['category1'] },
        operators: { otherProp: FILTER_OPERATORS.EQUAL },
      };
      const newState = reducer(initialState, removeDEFilter(filterToRemove));
      expect(newState).toEqual(initialState);
    });

    it('unmatching filter 2', () => {
      filterToRemove = {
        formValues: { type: ['category1'] },
        operators: { type: FILTER_OPERATORS.LIKE },
      };
      const newState = reducer(initialState, removeDEFilter(filterToRemove));
      expect(newState).toEqual(initialState);
    });
  });

  describe('after action setSelectedDEComponent', () => {
    const state = reducer();
    let newState;

    beforeEach(() => {
      newState = reducer(state, setSelectedDEComponent(GET_DE_COMPONENT_OK));
    });

    it('should define the component payload', () => {
      expect(newState).toHaveProperty('selected', GET_DE_COMPONENT_OK);
    });
  });

  describe('list reducer', () => {
    const state = reducer();

    it('should return an object', () => {
      expect(typeof state.list).toBe('object');
      expect(Array.isArray(state.list)).toBe(true);
    });

    describe('after action setDEcomponents', () => {
      it('should define component list', () => {
        const newState = reducer({}, setDEComponents(LIST_DE_COMPONENTS_OK));
        expect(newState.list).toHaveLength(5);
      });
    });
  });
});
