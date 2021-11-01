import reducer from 'state/component-repository/hub/reducer';
import {
  setSelectedComponentRepository,
  setComponentRepositories,
  removeComponentRepository,
} from 'state/component-repository/component-repositories/actions';
import {
  LIST_COMPONENT_REPOSITORIES_OK,
  COMPONENT_REPOSITORY_OK,
} from 'test/mocks/component-repository/componentRepositories';


describe('component-repository/hub/reducer', () => {
  const state = reducer();

  it('should return an object', () => {
    expect(typeof state).toBe('object');
  });

  describe('after action setSelectedComponentRepository', () => {
    let newState;
    beforeEach(() => {
      newState = reducer(state, setSelectedComponentRepository(COMPONENT_REPOSITORY_OK));
    });

    it('should define the ComponentRepository payload', () => {
      expect(newState).toHaveProperty('selected', COMPONENT_REPOSITORY_OK);
    });

    describe('after action removeComponentRepository', () => {
      it('should not remove the component repository if the ID does not match', () => {
        newState = reducer(newState, removeComponentRepository('madeup'));
        expect(newState).toHaveProperty('selected', COMPONENT_REPOSITORY_OK);
      });

      it('should remove the component repository if the ID matches', () => {
        newState = reducer(newState, removeComponentRepository(COMPONENT_REPOSITORY_OK.id));
        expect(newState).toHaveProperty('selected', {});
      });
    });
  });

  describe('list reducer', () => {
    it('should return an object', () => {
      expect(typeof state.list).toBe('object');
      expect(state.list instanceof Array).toBe(true);
    });

    describe('after action setComponentRepositories', () => {
      let newState;

      it('should define component repository list', () => {
        newState = reducer({}, setComponentRepositories(LIST_COMPONENT_REPOSITORIES_OK));
        expect(newState.list).toHaveLength(3);
      });

      describe('after action removeComponentRepository', () => {
        it('should not remove the component repository if the ID does not match', () => {
          newState = reducer(newState, removeComponentRepository('madeup'));
          expect(newState.list).toHaveLength(3);
          expect(newState.list[0]).toHaveProperty('id', 'entando');
          expect(newState.list[1]).toHaveProperty('id', 'redhat');
          expect(newState.list[2]).toHaveProperty('id', 'leonardo');
        });

        it('should remove the component repository if the ID matches', () => {
          newState = reducer(newState, removeComponentRepository('redhat'));
          expect(newState.list).toHaveLength(2);
          expect(newState.list[0]).toHaveProperty('id', 'entando');
          expect(newState.list[1]).toHaveProperty('id', 'leonardo');
        });
      });
    });
  });
});
