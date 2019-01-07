import { FILTER_OPERATORS } from '@entando/utils';
import reducer from 'state/digital-exchange/components/reducer';
import {
  setSelectedDEComponent,
  setDEComponents,
  setDEFilter,
} from 'state/digital-exchange/components/actions';
import {
  LIST_DE_COMPONENTS_OK,
  GET_DE_COMPONENT_OK,
} from 'test/mocks/digital-exchange/components';

describe('Digital Exchange components reducer', () => {
  describe('setFilter action', () => {
    it('should add filter (array)', () => {
      const initialState = {
        selected: {},
        list: [],
        componentListViewMode: '',
        filters: {},
      };
      const filterToSet = {
        formValues: { marketplace: ['marketplace1'] },
        operators: { marketplace: FILTER_OPERATORS.EQUAL },
      };
      const newState = reducer(initialState, setDEFilter(filterToSet, 'category1'));
      expect(newState).toEqual({
        selected: {},
        list: [],
        componentListViewMode: '',
        filters: {
          category1: {
            formValues: { marketplace: ['marketplace1'] },
            operators: { marketplace: FILTER_OPERATORS.EQUAL },
          },
        },
      });
    });

    it('should add filter (number)', () => {
      const initialState = {
        selected: {},
        list: [],
        componentListViewMode: '',
        filters: {},
      };
      const filterToSet = {
        formValues: { rating: 2 },
        operators: { rating: FILTER_OPERATORS.GREATER_THAN },
      };
      const newState = reducer(initialState, setDEFilter(filterToSet, 'category1'));
      expect(newState).toEqual({
        selected: {},
        list: [],
        componentListViewMode: '',
        filters: {
          category1: {
            formValues: { rating: 2 },
            operators: { rating: FILTER_OPERATORS.GREATER_THAN },
          },
        },
      });
    });

    it('should update filter (array)', () => {
      const initialState = {
        selected: {},
        list: [],
        componentListViewMode: '',
        filters: {
          category1: {
            formValues: { marketplace: ['marketplace2'] },
            operators: { marketplace: FILTER_OPERATORS.LIKE },
          },
        },
      };
      const filterToSet = {
        formValues: { marketplace: ['marketplace1'] },
        operators: { marketplace: FILTER_OPERATORS.EQUAL },
      };
      const newState = reducer(initialState, setDEFilter(filterToSet, 'category1'));
      expect(newState).toEqual({
        selected: {},
        list: [],
        componentListViewMode: '',
        filters: {
          category1: {
            formValues: { marketplace: ['marketplace1'] },
            operators: { marketplace: FILTER_OPERATORS.EQUAL },
          },
        },
      });
    });

    it('should update filter (number)', () => {
      const initialState = {
        selected: {},
        list: [],
        componentListViewMode: '',
        filters: {
          category1: {
            formValues: { rating: 2 },
            operators: { rating: FILTER_OPERATORS.GREATER_THAN },
          },
        },
      };
      const filterToSet = {
        formValues: { rating: 4 },
        operators: { rating: FILTER_OPERATORS.GREATER_THAN },
      };
      const newState = reducer(initialState, setDEFilter(filterToSet, 'category1'));
      expect(newState).toEqual({
        selected: {},
        list: [],
        componentListViewMode: '',
        filters: {
          category1: {
            formValues: { rating: 4 },
            operators: { rating: FILTER_OPERATORS.GREATER_THAN },
          },
        },
      });
    });

    it('should remove a filter (array)', () => {
      const initialState = {
        selected: {},
        list: [],
        componentListViewMode: '',
        filters: {
          category1: {
            formValues: { marketplace: ['marketplace1'], otherProp: 'otherValue' },
            operators: { marketplace: FILTER_OPERATORS.EQUAL, otherProp: FILTER_OPERATORS.EQUAL },
          },
        },
      };
      const filterToSet = {
        formValues: { marketplace: [] },
        operators: { marketplace: FILTER_OPERATORS.EQUAL },
      };
      const newState = reducer(initialState, setDEFilter(filterToSet, 'category1'));
      expect(newState).toEqual({
        selected: {},
        list: [],
        componentListViewMode: '',
        filters: {
          category1: {
            formValues: { otherProp: 'otherValue' },
            operators: { otherProp: FILTER_OPERATORS.EQUAL },
          },
        },
      });
    });

    it('should remove a filter (number)', () => {
      const initialState = {
        selected: {},
        list: [],
        componentListViewMode: '',
        filters: {
          category1: {
            formValues: { marketplace: ['marketplace1'], rating: 4 },
            operators: {
              marketplace: FILTER_OPERATORS.EQUAL,
              rating: FILTER_OPERATORS.GREATER_THAN,
            },
          },
        },
      };
      const filterToSet = {
        formValues: { rating: null },
        operators: { rating: FILTER_OPERATORS.GREATER_THAN },
      };
      const newState = reducer(initialState, setDEFilter(filterToSet, 'category1'));
      expect(newState).toEqual({
        selected: {},
        list: [],
        componentListViewMode: '',
        filters: {
          category1: {
            formValues: { marketplace: ['marketplace1'] },
            operators: { marketplace: FILTER_OPERATORS.EQUAL },
          },
        },
      });
    });

    it('should remove last filter (array)', () => {
      const initialState = {
        selected: {},
        list: [],
        componentListViewMode: '',
        filters: {
          category1: {
            formValues: { marketplace: ['marketplace1'] },
            operators: { marketplace: FILTER_OPERATORS.EQUAL },
          },
        },
      };
      const filterToSet = {
        formValues: { marketplace: [] },
        operators: { marketplace: FILTER_OPERATORS.EQUAL },
      };
      const newState = reducer(initialState, setDEFilter(filterToSet, 'category1'));
      expect(newState).toEqual({
        selected: {},
        list: [],
        componentListViewMode: '',
        filters: {},
      });
    });

    it('should remove last filter (number)', () => {
      const initialState = {
        selected: {},
        list: [],
        componentListViewMode: '',
        filters: {
          category1: {
            formValues: { rating: 4 },
            operators: { rating: FILTER_OPERATORS.GREATER_THAN },
          },
        },
      };
      const filterToSet = {
        formValues: { rating: null },
        operators: { rating: FILTER_OPERATORS.GREATER_THAN },
      };
      const newState = reducer(initialState, setDEFilter(filterToSet, 'category1'));
      expect(newState).toEqual({
        selected: {},
        list: [],
        componentListViewMode: '',
        filters: {},
      });
    });
  });

  describe('should NOT process', () => {
    let filterToSet;
    const initialState = {
      selected: {},
      list: [],
      componentListViewMode: '',
      filters: {
        category1: {
          formValues: { marketplace: ['marketplace'] },
          operators: { marketplace: FILTER_OPERATORS.EQUAL },
        },
      },
    };

    it('null filter', () => {
      filterToSet = null;
      const newState = reducer(initialState, setDEFilter(filterToSet, 'category1'));
      expect(newState).toEqual(initialState);
    });

    it('incomplete filter 1', () => {
      filterToSet = { wrongProp: 'wrongValue' };
      const newState = reducer(initialState, setDEFilter(filterToSet, 'category1'));
      expect(newState).toEqual(initialState);
    });

    it('incomplete filter 2', () => {
      filterToSet = {
        formValues: { marketplace: ['marketplace'] },
      };
      const newState = reducer(initialState, setDEFilter(filterToSet, 'category1'));
      expect(newState).toEqual(initialState);
    });

    it('incomplete filter 3', () => {
      filterToSet = {
        operators: { marketplace: FILTER_OPERATORS.EQUAL },
      };
      const newState = reducer(initialState, setDEFilter(filterToSet, 'category1'));
      expect(newState).toEqual(initialState);
    });

    it('already existing filter', () => {
      filterToSet = {
        formValues: { marketplace: ['marketplace'] },
        operators: { marketplace: FILTER_OPERATORS.EQUAL },
      };
      const newState = reducer(initialState, setDEFilter(filterToSet, 'category1'));
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
