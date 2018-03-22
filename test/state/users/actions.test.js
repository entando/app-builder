import configureMockStore from 'redux-mock-store';
import { initialize } from 'redux-form';
import thunk from 'redux-thunk';
import { gotoRoute } from 'frontend-common-components';
import { setUsers, fetchUsers, fetchUserForm, sendPutUser, setSelectedUserDetail, fetchUserDetail } from 'state/users/actions';
import { SET_USERS, SELECTED_USER } from 'state/users/types';
import { SET_PAGE } from 'state/pagination/types';
import { USERS_OK_PAGE_1, USER_PROFILE_MOCK } from 'test/mocks/users';
import { getUser, putUser } from 'api/user';
import { getUsers, getUserDetail } from 'api/users';
import { ROUTE_USER_LIST } from 'app-init/router';

import { ADD_ERRORS } from 'state/errors/types';

jest.mock('api/user', () => ({
  putUser: jest.fn(),
  getUser: jest.fn(),
}));

jest.mock('api/users', () => ({
  getUserDetail: jest.fn(),
  getUsers: jest.fn(),
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
getUserDetail.mockReturnValueOnce(new Promise(resolve => resolve(MOCK_RETURN_PROMISE)));

getUser.mockReturnValueOnce(new Promise(resolve => resolve(MOCK_RETURN_PROMISE)));

getUsers.mockReturnValue(new Promise(resolve => resolve(USERS_OK_PAGE_1)));

const middlewares = [thunk];

const mockStore = configureMockStore(middlewares);

const INITIAL_STATE = {
  users: {
    list: [],
    map: {},
    selected: {},
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
        const action = setUsers(USERS_OK_PAGE_1.payload);
        expect(action.type).toEqual(SET_USERS);
      });
    });

    describe('setSelectedUserDetail', () => {
      it('test setSelectedUserDetail action sets the correct type', () => {
        const action = setSelectedUserDetail(USER_PROFILE_MOCK);
        expect(action.type).toEqual(SELECTED_USER);
      });
    });

    describe('test fetchUsers', () => {
      it('fetchUsers calls setUsers and setPage actions', (done) => {
        store.dispatch(fetchUsers()).then(() => {
          const actions = store.getActions();
          expect(actions).toHaveLength(2);
          expect(actions[0].type).toEqual(SET_USERS);
          expect(actions[1].type).toEqual(SET_PAGE);
          done();
        });
      });

      it('users is defined and properly valued', (done) => {
        store.dispatch(fetchUsers()).then(() => {
          const actionPayload = store.getActions()[0].payload;
          expect(actionPayload.users).toHaveLength(2);
          const user = actionPayload.users[0];
          expect(user).toHaveProperty('username', 'admin');
          expect(user).toHaveProperty('status', 'active');
          done();
        });
      });
    });

    describe('fetchUserDetail', () => {
      beforeEach(() => {
        store = mockStore(INITIAL_STATE);
      });

      it('when fetchUserDetail succeeds, should dispatch setSelectedUserDetail', (done) => {
        store.dispatch(fetchUserDetail(USER.username)).then(() => {
          const actions = store.getActions();
          expect(getUserDetail).toHaveBeenCalled();
          expect(actions).toHaveLength(1);
          expect(actions[0].type).toEqual(SELECTED_USER);
          expect(setSelectedUserDetail).toBeDefined();
          done();
        });
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
        });
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
        });
      });

      it('when putUser get error, should dispatch gotoRoute user list', (done) => {
        putUser.mockReturnValueOnce(new Promise(resolve => resolve(MOCK_RETURN_PROMISE_ERROR)));
        store.dispatch(sendPutUser(USER)).then(() => {
          expect(putUser).toHaveBeenCalled();
          const addErrorsAction = store.getActions().find(action => action.type === ADD_ERRORS);
          expect(addErrorsAction).toBeDefined();
          done();
        });
      });
    });
  });
});
