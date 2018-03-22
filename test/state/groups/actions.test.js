import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { gotoRoute } from 'frontend-common-components';

import { setGroups, fetchGroups, sendPostGroup } from 'state/groups/actions';
import { config } from 'api/apiManager';
import { LIST_GROUPS_OK, BODY_OK } from 'test/mocks/groups';
import { SET_GROUPS } from 'state/groups/types';
import { SET_PAGE } from 'state/pagination/types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

config(mockStore({ api: { useMocks: true }, currentUser: { token: 'test_token' } }));
jest.unmock('api/groups');

const INITIAL_STATE = {
  form: {},
  groups: {
    list: [],
    map: {},
  },
};

describe('state/groups/actions', () => {
  let store;

  beforeEach(() => {
    store = mockStore(INITIAL_STATE);
  });

  describe('setGroups', () => {
    it('test setGroups action sets the correct type', () => {
      const action = setGroups(LIST_GROUPS_OK);
      expect(action.type).toEqual(SET_GROUPS);
    });
  });

  describe('fetchGroups', () => {
    it('fetchGroups calls setGroups and setPage actions', (done) => {
      store.dispatch(fetchGroups()).then(() => {
        const actions = store.getActions();
        expect(actions).toHaveLength(2);
        expect(actions[0].type).toEqual(SET_GROUPS);
        expect(actions[1].type).toEqual(SET_PAGE);
        done();
      });
    });

    it('group is defined and properly valued', (done) => {
      store.dispatch(fetchGroups()).then(() => {
        const actionPayload = store.getActions()[0].payload;
        expect(actionPayload.groups).toHaveLength(10);
        const group = actionPayload.groups[0];
        expect(group).toHaveProperty('code', 'account_executive');
        expect(group).toHaveProperty('name');
        done();
      });
    });

    it('groups page two is retrieved correctly and properly valued', (done) => {
      store.dispatch(fetchGroups({ page: 2, pageSize: 2 })).then(() => {
        const actionPayload = store.getActions()[0].payload;
        expect(actionPayload.groups).toHaveLength(2);
        expect(actionPayload.groups[0]).toHaveProperty('code', 'bpm_admin');
        expect(actionPayload.groups[1]).toHaveProperty('code', 'bpm_appraiser');
        done();
      });
    });

    it('page is defined and properly valued', (done) => {
      store.dispatch(fetchGroups()).then(() => {
        const actionPayload = store.getActions()[1].payload.page;
        expect(actionPayload).toHaveProperty('page', 1);
        expect(actionPayload).toHaveProperty('pageSize', 10);
        expect(actionPayload).toHaveProperty('lastPage', 1);
        expect(actionPayload).toHaveProperty('totalItems', 10);
        done();
      });
    });

    it('page 2 is defined and properly valued', (done) => {
      store.dispatch(fetchGroups({ page: 2, pageSize: 2 })).then(() => {
        const actionPayload = store.getActions()[1].payload.page;
        expect(actionPayload).toHaveProperty('page', 2);
        expect(actionPayload).toHaveProperty('pageSize', 2);
        expect(actionPayload).toHaveProperty('lastPage', 5);
        expect(actionPayload).toHaveProperty('totalItems', 10);
        done();
      });
    });
  });

  describe('sendPostGroup()', () => {
    it('when postGroup succeeds, should dispatch SET_GROUPS', (done) => {
      store.dispatch(sendPostGroup(BODY_OK)).then(() => {
        const actions = store.getActions();
        expect(actions).toHaveLength(1);
        expect(actions[0]).toHaveProperty('type', SET_GROUPS);
        expect(gotoRoute).toHaveBeenCalled();
        done();
      });
    });
  });
});
