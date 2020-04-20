import { FILTER_OPERATORS } from '@entando/utils';
import reducer from 'state/component-repository/components/reducer';
import {
  setSelectedECRComponent,
  setECRComponents,
  setECRFilter,
  startComponentInstallation,
  finishComponentInstallation,
  startComponentUninstall,
  finishComponentUninstall,
} from 'state/component-repository/components/actions';
import {
  LIST_ECR_COMPONENTS_OK,
  GET_ECR_COMPONENT_OK,
} from 'test/mocks/component-repository/components';
import {
  ECR_COMPONENT_INSTALLATION_STATUS_IN_PROGRESS,
} from 'state/component-repository/components/const';

describe('Component repository reducer', () => {
  describe('filter reducer', () => {
    it('should return an object', () => {
      expect(reducer()).toHaveProperty('filters', {});
    });

    it('should add filter (array)', () => {
      const initialState = reducer();
      const filterToSet = {
        formValues: { componentRepositories: ['ComponentRepository1'] },
        operators: { componentRepositories: FILTER_OPERATORS.EQUAL },
      };
      const newState = reducer(initialState, setECRFilter(filterToSet, 'category1'));
      expect(newState).toHaveProperty('filters', {
        category1: {
          formValues: { componentRepositories: ['ComponentRepository1'] },
          operators: { componentRepositories: FILTER_OPERATORS.EQUAL },
        },
      });
    });

    it('should add filter (number)', () => {
      const initialState = reducer();
      const filterToSet = {
        formValues: { rating: 2 },
        operators: { rating: FILTER_OPERATORS.GREATER_THAN },
      };
      const newState = reducer(initialState, setECRFilter(filterToSet, 'category1'));
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
            formValues: { componentRepositories: ['ComponentRepository2'] },
            operators: { componentRepositories: FILTER_OPERATORS.LIKE },
          },
        },
      };
      const filterToSet = {
        formValues: { componentRepositories: ['ComponentRepository1'] },
        operators: { componentRepositories: FILTER_OPERATORS.EQUAL },
      };
      const newState = reducer(initialState, setECRFilter(filterToSet, 'category1'));
      expect(newState).toHaveProperty('filters', {
        category1: {
          formValues: { componentRepositories: ['ComponentRepository1'] },
          operators: { componentRepositories: FILTER_OPERATORS.EQUAL },
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
      const newState = reducer(initialState, setECRFilter(filterToSet, 'category1'));
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
            formValues: { componentRepositories: ['ComponentRepository1'], otherProp: 'otherValue' },
            operators: { componentRepositories: FILTER_OPERATORS.EQUAL, otherProp: FILTER_OPERATORS.EQUAL },
          },
        },
      };
      const filterToSet = {
        formValues: { componentRepositories: [] },
        operators: { componentRepositories: FILTER_OPERATORS.EQUAL },
      };
      const newState = reducer(initialState, setECRFilter(filterToSet, 'category1'));
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
            formValues: { componentRepositories: ['ComponentRepository1'], rating: 4 },
            operators: {
              componentRepositories: FILTER_OPERATORS.EQUAL,
              rating: FILTER_OPERATORS.GREATER_THAN,
            },
          },
        },
      };
      const filterToSet = {
        formValues: { rating: null },
        operators: { rating: FILTER_OPERATORS.GREATER_THAN },
      };
      const newState = reducer(initialState, setECRFilter(filterToSet, 'category1'));
      expect(newState).toHaveProperty('filters', {
        category1: {
          formValues: { componentRepositories: ['ComponentRepository1'] },
          operators: { componentRepositories: FILTER_OPERATORS.EQUAL },
        },
      });
    });

    it('should remove last filter (array)', () => {
      const initialState = {
        ...reducer(),
        filters: {
          category1: {
            formValues: { componentRepositories: ['ComponentRepository1'] },
            operators: { componentRepositories: FILTER_OPERATORS.EQUAL },
          },
        },
      };
      const filterToSet = {
        formValues: { componentRepositories: [] },
        operators: { componentRepositories: FILTER_OPERATORS.EQUAL },
      };
      const newState = reducer(initialState, setECRFilter(filterToSet, 'category1'));
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
      const newState = reducer(initialState, setECRFilter(filterToSet, 'category1'));
      expect(newState).toHaveProperty('filters', {});
    });

    describe('should NOT process', () => {
      let filterToSet;
      const initialState = {
        ...reducer(),
        filters: {
          category1: {
            formValues: { componentRepositories: ['ComponentRepository'] },
            operators: { componentRepositories: FILTER_OPERATORS.EQUAL },
          },
        },
      };

      it('null filter', () => {
        filterToSet = null;
        const newState = reducer(initialState, setECRFilter(filterToSet, 'category1'));
        expect(newState).toEqual(initialState);
      });

      it('incomplete filter 1', () => {
        filterToSet = { wrongProp: 'wrongValue' };
        const newState = reducer(initialState, setECRFilter(filterToSet, 'category1'));
        expect(newState).toEqual(initialState);
      });

      it('incomplete filter 2', () => {
        filterToSet = {
          formValues: { componentRepositories: ['ComponentRepository'] },
        };
        const newState = reducer(initialState, setECRFilter(filterToSet, 'category1'));
        expect(newState).toEqual(initialState);
      });

      it('incomplete filter 3', () => {
        filterToSet = {
          operators: { componentRepositories: FILTER_OPERATORS.EQUAL },
        };
        const newState = reducer(initialState, setECRFilter(filterToSet, 'category1'));
        expect(newState).toEqual(initialState);
      });

      it('already existing filter', () => {
        filterToSet = {
          formValues: { componentRepositories: ['ComponentRepository'] },
          operators: { componentRepositories: FILTER_OPERATORS.EQUAL },
        };
        const newState = reducer(initialState, setECRFilter(filterToSet, 'category1'));
        expect(newState).toEqual(initialState);
      });
    });
  });

  describe('after action setSelectedECRComponent', () => {
    const state = reducer();
    let newState;

    beforeEach(() => {
      newState = reducer(state, setSelectedECRComponent(GET_ECR_COMPONENT_OK));
    });

    it('should define the component payload', () => {
      expect(newState).toHaveProperty('selected', GET_ECR_COMPONENT_OK);
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
        state = reducer(state, setECRComponents(LIST_ECR_COMPONENTS_OK));
        expect(state.list).toHaveLength(5);
      });
    });

    describe('after the finishComponentInstallation action', () => {
      it('should not update any component if no id is matching', () => {
        state = reducer(state, finishComponentInstallation('my-test'));
        expect(state.list).toHaveLength(5);
        expect(state).toHaveProperty('list', LIST_ECR_COMPONENTS_OK);
      });

      it('should update the installed property of the matching component', () => {
        const componentId = LIST_ECR_COMPONENTS_OK[2].id;
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
        expect(state).toHaveProperty('installation.test', ECR_COMPONENT_INSTALLATION_STATUS_IN_PROGRESS);
        expect(state).toHaveProperty('installation.test2');
        expect(state).toHaveProperty('installation.test2', ECR_COMPONENT_INSTALLATION_STATUS_IN_PROGRESS);
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
  });
});

describe('uninstallation reducer', () => {
  let state = reducer();

  it('should return an object', () => {
    expect(state).toHaveProperty('uninstallation', {});
  });

  describe('after the startComponentUninstall action', () => {
    it('should return the object with another component id in it', () => {
      state = reducer(state, startComponentUninstall('test3'));
      state = reducer(state, startComponentUninstall('test4'));
      expect(state).toHaveProperty('uninstallation');
      expect(Object.keys(state.uninstallation)).toHaveLength(2);
      expect(state).toHaveProperty('uninstallation.test3');
      expect(state).toHaveProperty('uninstallation.test3', ECR_COMPONENT_INSTALLATION_STATUS_IN_PROGRESS);
      expect(state).toHaveProperty('uninstallation.test4');
      expect(state).toHaveProperty('uninstallation.test4', ECR_COMPONENT_INSTALLATION_STATUS_IN_PROGRESS);
    });
  });

  describe('after the finishComponentUninstall action', () => {
    it('should remove the component object if one is found', () => {
      state = reducer(state, finishComponentUninstall('test3'));
      expect(state).toHaveProperty('uninstallation');
      expect(Object.keys(state.uninstallation)).toHaveLength(1);
      expect(state).not.toHaveProperty('uninstallation.test3');
    });

    it('should not remove any component object if none is found', () => {
      state = reducer(state, finishComponentUninstall('testing'));
      expect(state).toHaveProperty('uninstallation');
      expect(Object.keys(state.uninstallation)).toHaveLength(1);
      expect(state).not.toHaveProperty('uninstallation.testing');
    });
  });
});
