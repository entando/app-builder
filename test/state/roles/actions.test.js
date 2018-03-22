import { isFSA } from 'flux-standard-action';
import { addRoles, fetchRoles } from 'state/roles/actions';
import { ADD_ROLES } from 'state/roles/types';
import { ROLES } from 'test/mocks/roles';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';


describe('state/groups/actions', () => {
  describe('addRoles', () => {
    let action;
    beforeEach(() => {
      action = addRoles(ROLES);
    });
    it('is FSA compliant', () => {
      expect(isFSA(action)).toBe(true);
    });
    it('is of type ADD_GROUPS', () => {
      expect(action.type).toBe(ADD_ROLES);
    });
    it('defines the "roles" property', () => {
      expect(action.payload.roles).toEqual(ROLES);
    });
  });

  describe('fetchGroups', () => {
    const mockStore = configureMockStore([thunk]);
    const store = mockStore({});

    it('calls addGroups action', (done) => {
      store.dispatch(fetchRoles()).then(() => {
        const actions = store.getActions();
        expect(actions[0].type).toEqual(ADD_ROLES);
        done();
      });
    });
  });
});
