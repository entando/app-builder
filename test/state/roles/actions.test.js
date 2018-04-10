import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { setRoles, fetchRoles, fetchRole, sendPostRole, sendPutRole } from 'state/roles/actions';
import { getRoles, getRole, postRoles, putRole } from 'api/roles';
import { LIST_ROLES_OK, GET_ROLE_PAYLOAD, BODY_OK } from 'test/mocks/roles';
import { SET_ROLES } from 'state/roles/types';
import { TOGGLE_LOADING } from 'state/loading/types';
import { SET_PAGE } from 'state/pagination/types';
import { ADD_ERRORS } from 'state/errors/types';
import { mockApi } from 'test/testUtils';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

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
    beforeEach(() => {
      getRoles.mockImplementation(mockApi({ payload: LIST_ROLES_OK }));
    });
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

    it('when getRoles get error, should dispatch addErrors', (done) => {
      getRoles.mockImplementation(mockApi({ errors: true }));
      store.dispatch(fetchRoles()).then(() => {
        expect(getRoles).toHaveBeenCalled();
        const actions = store.getActions();
        expect(actions).toHaveLength(2);
        expect(actions[0]).toHaveProperty('type', ADD_ERRORS);
        expect(actions[1]).toHaveProperty('type', TOGGLE_LOADING);
        done();
      }).catch(done.fail);
    });
  });

  describe('fetchRole()', () => {
    it('when fetchRole succeeds should call put action', (done) => {
      getRole.mockImplementation(mockApi({ payload: GET_ROLE_PAYLOAD }));
      store.dispatch(fetchRole(GET_ROLE_PAYLOAD.code)).then(() => {
        expect(getRole).toHaveBeenCalled();
        done();
      }).catch(done.fail);
    });

    it('when getRole get error, should dispatch addError', (done) => {
      getRole.mockImplementation(mockApi({ errors: true }));
      store.dispatch(fetchRole(BODY_OK)).then(() => {
        expect(getRole).toHaveBeenCalled();
        const actions = store.getActions();
        expect(actions).toHaveLength(1);
        expect(actions[0]).toHaveProperty('type', ADD_ERRORS);
        done();
      }).catch(done.fail);
    });
  });

  describe('sendPostRole()', () => {
    it('when postRoles succeeds should call post action', (done) => {
      postRoles.mockImplementation(mockApi({ payload: BODY_OK }));
      store.dispatch(sendPostRole(BODY_OK)).then(() => {
        expect(postRoles).toHaveBeenCalled();
        done();
      }).catch(done.fail);
    });

    it('when postRoles get error, should dispatch addError', (done) => {
      postRoles.mockImplementation(mockApi({ errors: true }));
      store.dispatch(sendPostRole(BODY_OK)).then(() => {
        expect(postRoles).toHaveBeenCalled();
        const actions = store.getActions();
        expect(actions).toHaveLength(1);
        expect(actions[0]).toHaveProperty('type', ADD_ERRORS);
        done();
      }).catch(done.fail);
    });
  });

  describe('sendPutRole()', () => {
    it('when putRole succeeds should call put action', (done) => {
      putRole.mockImplementation(mockApi({ payload: LIST_ROLES_OK[0] }));
      store.dispatch(sendPutRole(BODY_OK)).then(() => {
        expect(putRole).toHaveBeenCalled();
        done();
      }).catch(done.fail);
    });

    it('when putRole get error, should dispatch addError', (done) => {
      putRole.mockImplementation(mockApi({ errors: true }));
      store.dispatch(sendPutRole(BODY_OK)).then(() => {
        expect(putRole).toHaveBeenCalled();
        const actions = store.getActions();
        expect(actions).toHaveLength(1);
        expect(actions[0]).toHaveProperty('type', ADD_ERRORS);
        done();
      }).catch(done.fail);
    });
  });
});
