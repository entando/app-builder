import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { initialize } from 'redux-form';
import { gotoRoute } from 'frontend-common-components';

import { setGroups, fetchGroups, sendPostGroup, fetchGroup, sendPutGroup } from 'state/groups/actions';
import { config } from 'api/apiManager';
import { LIST_GROUPS_OK, BODY_OK } from 'test/mocks/groups';
import { SET_GROUPS } from 'state/groups/types';
import { SET_PAGE } from 'state/pagination/types';
import { ROUTE_GROUP_LIST } from 'app-init/router';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const GROUP_CODE = LIST_GROUPS_OK[0].code;
const UPDATED_GROUP = {
  code: LIST_GROUPS_OK[0].code,
  name: 'new_group_name',
};
const INITIALIZE_TYPE = '@@redux-form/INITIALIZE';

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
    it('when postGroup succeeds, should dispatch inizialize', (done) => {
      store.dispatch(sendPostGroup(BODY_OK)).then(() => {
        expect(gotoRoute).toHaveBeenCalled();
        done();
      });
    });
  });

  describe('fetchGroup()', () => {
    it('when getGroup succeeds, should dispatch inizialize', (done) => {
      store.dispatch(fetchGroup(GROUP_CODE)).then(() => {
        const actions = store.getActions();
        expect(actions).toHaveLength(1);
        expect(actions[0]).toHaveProperty('type', INITIALIZE_TYPE);
        expect(actions[0]).toHaveProperty('payload', LIST_GROUPS_OK[0]);
        expect(initialize).toHaveBeenCalled();
        done();
      });
    });
  });

  describe('sendPutGroup()', () => {
    it('when putGroup succeeds, should dispatch gotoRoute', (done) => {
      store.dispatch(sendPutGroup(UPDATED_GROUP)).then(() => {
        expect(gotoRoute).toHaveBeenCalledWith(ROUTE_GROUP_LIST);
        done();
      });
    });
  });
});
