import { FILTER_OPERATORS } from '@entando/utils';
import reducer from 'state/digital-exchange/components/reducer';
import {
  setSelectedDEComponent,
  setDEComponents,
  removeDEFilter,
} from 'state/digital-exchange/components/actions';
import {
  LIST_DE_COMPONENTS_OK,
  GET_DE_COMPONENT_OK,
} from 'test/mocks/digital-exchange/components';

describe('digital-exchange/components/reducer', () => {
  const state = reducer();

  it('should return an object', () => {
    expect(typeof state).toBe('object');
  });

  it('should remove filter 1', () => {
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

  it('should remove filter 2', () => {
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

  it('should remove filter 3', () => {
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

  describe('after action setSelectedDEComponent', () => {
    let newState;
    beforeEach(() => {
      newState = reducer(state, setSelectedDEComponent(GET_DE_COMPONENT_OK));
    });

    it('should define the component payload', () => {
      expect(newState).toHaveProperty('selected', GET_DE_COMPONENT_OK);
    });
  });

  describe('list reducer', () => {
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
