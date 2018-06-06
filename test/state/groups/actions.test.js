import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { initialize } from 'redux-form';
import { getParams, gotoRoute } from '@entando/router';
import { ADD_ERRORS } from '@entando/messages';

import {
  setGroups,
  fetchGroups,
  setGroupsTotal,
  fetchGroupsTotal,
  sendPostGroup,
  fetchGroup,
  sendPutGroup,
  sendDeleteGroup,
  fetchCurrentPageGroupDetail,
  fetchReferences,
  removeGroupSync,
} from 'state/groups/actions';
import {
  putGroup,
  getGroup,
  getGroups,
  postGroup,
  deleteGroup,
  getReferences,
} from 'api/groups';

import { LIST_GROUPS_OK, BODY_OK } from 'test/mocks/groups';

import {
  SET_GROUPS,
  SET_GROUPS_TOTAL,
  SET_SELECTED_GROUP,
  SET_REFERENCES,
  REMOVE_GROUP,
} from 'state/groups/types';
import { TOGGLE_LOADING } from 'state/loading/types';
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

jest.mock('api/groups', () => ({
  getGroups: jest.fn(),
  getGroup: jest.fn(),
  postGroup: jest.fn(),
  putGroup: jest.fn(),
  deleteGroup: jest.fn(),
  getReferences: jest.fn(),
}));

getParams.mockReturnValue({ groupname: 'test' });

const GET_GROUPS_PROMISE = {
  ok: true,
  json: () => new Promise(res => res({ payload: LIST_GROUPS_OK, metaData: { totalItems: 2 } })),
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

const DELETE_GROUP_PROMISE = {
  ok: true,
  json: () => new Promise(res => res({ payload: 'group_code' })),
};

const GET_REFERENCES_PROMISE = {
  ok: true,
  json: () => new Promise(resolve => resolve({ payload: [] })),
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
getGroup.mockReturnValue(new Promise(resolve => resolve(GET_GROUP_PROMISE)));
getReferences.mockReturnValue(new Promise(resolve => resolve(GET_REFERENCES_PROMISE)));

const INITIAL_STATE = {
  form: {},
  groups: {
    list: [],
    map: {},
    selected: {},
    total: 0,
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
      expect(action).toHaveProperty('type', SET_GROUPS);
    });
  });

  describe('setGroupsTotal', () => {
    it('test setGroupsTotal action sets the correct type', () => {
      const action = setGroupsTotal(12);
      expect(action).toHaveProperty('type', SET_GROUPS_TOTAL);
      expect(action).toHaveProperty('payload.groupsTotal', 12);
    });
  });

  describe('removeGroupSync', () => {
    it('test removeGroupSync action sets the correct type', () => {
      const action = removeGroupSync(GROUP_CODE);
      expect(action).toHaveProperty('type', REMOVE_GROUP);
    });
  });

  describe('fetchGroups', () => {
    it('fetchGroups calls setGroups and setPage actions', (done) => {
      store.dispatch(fetchGroups()).then(() => {
        const actions = store.getActions();
        expect(actions).toHaveLength(4);
        expect(actions[0].type).toEqual(TOGGLE_LOADING);
        expect(actions[1].type).toEqual(SET_GROUPS);
        expect(actions[2].type).toEqual(TOGGLE_LOADING);
        expect(actions[3].type).toEqual(SET_PAGE);
        done();
      }).catch(done.fail);
    });

    it('group is defined and properly valued', (done) => {
      store.dispatch(fetchGroups()).then(() => {
        const actionPayload = store.getActions()[1].payload;
        expect(actionPayload.groups).toHaveLength(10);
        const group = actionPayload.groups[0];
        expect(group).toHaveProperty('code', 'account_executive');
        expect(group).toHaveProperty('name');
        done();
      }).catch(done.fail);
    });

    it('when getGroups get error, should dispatch addErrors', (done) => {
      getGroups.mockReturnValueOnce(new Promise(resolve => resolve(MOCK_RETURN_PROMISE_ERROR)));
      store.dispatch(fetchGroups()).then(() => {
        expect(getGroups).toHaveBeenCalled();
        const actions = store.getActions();
        expect(actions).toHaveLength(3);
        expect(actions[0].type).toEqual(TOGGLE_LOADING);
        expect(actions[1]).toHaveProperty('type', ADD_ERRORS);
        expect(actions[2].type).toEqual(TOGGLE_LOADING);
        done();
      }).catch(done.fail);
    });
  });

  describe('fetchGroupsTotal', () => {
    it('fetchGroups calls setGroupsTotal', (done) => {
      store.dispatch(fetchGroupsTotal()).then(() => {
        const actions = store.getActions();
        expect(actions).toHaveLength(1);
        expect(actions[0]).toHaveProperty('type', SET_GROUPS_TOTAL);
        done();
      }).catch(done.fail);
    });

    it('when getGroups errors it should dispatch addErrors', (done) => {
      getGroups.mockReturnValueOnce(new Promise(resolve => resolve(MOCK_RETURN_PROMISE_ERROR)));
      store.dispatch(fetchGroupsTotal()).then(() => {
        expect(getGroups).toHaveBeenCalled();
        const actions = store.getActions();
        expect(actions).toHaveLength(1);
        expect(actions[0]).toHaveProperty('type', ADD_ERRORS);
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

    it('when getGroup get error, should dispatch addErrors', (done) => {
      getGroup.mockReturnValueOnce(new Promise(resolve => resolve(MOCK_RETURN_PROMISE_ERROR)));
      store.dispatch(fetchGroup()).then(() => {
        expect(getGroup).toHaveBeenCalled();
        const actions = store.getActions();
        expect(actions).toHaveLength(1);
        expect(actions[0]).toHaveProperty('type', ADD_ERRORS);
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

    it('when putGroup get error, should dispatch should dispatch addErrors', (done) => {
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

  describe('sendDeleteGroup()', () => {
    it('when deleteGroup succeeds, should dispatch removeGroupSync', (done) => {
      deleteGroup.mockReturnValueOnce(new Promise(resolve => resolve(DELETE_GROUP_PROMISE)));
      store.dispatch(sendDeleteGroup(GROUP_CODE)).then(() => {
        expect(deleteGroup).toHaveBeenCalled();
        const actions = store.getActions();
        expect(actions).toHaveLength(1);
        expect(actions[0]).toHaveProperty('type', REMOVE_GROUP);
        expect(actions[0].payload).toHaveProperty('groupCode', LIST_GROUPS_OK[0].code);
        done();
      }).catch(done.fail);
    });

    it('when deleteGroup get error, should dispatch addErrors', (done) => {
      deleteGroup.mockReturnValueOnce(new Promise(resolve => resolve(MOCK_RETURN_PROMISE_ERROR)));
      store.dispatch(sendDeleteGroup()).then(() => {
        expect(deleteGroup).toHaveBeenCalled();
        const actions = store.getActions();
        expect(actions).toHaveLength(1);
        expect(actions[0]).toHaveProperty('type', ADD_ERRORS);
        done();
      }).catch(done.fail);
    });
  });

  describe('fetchCurrentPageGroupDetail', () => {
    it('fetchCurrentPageGroupDetail call getGroup', (done) => {
      store.dispatch(fetchCurrentPageGroupDetail()).then(() => {
        const actions = store.getActions();
        expect(actions).toHaveLength(1);
        expect(actions[0].type).toEqual(SET_SELECTED_GROUP);
        done();
      }).catch(done.fail);
    });

    it('when fetchCurrentPageGroupDetail get error, should dispatch addErrors', (done) => {
      getGroup.mockReturnValueOnce(new Promise(resolve => resolve(MOCK_RETURN_PROMISE_ERROR)));
      store.dispatch(fetchCurrentPageGroupDetail()).then(() => {
        expect(getGroup).toHaveBeenCalled();
        const actions = store.getActions();
        expect(actions).toHaveLength(1);
        expect(actions[0]).toHaveProperty('type', ADD_ERRORS);
        done();
      }).catch(done.fail);
    });
  });

  describe('fetchReferences', () => {
    it('fetchReferences call getReferences', (done) => {
      store.dispatch(fetchReferences()).then(() => {
        const actions = store.getActions();
        expect(actions).toHaveLength(4);
        expect(actions[0].type).toEqual(TOGGLE_LOADING);
        expect(actions[1].type).toEqual(SET_REFERENCES);
        expect(actions[2].type).toEqual(SET_PAGE);
        expect(actions[3].type).toEqual(TOGGLE_LOADING);
        done();
      }).catch(done.fail);
    });

    it('when fetchCurrentReferencePages get error, should dispatch addErrors', (done) => {
      getReferences
        .mockReturnValueOnce(new Promise(resolve => resolve(MOCK_RETURN_PROMISE_ERROR)));
      store.dispatch(fetchReferences()).then(() => {
        expect(getReferences).toHaveBeenCalled();
        const actions = store.getActions();
        expect(actions).toHaveLength(3);
        expect(actions[0].type).toEqual(TOGGLE_LOADING);
        expect(actions[1]).toHaveProperty('type', ADD_ERRORS);
        expect(actions[2].type).toEqual(TOGGLE_LOADING);
        done();
      }).catch(done.fail);
    });
  });
});
