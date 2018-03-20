import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { setUsers, fetchUsers } from 'state/users/actions';
import { SET_USERS } from 'state/users/types';
import { SET_PAGE } from 'state/pagination/types';
import { USERS_OK_PAGE_1 } from 'test/mocks/users';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);


const INITIAL_STATE = {
  users: {
    list: [],
  },
};

describe('users actions ', () => {
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
});
