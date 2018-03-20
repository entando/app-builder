import { isFSA } from 'flux-standard-action';
import { setGroups, fetchGroups } from 'state/groups/actions';
import { SET_GROUPS } from 'state/groups/types';
import { GROUPS_OK_PAGE_1 } from 'test/mocks/groups';
import { SET_PAGE } from 'state/pagination/types';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';


describe('state/groups/actions', () => {
  describe('setGroups', () => {
    let action;
    beforeEach(() => {
      action = setGroups(GROUPS_OK_PAGE_1.payload);
    });

    it('is FSA compliant', () => {
      expect(isFSA(action)).toBe(true);
    });

    it('is of type SET_GROUPS', () => {
      expect(action.type).toBe(SET_GROUPS);
    });

    it('defines the "groups" property', () => {
      expect(action.payload.groups).toBeDefined();
    });
  });

  describe('fetchGroups', () => {
    const mockStore = configureMockStore([thunk]);
    const store = mockStore({});

    it('fetchGroups calls setGroups and setPage actions', (done) => {
      store.dispatch(fetchGroups()).then(() => {
        const actions = store.getActions();
        expect(actions).toHaveLength(2);
        expect(actions[0].type).toEqual(SET_GROUPS);
        expect(actions[1].type).toEqual(SET_PAGE);
        done();
      });
    });

    it('groups is defined and properly valued', (done) => {
      store.dispatch(fetchGroups()).then(() => {
        const actionPayload = store.getActions()[0].payload;
        expect(actionPayload.groups).toHaveLength(5);
        const user = actionPayload.groups[0];
        expect(user).toHaveProperty('code', 'account_executive');
        expect(user).toHaveProperty('name', 'Account Executive');
        done();
      });
    });
  });
});
