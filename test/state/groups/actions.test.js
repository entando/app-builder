import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { initialize } from 'redux-form';
import { gotoRoute } from 'frontend-common-components';

import { setGroups, fetchGroups, sendPostGroup, fetchGroup, sendPutGroup } from 'state/groups/actions';
import { putGroup, getGroup, getGroups, postGroup } from 'api/groups';

import { LIST_GROUPS_OK, BODY_OK } from 'test/mocks/groups';
import { SET_GROUPS } from 'state/groups/types';
import { SET_PAGE } from 'state/pagination/types';
import { ROUTE_GROUP_LIST } from 'app-init/router';
import { ADD_ERRORS } from 'state/errors/types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const GROUP_CODE = LIST_GROUPS_OK[0].code;
const UPDATED_GROUP = {
  code: LIST_GROUPS_OK[0].code,
  name: 'new_group_name',
};
const INITIALIZE_TYPE = '@@redux-form/INITIALIZE';

jest.mock('api/groups', () => ({
  getGroups: jest.fn(),
  getGroup: jest.fn(),
  postGroup: jest.fn(),
  putGroup: jest.fn(),
}));

const GET_GROUPS_PROMISE = {
  ok: true,
  json: () => new Promise(res => res({ payload: LIST_GROUPS_OK })),
};

const GET_GROUP_PROMISE = {
  ok: true,
  json: () => new Promise(res => res({ payload: LIST_GROUPS_OK[0] })),
};

const POST_GROUP_PROMISE = {
  ok: true,
  json: () => new Promise(res => res({ payload: BODY_OK })),
};

const PUT_GROUP_PROMISE = {
  ok: true,
  json: () => new Promise(res => res({ payload: UPDATED_GROUP })),
};

const MOCK_RETURN_PROMISE_ERROR =
  {
    ok: false,
    json: () => new Promise(err => err({
      errors: [
        { message: 'what went wrong' },
      ],
    })),
  };

getGroups.mockReturnValue(new Promise(resolve => resolve(GET_GROUPS_PROMISE)));
getGroup.mockReturnValueOnce(new Promise(resolve => resolve(GET_GROUP_PROMISE)));

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
      }).catch(done.fail);
    });

    it('group is defined and properly valued', (done) => {
      store.dispatch(fetchGroups()).then(() => {
        const actionPayload = store.getActions()[0].payload;
        expect(actionPayload.groups).toHaveLength(10);
        const group = actionPayload.groups[0];
        expect(group).toHaveProperty('code', 'account_executive');
        expect(group).toHaveProperty('name');
        done();
      }).catch(done.fail);
    });
  });

  describe('sendPostGroup()', () => {
    it('when postGroup succeeds, should dispatch gotoRoute', (done) => {
      postGroup.mockReturnValueOnce(new Promise(resolve => resolve(POST_GROUP_PROMISE)));
      store.dispatch(sendPostGroup(BODY_OK)).then(() => {
        expect(postGroup).toHaveBeenCalled();
        expect(gotoRoute).toHaveBeenCalledWith(ROUTE_GROUP_LIST);
        done();
      }).catch(done.fail);
    });

    it('when postGroup get error, should dispatch addError', (done) => {
      postGroup.mockReturnValueOnce(new Promise(resolve => resolve(MOCK_RETURN_PROMISE_ERROR)));
      store.dispatch(sendPostGroup(BODY_OK)).then(() => {
        expect(postGroup).toHaveBeenCalled();
        const actions = store.getActions();
        expect(actions).toHaveLength(1);
        expect(actions[0]).toHaveProperty('type', ADD_ERRORS);
        done();
      }).catch(done.fail);
    });
  });

  describe('fetchGroup()', () => {
    it('when getGroup succeeds, should dispatch inizialize', (done) => {
      getGroup.mockReturnValueOnce(new Promise(resolve => resolve(GET_GROUP_PROMISE)));
      store.dispatch(fetchGroup(GROUP_CODE)).then(() => {
        expect(getGroup).toHaveBeenCalled();
        const actions = store.getActions();
        expect(actions).toHaveLength(1);
        expect(actions[0]).toHaveProperty('type', INITIALIZE_TYPE);
        expect(actions[0]).toHaveProperty('payload', LIST_GROUPS_OK[0]);
        expect(initialize).toHaveBeenCalled();
        done();
      }).catch(done.fail);
    });
  });

  describe('sendPutGroup()', () => {
    it('when putGroup succeeds, should dispatch gotoRoute', (done) => {
      putGroup.mockReturnValueOnce(new Promise(resolve => resolve(PUT_GROUP_PROMISE)));
      store.dispatch(sendPutGroup(UPDATED_GROUP)).then(() => {
        expect(putGroup).toHaveBeenCalled();
        expect(gotoRoute).toHaveBeenCalledWith(ROUTE_GROUP_LIST);
        done();
      }).catch(done.fail);
    });

    it('when putGroup get error, should dispatch gotoRoute group list', (done) => {
      putGroup.mockReturnValueOnce(new Promise(resolve => resolve(MOCK_RETURN_PROMISE_ERROR)));
      store.dispatch(sendPutGroup()).then(() => {
        expect(putGroup).toHaveBeenCalled();
        const actions = store.getActions();
        expect(actions).toHaveLength(1);
        expect(actions[0]).toHaveProperty('type', ADD_ERRORS);
        done();
      }).catch(done.fail);
    });
  });
});
