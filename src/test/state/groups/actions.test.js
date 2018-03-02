import { isFSA } from 'flux-standard-action';
import { addGroups, fetchGroups } from 'state/groups/actions';
import { ADD_GROUPS } from 'state/groups/types';
import { GROUPS } from 'test/mocks/groups';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';


describe('state/groups/actions', () => {
  describe('addGroups', () => {
    let action;
    beforeEach(() => {
      action = addGroups(GROUPS);
    });
    it('is FSA compliant', () => {
      expect(isFSA(action)).toBe(true);
    });
    it('is of type ADD_GROUPS', () => {
      expect(action.type).toBe(ADD_GROUPS);
    });
    it('defines the "groups" property', () => {
      expect(action.payload.groups).toEqual(GROUPS);
    });
  });

  describe('fetchGroups', () => {
    const mockStore = configureMockStore([thunk]);
    const store = mockStore({});

    it('calls addGroups action', (done) => {
      store.dispatch(fetchGroups()).then(() => {
        const actions = store.getActions();
        expect(actions[0].type).toEqual(ADD_GROUPS);
        done();
      });
    });
  });
});
