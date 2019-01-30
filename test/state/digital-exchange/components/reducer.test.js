import { FILTER_OPERATORS } from '@entando/utils';
import reducer from 'state/digital-exchange/components/reducer';
import {
  setSelectedDEComponent,
  setDEComponents,
  setDEFilter,
  startComponentInstallation,
  finishComponentInstallation,
  failComponentInstallation,
} from 'state/digital-exchange/components/actions';
import {
  LIST_DE_COMPONENTS_OK,
  GET_DE_COMPONENT_OK,
} from 'test/mocks/digital-exchange/components';
import {
  DE_COMPONENTS_INSTALLATION_PROGRESS,
  DE_COMPONENTS_INSTALLATION_FAILURE,
} from 'state/digital-exchange/components/const';

describe('Digital Exchange components reducer', () => {
  describe('filter reducer', () => {
    it('should return an object', () => {
      expect(reducer()).toHaveProperty('filters', {});
    });

    it('should add filter (array)', () => {
      const initialState = reducer();
      const filterToSet = {
        formValues: { marketplace: ['marketplace1'] },
        operators: { marketplace: FILTER_OPERATORS.EQUAL },
      };
      const newState = reducer(initialState, setDEFilter(filterToSet, 'category1'));
      expect(newState).toHaveProperty('filters', {
        category1: {
          formValues: { marketplace: ['marketplace1'] },
          operators: { marketplace: FILTER_OPERATORS.EQUAL },
        },
      });
    });

    it('should add filter (number)', () => {
      const initialState = reducer();
      const filterToSet = {
        formValues: { rating: 2 },
        operators: { rating: FILTER_OPERATORS.GREATER_THAN },
      };
      const newState = reducer(initialState, setDEFilter(filterToSet, 'category1'));
      expect(newState).toHaveProperty('filters', {
        category1: {
          formValues: { rating: 2 },
          operators: { rating: FILTER_OPERATORS.GREATER_THAN },
        },
      });
    });

    it('should update filter (array)', () => {
      const initialState = {
        ...reducer(),
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
      expect(newState).toHaveProperty('filters', {
        category1: {
          formValues: { marketplace: ['marketplace1'] },
          operators: { marketplace: FILTER_OPERATORS.EQUAL },
        },
      });
    });

    it('should update filter (number)', () => {
      const initialState = {
        ...reducer(),
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
      expect(newState).toHaveProperty('filters', {
        category1: {
          formValues: { rating: 4 },
          operators: { rating: FILTER_OPERATORS.GREATER_THAN },
        },
      });
    });

    it('should remove a filter (array)', () => {
      const initialState = {
        ...reducer(),
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
      expect(newState).toHaveProperty('filters', {
        category1: {
          formValues: { otherProp: 'otherValue' },
          operators: { otherProp: FILTER_OPERATORS.EQUAL },
        },
      });
    });

    it('should remove a filter (number)', () => {
      const initialState = {
        ...reducer(),
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
      expect(newState).toHaveProperty('filters', {
        category1: {
          formValues: { marketplace: ['marketplace1'] },
          operators: { marketplace: FILTER_OPERATORS.EQUAL },
        },
      });
    });

    it('should remove last filter (array)', () => {
      const initialState = {
        ...reducer(),
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
      expect(newState).toHaveProperty('filters', {});
    });

    it('should remove last filter (number)', () => {
      const initialState = {
        ...reducer(),
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
      expect(newState).toHaveProperty('filters', {});
    });

    describe('should NOT process', () => {
      let filterToSet;
      const initialState = {
        ...reducer(),
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
    let state = reducer();

    it('should return an object', () => {
      expect(typeof state.list).toBe('object');
      expect(Array.isArray(state.list)).toBe(true);
    });

    describe('after action setDEcomponents', () => {
      it('should define component list', () => {
        state = reducer(state, setDEComponents(LIST_DE_COMPONENTS_OK));
        expect(state.list).toHaveLength(5);
      });
    });

    describe('after the finishComponentInstallation action', () => {
      it('should not update any component if no id is matching', () => {
        state = reducer(state, finishComponentInstallation('my-test'));
        expect(state.list).toHaveLength(5);
        expect(state).toHaveProperty('list', LIST_DE_COMPONENTS_OK);
      });

      it('should update the installed property of the matching component', () => {
        const componentId = LIST_DE_COMPONENTS_OK[2].id;
        expect(state.list).toHaveLength(5);
        expect(state.list[2]).toHaveProperty('installed', false);
        state = reducer(state, finishComponentInstallation(componentId));
        expect(state.list).toHaveLength(5);
        expect(state.list[2]).toHaveProperty('id', componentId);
        expect(state.list[2]).toHaveProperty('installed', true);
      });
    });
  });

  describe('installation reducer', () => {
    let state = reducer();

    it('should return an object', () => {
      expect(state).toHaveProperty('installation', {});
    });

    describe('after the startComponentInstallation action', () => {
      it('should return the object with another component id in it', () => {
        state = reducer(state, startComponentInstallation('test'));
        state = reducer(state, startComponentInstallation('test2'));
        expect(state).toHaveProperty('installation');
        expect(Object.keys(state.installation)).toHaveLength(2);
        expect(state).toHaveProperty('installation.test');
        expect(state).toHaveProperty('installation.test.state', DE_COMPONENTS_INSTALLATION_PROGRESS);
        expect(state).toHaveProperty('installation.test2');
        expect(state).toHaveProperty('installation.test2.state', DE_COMPONENTS_INSTALLATION_PROGRESS);
      });
    });

    describe('after the finishComponentInstallation action', () => {
      it('should remove the component object if one is found', () => {
        state = reducer(state, finishComponentInstallation('test2'));
        expect(state).toHaveProperty('installation');
        expect(Object.keys(state.installation)).toHaveLength(1);
        expect(state).not.toHaveProperty('installation.test2');
      });

      it('should not remove any component object if none is found', () => {
        state = reducer(state, finishComponentInstallation('testing'));
        expect(state).toHaveProperty('installation');
        expect(Object.keys(state.installation)).toHaveLength(1);
        expect(state).not.toHaveProperty('installation.testing');
      });
    });

    describe('after the failComponentInstallation action', () => {
      it('should update the state of the component', () => {
        state = reducer(state, failComponentInstallation('test'));
        expect(state).toHaveProperty('installation');
        expect(Object.keys(state.installation)).toHaveLength(1);
        expect(state).toHaveProperty('installation.test');
        expect(state).toHaveProperty('installation.test.state', DE_COMPONENTS_INSTALLATION_FAILURE);
      });
    });
  });
});
