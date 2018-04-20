import configureMockStore from 'redux-mock-store';
import { initialize } from 'redux-form';
import thunk from 'redux-thunk';
import { gotoRoute, getParams } from '@entando/router';
import { setUsers, fetchUsers, fetchUserForm, sendPutUser, setSelectedUserDetail, fetchCurrentPageUserDetail } from 'state/users/actions';
import { SET_USERS, SET_SELECTED_USER } from 'state/users/types';
import { TOGGLE_LOADING } from 'state/loading/types';
import { SET_PAGE } from 'state/pagination/types';
import { USERS_OK, USER_PROFILE_MOCK } from 'test/mocks/users';
import { getUsers, getUserDetail, getUser, putUser } from 'api/users';
import { ROUTE_USER_LIST } from 'app-init/router';

import { ADD_ERRORS } from 'state/errors/types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

getParams.mockReturnValue({});

jest.mock('api/users', () => ({
  getUserDetail: jest.fn(),
  getUsers: jest.fn(),
  putUser: jest.fn(),
  getUser: jest.fn(),
}));

const MOCK_RETURN_PROMISE = {
  ok: true,
  json: () => new Promise(res => res({ payload: {} })),
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

getUserDetail.mockReturnValue(new Promise(resolve => resolve(MOCK_RETURN_PROMISE)));

getUser.mockReturnValueOnce(new Promise(resolve => resolve(MOCK_RETURN_PROMISE)));

getUsers.mockReturnValue(new Promise(resolve => resolve(MOCK_RETURN_PROMISE)));

const INITIAL_STATE = {
  users: {
    list: [],
    map: {},
    selected: {},
    loading: {},
  },
};

describe('users actions ', () => {
  const USER = {
    username: 'test',
    password: 'password',
    status: 'active',
    reset: false,
  };


  describe('data types actions ', () => {
    let store;

    beforeEach(() => {
      store = mockStore(INITIAL_STATE);
    });

    describe('setUsers', () => {
      it('test setUsers action sets the correct type', () => {
        const action = setUsers(USERS_OK.payload);
        expect(action.type).toEqual(SET_USERS);
      });
    });

    describe('setSelectedUserDetail', () => {
      it('test setSelectedUserDetail action sets the correct type', () => {
        const action = setSelectedUserDetail(USER_PROFILE_MOCK);
        expect(action.type).toEqual(SET_SELECTED_USER);
      });
    });

    describe('test fetchUsers', () => {
      it('fetchUsers calls setUsers and setPage actions', (done) => {
        store.dispatch(fetchUsers()).then(() => {
          const actions = store.getActions();
          expect(actions).toHaveLength(4);
          expect(actions[0].type).toEqual(TOGGLE_LOADING);
          expect(actions[1].type).toEqual(SET_USERS);
          expect(actions[2].type).toEqual(TOGGLE_LOADING);
          expect(actions[3].type).toEqual(SET_PAGE);
          done();
        }).catch(done.fail);
      });

      it('when fetchUsers get error, should dispatch addErrors', (done) => {
        getUsers.mockReturnValueOnce(new Promise(resolve => resolve(MOCK_RETURN_PROMISE_ERROR)));
        store.dispatch(fetchUsers()).then(() => {
          expect(getUsers).toHaveBeenCalled();
          const actions = store.getActions();
          expect(actions).toHaveLength(3);
          expect(actions[0].type).toEqual(TOGGLE_LOADING);
          expect(actions[1]).toHaveProperty('type', ADD_ERRORS);
          expect(actions[2].type).toEqual(TOGGLE_LOADING);
          done();
        }).catch(done.fail);
      });
    });

    describe('fetchUserDetail', () => {
      beforeEach(() => {
        store = mockStore(INITIAL_STATE);
      });

      it('when fetchUserDetail succeeds, should dispatch setSelectedUserDetail', (done) => {
        store.dispatch(fetchCurrentPageUserDetail(USER.username)).then(() => {
          const actions = store.getActions();
          expect(getUserDetail).toHaveBeenCalled();
          expect(actions).toHaveLength(3);
          expect(actions[0].type).toEqual(TOGGLE_LOADING);
          expect(actions[1].type).toEqual(SET_SELECTED_USER);
          expect(actions[2].type).toEqual(TOGGLE_LOADING);
          expect(setSelectedUserDetail).toBeDefined();
          done();
        }).catch(done.fail);
      });

      it('when fetchUserDetail get error, should dispatch addErrors', (done) => {
        getUserDetail
          .mockReturnValueOnce(new Promise(resolve => resolve(MOCK_RETURN_PROMISE_ERROR)));
        store.dispatch(fetchCurrentPageUserDetail(USER.username)).then(() => {
          expect(getUserDetail).toHaveBeenCalled();
          const actions = store.getActions();
          expect(actions).toHaveLength(3);
          expect(actions[0].type).toEqual(TOGGLE_LOADING);
          expect(actions[1]).toHaveProperty('type', ADD_ERRORS);
          expect(actions[2].type).toEqual(TOGGLE_LOADING);
          done();
        }).catch(done.fail);
      });
    });

    describe('fetchUserForm', () => {
      beforeEach(() => {
        store = mockStore(INITIAL_STATE);
      });

      it('when fetchUserForm succeeds, should dispatch initialize', (done) => {
        store.dispatch(fetchUserForm(USER.username)).then(() => {
          expect(getUser).toHaveBeenCalled();
          expect(initialize).toBeDefined();
          done();
        }).catch(done.fail);
      });

      it('when fetchUserForm get error, should dispatch addErrors', (done) => {
        getUser
          .mockReturnValueOnce(new Promise(resolve => resolve(MOCK_RETURN_PROMISE_ERROR)));
        store.dispatch(fetchUserForm(USER.username)).then(() => {
          expect(getUser).toHaveBeenCalled();
          const actions = store.getActions();
          expect(actions).toHaveLength(3);
          expect(actions[0].type).toEqual(TOGGLE_LOADING);
          expect(actions[1]).toHaveProperty('type', ADD_ERRORS);
          expect(actions[2].type).toEqual(TOGGLE_LOADING);
          done();
        }).catch(done.fail);
      });
    });

    describe('sendPutUser()', () => {
      beforeEach(() => {
        jest.clearAllMocks();
        store = mockStore(INITIAL_STATE);
      });

      it('when putUser succeeds, should dispatch gotoRoute user list', (done) => {
        putUser.mockReturnValueOnce(new Promise(resolve => resolve({ ok: true })));
        store.dispatch(sendPutUser(USER)).then(() => {
          expect(putUser).toHaveBeenCalled();
          expect(gotoRoute).toHaveBeenCalledWith(ROUTE_USER_LIST);
          done();
        }).catch(done.fail);
      });

      it('when putUser get error, should dispatch gotoRoute user list', (done) => {
        putUser.mockReturnValueOnce(new Promise(resolve => resolve(MOCK_RETURN_PROMISE_ERROR)));
        store.dispatch(sendPutUser(USER)).then(() => {
          expect(putUser).toHaveBeenCalled();
          const addErrorsAction = store.getActions().find(action => action.type === ADD_ERRORS);
          expect(addErrorsAction).toBeDefined();
          done();
        }).catch(done.fail);
      });
    });
  });
});
