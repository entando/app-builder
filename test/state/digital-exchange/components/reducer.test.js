import reducer from 'state/digital-exchange/components/reducer';
import {
  setSelectedDEComponent,
  setDEComponents,
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
      expect(state.list instanceof Array).toBe(true);
    });

    describe('after action setDEcomponents', () => {
      it('should define component list', () => {
        const newState = reducer({}, setDEComponents(LIST_DE_COMPONENTS_OK));
        expect(newState.list).toHaveLength(4);
      });
    });
  });
});
