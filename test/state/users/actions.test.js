import configureMockStore from 'redux-mock-store';
import { initialize } from 'redux-form';
import thunk from 'redux-thunk';
import { mockApi } from 'test/testUtils';
import { ADD_TOAST, ADD_ERRORS, CLEAR_ERRORS } from '@entando/messages';

import {
  setUsers, fetchUsers, fetchUserForm, sendPostUser, sendPutUser,
  setSelectedUserDetail, fetchCurrentPageUserDetail, setUsersTotal,
  fetchUsersTotal, sendDeleteUser, fetchUserAuthorities, sendPostUserAuthorities,
  sendPutUserAuthorities, sendDeleteUserAuthorities, sendPostMyPassword,
} from 'state/users/actions';
import { SET_USERS, SET_SELECTED_USER, SET_SELECTED_USER_AUTHORITIES, SET_USERS_TOTAL } from 'state/users/types';
import { TOGGLE_LOADING } from 'state/loading/types';
import { SET_PAGE } from 'state/pagination/types';
import { SET_VISIBLE_MODAL } from 'state/modal/types';
import { USER, USERS, AUTHORITIES } from 'test/mocks/users';
import {
  getUsers, getUser, putUser, postUser, deleteUser,
  getUserAuthorities, postUserAuthorities, putUserAuthorities,
  deleteUserAuthorities, postMyPassword,
} from 'api/users';
import { history, ROUTE_USER_LIST } from 'app-init/router';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

jest.mock('app-init/router', () => ({
  history: {
    push: jest.fn(),
  },
}));

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
            expect(actions).toHaveLength(4);
            expect(actions[0].type).toEqual(TOGGLE_LOADING);
            expect(actions[1]).toHaveProperty('type', ADD_ERRORS);
            expect(actions[2]).toHaveProperty('type', ADD_TOAST);
            expect(actions[3].type).toEqual(TOGGLE_LOADING);
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
            expect(actions).toHaveLength(2);
            expect(actions[0]).toHaveProperty('type', ADD_ERRORS);
            expect(actions[1]).toHaveProperty('type', ADD_TOAST);
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
            expect(actions).toHaveLength(4);
            expect(actions[0].type).toEqual(TOGGLE_LOADING);
            expect(actions[1]).toHaveProperty('type', ADD_ERRORS);
            expect(actions[2]).toHaveProperty('type', ADD_TOAST);
            expect(actions[3].type).toEqual(TOGGLE_LOADING);
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
            expect(actions).toHaveLength(4);
            expect(actions[0].type).toEqual(TOGGLE_LOADING);
            expect(actions[1]).toHaveProperty('type', ADD_ERRORS);
            expect(actions[2]).toHaveProperty('type', ADD_TOAST);
            expect(actions[3].type).toEqual(TOGGLE_LOADING);
            done();
          }).catch(done.fail);
        });
      });

      describe('sendPostUser', () => {
        it('when postUser succeeds, should call router user list', (done) => {
          store.dispatch(sendPostUser(USER)).then(() => {
            expect(postUser).toHaveBeenCalled();
            const actions = store.getActions();
            expect(actions).toHaveLength(2);
            expect(actions[0]).toHaveProperty('type', SET_SELECTED_USER);
            expect(history.push).toHaveBeenCalledWith(ROUTE_USER_LIST);
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
        it('when putUser succeeds, should call router user list', (done) => {
          store.dispatch(sendPutUser(USER)).then(() => {
            expect(putUser).toHaveBeenCalled();
            expect(history.push).toHaveBeenCalledWith(ROUTE_USER_LIST);
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
        it('when sendDeleteUser succeeds, should call router user list', (done) => {
          store.dispatch(sendDeleteUser(USER)).then(() => {
            expect(deleteUser).toHaveBeenCalled();
            done();
          }).catch(done.fail);
        });

        it('when sendDeleteUser get error, should dispatch ADD_ERRORS', (done) => {
          deleteUser.mockImplementationOnce(mockApi({ errors: true }));
          store.dispatch(sendDeleteUser(USER.username)).then(() => {
            expect(deleteUser).toHaveBeenCalled();
            const actions = store.getActions();
            expect(actions).toHaveLength(2);
            expect(actions[0]).toHaveProperty('type', ADD_ERRORS);
            expect(actions[1]).toHaveProperty('type', ADD_TOAST);
            done();
          }).catch(done.fail);
        });
      });
    });

    describe('fetchPostUserAuthorities', () => {
      it('when fecthPostUserAuthorities succeeds, should dispatch SET_SELECTED_USER_AUTHORITIES', (done) => {
        store.dispatch(fetchUserAuthorities(USER.username)).then(() => {
          expect(getUserAuthorities).toHaveBeenCalled();
          const actions = store.getActions();
          expect(actions[0]).toHaveProperty('type', TOGGLE_LOADING);
          expect(actions[1]).toHaveProperty('type', SET_SELECTED_USER_AUTHORITIES);
          expect(actions[2]).toHaveProperty('type', '@@redux-form/INITIALIZE');
          expect(actions[3]).toHaveProperty('type', TOGGLE_LOADING);
          done();
        }).catch(done.fail);
      });

      it('if the response is not ok, dispatch add errors', async () => {
        getUserAuthorities.mockImplementation(mockApi({ errors: true }));
        return store.dispatch(fetchUserAuthorities(USER.username)).catch((e) => {
          expect(getUserAuthorities).toHaveBeenCalled();
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

    describe('sendPostUserAuthorities', () => {
      it('when sendPostUserAuthorities succeeds, should call router', (done) => {
        store.dispatch(sendPostUserAuthorities(AUTHORITIES)).then(() => {
          expect(postUserAuthorities).toHaveBeenCalled();
          expect(history.push).toHaveBeenCalledWith(ROUTE_USER_LIST);
          done();
        }).catch(done.fail);
      });

      it('when sendPostUserAuthorities succeeds and do not give an autority, do not call the APi but only call router', (done) => {
        store.dispatch(sendPostUserAuthorities([])).then(() => {
          expect(postUserAuthorities).not.toHaveBeenCalled();
          expect(history.push).toHaveBeenCalledWith(ROUTE_USER_LIST);
          done();
        }).catch(done.fail);
      });

      it('if the response is not ok, dispatch add errors', async () => {
        postUserAuthorities.mockImplementation(mockApi({ errors: true }));
        return store.dispatch(sendPostUserAuthorities(AUTHORITIES)).catch((e) => {
          expect(postUserAuthorities).toHaveBeenCalled();
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

    describe('sendPutUserAuthorities', () => {
      it('when sendPutUserAuthorities succeeds, should call router', (done) => {
        store.dispatch(sendPutUserAuthorities(AUTHORITIES)).then(() => {
          expect(putUserAuthorities).toHaveBeenCalled();
          expect(history.push).toHaveBeenCalledWith(ROUTE_USER_LIST);
          done();
        }).catch(done.fail);
      });

      it('if the response is not ok, dispatch add errors', async () => {
        putUserAuthorities.mockImplementation(mockApi({ errors: true }));
        return store.dispatch(sendPutUserAuthorities(AUTHORITIES)).catch((e) => {
          expect(putUserAuthorities).toHaveBeenCalled();
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

    describe('sendDeleteUserAuthorities', () => {
      it('when sendDeleteUserAuthorities succeeds, should call router', (done) => {
        store.dispatch(sendDeleteUserAuthorities()).then(() => {
          expect(deleteUserAuthorities).toHaveBeenCalled();
          expect(history.push).toHaveBeenCalledWith(ROUTE_USER_LIST);
          done();
        }).catch(done.fail);
      });

      it('if the response is not ok, dispatch add errors', async () => {
        deleteUserAuthorities.mockImplementation(mockApi({ errors: true }));
        return store.dispatch(sendDeleteUserAuthorities()).catch((e) => {
          expect(deleteUserAuthorities).toHaveBeenCalled();
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

    describe('sendPostMyPassword', () => {
      it('when sendPostMyPassword succeeds, should dispatch ADD_TOAST and clearFields', (done) => {
        store.dispatch(sendPostMyPassword({})).then(() => {
          expect(postMyPassword).toHaveBeenCalledWith({});
          const actions = store.getActions();
          expect(actions).toHaveLength(4);
          expect(actions[0]).toHaveProperty('type', ADD_TOAST);
          expect(actions[1]).toHaveProperty('type', CLEAR_ERRORS);
          expect(actions[2]).toHaveProperty('type', '@@redux-form/RESET');
          expect(actions[3]).toHaveProperty('type', SET_VISIBLE_MODAL);
          done();
        }).catch(done.fail);
      });

      it('if the response is not ok, dispatch add errors', async () => {
        postMyPassword.mockImplementationOnce(mockApi({ errors: true }));
        return store.dispatch(sendPostMyPassword({})).catch((e) => {
          expect(postMyPassword).toHaveBeenCalled();
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
  });
});
