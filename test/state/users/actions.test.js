import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { gotoRoute } from 'frontend-common-components';
import { setUsers, fetchUsers, sendPutUser } from 'state/users/actions';
import { SET_USERS } from 'state/users/types';
import { SET_PAGE } from 'state/pagination/types';
import { USERS_OK_PAGE_1 } from 'test/mocks/users';
import { putUser } from 'api/user';
import { ROUTE_USER_LIST } from 'app-init/router';

import { ADD_ERRORS } from 'state/errors/types';

jest.mock('api/user', () => ({
  putUser: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const INITIAL_STATE = {
  users: {
    list: [],
    map: {},
  },
};

describe('users actions ', () => {
  const USER = {
    username: 'test',
    password: 'password',
    status: 'active',
    reset: false,
  };

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
      putUser.mockReturnValueOnce(new Promise(resolve => resolve({
        ok: false,
        json: () => new Promise(err => err({
          errors: [
            { message: 'what went wrong' },
          ],
        })),
      })));
      store.dispatch(sendPutUser(USER)).then(() => {
        expect(putUser).toHaveBeenCalled();
        const addErrorsAction = store.getActions().find(action => action.type === ADD_ERRORS);
        expect(addErrorsAction).toBeDefined();
        done();
      });
    });
  });
});
