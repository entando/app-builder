import configureMockStore from 'redux-mock-store';
import { initialize } from 'redux-form';
import thunk from 'redux-thunk';
import { mockApi } from 'test/testUtils';

import { gotoRoute, getParams } from '@entando/router';
import {
  setUsers, fetchUsers, fetchUserForm, sendPostUser, sendPutUser,
  setSelectedUserDetail, fetchCurrentPageUserDetail, setUsersTotal,
  fetchUsersTotal, sendDeleteUser,
} from 'state/users/actions';
import { SET_USERS, SET_SELECTED_USER, SET_USERS_TOTAL } from 'state/users/types';
import { TOGGLE_LOADING } from 'state/loading/types';
import { SET_PAGE } from 'state/pagination/types';
import { USER, USERS } from 'test/mocks/users';
import { getUsers, getUser, putUser, postUser, deleteUser } from 'api/users';
import { ROUTE_USER_LIST } from 'app-init/router';

import { ADD_ERRORS } from 'state/errors/types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

getParams.mockReturnValue({});

describe('state/users/actions', () => {
  let store;
  beforeEach(() => {
    jest.clearAllMocks();
    store = mockStore({});
  });

  describe('users actions ', () => {
    describe('data types actions ', () => {
      describe('setUsers', () => {
        it('test setUsers action sets the correct type', () => {
          const action = setUsers(USERS);
          expect(action).toHaveProperty('type', SET_USERS);
          expect(action).toHaveProperty('payload.users', USERS);
        });
      });

      describe('setSelectedUserDetail', () => {
        it('test setSelectedUserDetail action sets the correct type', () => {
          const action = setSelectedUserDetail(USER);
          expect(action).toHaveProperty('type', SET_SELECTED_USER);
          expect(action).toHaveProperty('payload.user', USER);
        });
      });

      describe('setUsersTotal', () => {
        it('test setUsersTotal action sets the correct type', () => {
          const action = setUsersTotal(12);
          expect(action).toHaveProperty('type', SET_USERS_TOTAL);
          expect(action).toHaveProperty('payload.usersTotal', 12);
        });
      });
    });

    describe('thunk', () => {
      describe('test fetchUsers', () => {
        it('fetchUsers calls setUsers and setPage actions', (done) => {
          store.dispatch(fetchUsers()).then(() => {
            const actions = store.getActions();
            expect(getUsers).toHaveBeenCalled();
            expect(actions).toHaveLength(4);
            expect(actions[0].type).toEqual(TOGGLE_LOADING);
            expect(actions[1].type).toEqual(SET_USERS);
            expect(actions[2].type).toEqual(SET_PAGE);
            expect(actions[3].type).toEqual(TOGGLE_LOADING);
            done();
          }).catch(done.fail);
        });

        it('when fetchUsers get error, should dispatch addErrors', (done) => {
          getUsers.mockImplementationOnce(mockApi({ errors: true }));
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

      describe('fetchUsersTotal', () => {
        it('fetchUsersTotal calls setUsersTotal', (done) => {
          store.dispatch(fetchUsersTotal()).then(() => {
            const actions = store.getActions();
            expect(getUsers).toHaveBeenCalled();
            expect(actions).toHaveLength(1);
            expect(actions[0]).toHaveProperty('type', SET_USERS_TOTAL);
            done();
          }).catch(done.fail);
        });

        it('when fetchUsersTotal gets errors it should dispatch addErrors', (done) => {
          getUsers.mockImplementationOnce(mockApi({ errors: true }));
          store.dispatch(fetchUsersTotal()).then(() => {
            expect(getUsers).toHaveBeenCalled();
            const actions = store.getActions();
            expect(actions).toHaveLength(1);
            expect(actions[0]).toHaveProperty('type', ADD_ERRORS);
            done();
          }).catch(done.fail);
        });
      });

      describe('fetchUserDetail', () => {
        it('when fetchUserDetail succeeds, should dispatch setSelectedUserDetail', (done) => {
          store.dispatch(fetchCurrentPageUserDetail(USER.username)).then(() => {
            const actions = store.getActions();
            expect(getUser).toHaveBeenCalled();
            expect(actions).toHaveLength(3);
            expect(actions[0].type).toEqual(TOGGLE_LOADING);
            expect(actions[1].type).toEqual(SET_SELECTED_USER);
            expect(actions[2].type).toEqual(TOGGLE_LOADING);
            expect(setSelectedUserDetail).toBeDefined();
            done();
          }).catch(done.fail);
        });

        it('when fetchUserDetail get error, should dispatch addErrors', (done) => {
          getUser.mockImplementationOnce(mockApi({ errors: true }));
          store.dispatch(fetchCurrentPageUserDetail(USER.username)).then(() => {
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

      describe('fetchUserForm', () => {
        it('when fetchUserForm succeeds, should dispatch initialize', (done) => {
          store.dispatch(fetchUserForm(USER.username)).then(() => {
            expect(getUser).toHaveBeenCalled();
            expect(initialize).toBeDefined();
            done();
          }).catch(done.fail);
        });

        it('when fetchUserForm get error, should dispatch addErrors', (done) => {
          getUser.mockImplementationOnce(mockApi({ errors: true }));
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

      describe('sendPostUser', () => {
        it('when postUser succeeds, should dispatch gotoRoute user list', (done) => {
          store.dispatch(sendPostUser(USER)).then(() => {
            expect(postUser).toHaveBeenCalled();
            const actions = store.getActions();
            expect(actions).toHaveLength(2);
            expect(actions[0]).toHaveProperty('type', SET_SELECTED_USER);
            expect(gotoRoute).toHaveBeenCalledWith(ROUTE_USER_LIST);
            done();
          }).catch(done.fail);
        });

        it('when postUser get error, should dispatch ADD_ERRORS', async () => {
          postUser.mockImplementationOnce(mockApi({ errors: true }));
          return store.dispatch(sendPostUser(USER)).catch((e) => {
            expect(postUser).toHaveBeenCalled();
            const actions = store.getActions();
            expect(actions).toHaveLength(1);
            expect(actions[0]).toHaveProperty('type', ADD_ERRORS);
            expect(e).toHaveProperty('errors');
            e.errors.forEach((error, index) => {
              expect(error.message).toEqual(actions[0].payload.errors[index]);
            });
          });
        });
      });

      describe('sendPutUser', () => {
        it('when putUser succeeds, should dispatch gotoRoute user list', (done) => {
          store.dispatch(sendPutUser(USER)).then(() => {
            expect(putUser).toHaveBeenCalled();
            expect(gotoRoute).toHaveBeenCalledWith(ROUTE_USER_LIST);
            done();
          }).catch(done.fail);
        });

        it('when putUser get error, should dispatch ADD_ERRORS', (done) => {
          putUser.mockImplementationOnce(mockApi({ errors: true }));
          store.dispatch(sendPutUser(USER)).then(() => {
            expect(putUser).toHaveBeenCalled();
            const addErrorsAction = store.getActions().find(action => action.type === ADD_ERRORS);
            expect(addErrorsAction).toBeDefined();
            done();
          }).catch(done.fail);
        });
      });

      describe('sendDeleteUser', () => {
        it('when sendDeleteUser succeeds, should dispatch gotoRoute user list', (done) => {
          store.dispatch(sendDeleteUser(USER)).then(() => {
            expect(deleteUser).toHaveBeenCalled();
            expect(gotoRoute).toHaveBeenCalledWith(ROUTE_USER_LIST);
            done();
          }).catch(done.fail);
        });

        it('when sendDeleteUser get error, should dispatch ADD_ERRORS', (done) => {
          deleteUser.mockImplementationOnce(mockApi({ errors: true }));
          store.dispatch(sendDeleteUser(USER.username)).then(() => {
            expect(deleteUser).toHaveBeenCalled();
            const actions = store.getActions();
            expect(actions).toHaveLength(1);
            expect(actions[0]).toHaveProperty('type', ADD_ERRORS);
            done();
          }).catch(done.fail);
        });
      });
    });
  });
});
