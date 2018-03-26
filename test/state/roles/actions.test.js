import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
// insert when available
// import { gotoRoute } from 'frontend-common-components';

import { setRoles, fetchRoles, sendPostRole } from 'state/roles/actions';
import { config } from 'api/apiManager';
import { LIST_ROLES_OK, BODY_OK } from 'test/mocks/roles';
import { SET_ROLES } from 'state/roles/types';
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
        expect(actions).toHaveLength(2);
        expect(actions[0].type).toEqual(SET_ROLES);
        expect(actions[1].type).toEqual(SET_PAGE);
        done();
      });
    });

    it('role is defined and properly valued', (done) => {
      store.dispatch(fetchRoles()).then(() => {
        const actionPayload = store.getActions()[0].payload;
        expect(actionPayload.roles).toHaveLength(10);
        const role = actionPayload.roles[0];
        expect(role).toHaveProperty('code', 'contentEditing');
        expect(role).toHaveProperty('name');
        done();
      });
    });

    it('roles page two is retrieved correctly and properly valued', (done) => {
      store.dispatch(fetchRoles({ page: 2, pageSize: 2 })).then(() => {
        const actionPayload = store.getActions()[0].payload;
        expect(actionPayload.roles).toHaveLength(2);
        expect(actionPayload.roles[0]).toHaveProperty('code', 'ratingEditing');
        expect(actionPayload.roles[1]).toHaveProperty('code', 'manageWebDynamicForms');
        done();
      });
    });

    it('page is defined and properly valued', (done) => {
      store.dispatch(fetchRoles()).then(() => {
        const actionPayload = store.getActions()[1].payload.page;
        expect(actionPayload).toHaveProperty('page', 1);
        expect(actionPayload).toHaveProperty('pageSize', 10);
        expect(actionPayload).toHaveProperty('lastPage', 1);
        expect(actionPayload).toHaveProperty('totalItems', 10);
        done();
      });
    });

    it('page 2 is defined and properly valued', (done) => {
      store.dispatch(fetchRoles({ page: 2, pageSize: 2 })).then(() => {
        const actionPayload = store.getActions()[1].payload.page;
        expect(actionPayload).toHaveProperty('page', 2);
        expect(actionPayload).toHaveProperty('pageSize', 2);
        expect(actionPayload).toHaveProperty('lastPage', 5);
        expect(actionPayload).toHaveProperty('totalItems', 10);
        done();
      });
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
      });
    });
  });
});
