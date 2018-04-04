import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { setRoles, fetchRoles, sendPostRole } from 'state/roles/actions';
import { config } from 'api/apiManager';
// insert when available
// import { gotoRoute } from 'frontend-common-components';
import { LIST_ROLES_OK, BODY_OK } from 'test/mocks/roles';
import { SET_ROLES } from 'state/roles/types';
import { TOGGLE_LOADING } from 'state/loading/types';
import { SET_PAGE } from 'state/pagination/types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

config(mockStore({ api: { useMocks: true }, currentUser: { token: 'test_token' } }));
jest.unmock('api/roles');

const INITIAL_STATE = {
  form: {},
  roles: {
    list: [],
    map: {},
  },
};

describe('state/roles/actions', () => {
  let store;

  beforeEach(() => {
    store = mockStore(INITIAL_STATE);
  });

  describe('setRoles', () => {
    it('test setRoles action sets the correct type', () => {
      const action = setRoles(LIST_ROLES_OK);
      expect(action.type).toEqual(SET_ROLES);
    });
  });

  describe('fetchRoles', () => {
    it('fetchRoles calls setRoles and setPage actions', (done) => {
      store.dispatch(fetchRoles()).then(() => {
        const actions = store.getActions();
        expect(actions).toHaveLength(3);
        expect(actions[0]).toHaveProperty('type', SET_ROLES);
        expect(actions[1]).toHaveProperty('type', TOGGLE_LOADING);
        expect(actions[2]).toHaveProperty('type', SET_PAGE);
        done();
      }).catch(done.fail);
    });

    it('role is defined and properly valued', (done) => {
      store.dispatch(fetchRoles()).then(() => {
        const actionPayload = store.getActions()[0].payload;
        expect(actionPayload.roles).toHaveLength(10);
        const role = actionPayload.roles[0];
        expect(role).toHaveProperty('code', 'contentEditing');
        expect(role).toHaveProperty('name');
        done();
      }).catch(done.fail);
    });

    it('roles page two is retrieved correctly and properly valued', (done) => {
      store.dispatch(fetchRoles({ page: 2, pageSize: 2 })).then(() => {
        const actions = store.getActions();
        expect(actions).toHaveLength(3);
        const rolesPayload = actions[0].payload;
        expect(rolesPayload).toHaveProperty('roles');
        expect(rolesPayload.roles).toHaveLength(2);
        done();
      }).catch(done.fail);
    });

    it('page is defined and properly valued', (done) => {
      store.dispatch(fetchRoles()).then(() => {
        const actionPayload = store.getActions()[2].payload.page;
        expect(actionPayload).toHaveProperty('page', 1);
        expect(actionPayload).toHaveProperty('pageSize', 10);
        expect(actionPayload).toHaveProperty('lastPage', 1);
        expect(actionPayload).toHaveProperty('totalItems', 10);
        done();
      }).catch(done.fail);
    });

    it('page 2 is defined and properly valued', (done) => {
      store.dispatch(fetchRoles({ page: 2, pageSize: 2 })).then(() => {
        const actionPayload = store.getActions()[2].payload.page;
        expect(actionPayload).toHaveProperty('page', 2);
        expect(actionPayload).toHaveProperty('pageSize', 2);
        expect(actionPayload).toHaveProperty('lastPage', 5);
        expect(actionPayload).toHaveProperty('totalItems', 10);
        done();
      }).catch(done.fail);
    });
  });

  describe('sendPostRole()', () => {
    it('when postRole succeeds, should dispatch SET_ROLES', (done) => {
      store.dispatch(sendPostRole(BODY_OK)).then(() => {
        const actions = store.getActions();
        expect(actions).toHaveLength(1);
        expect(actions[0]).toHaveProperty('type', SET_ROLES);
        // insert when available
        // expect(gotoRoute).toHaveBeenCalled();
        done();
      }).catch(done.fail);
    });
  });
});
