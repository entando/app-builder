import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { setRoles, fetchRoles, fetchRole, sendPostRole, sendPutRole } from 'state/roles/actions';
import { getRoles, getRole, postRoles, putRole } from 'api/roles';
import { LIST_ROLES_OK, GET_ROLE_PAYLOAD, BODY_OK } from 'test/mocks/roles';
import { SET_ROLES } from 'state/roles/types';
import { TOGGLE_LOADING } from 'state/loading/types';
import { SET_PAGE } from 'state/pagination/types';
import { ADD_ERRORS } from 'state/errors/types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

jest.mock('api/roles', () => ({
  getRoles: jest.fn(),
  getRole: jest.fn(),
  postRoles: jest.fn(),
  putRole: jest.fn(),
}));

const GET_ROLES_PROMISE = {
  ok: true,
  json: () => new Promise(res => res({ payload: LIST_ROLES_OK })),
};

const GET_ROLE_PROMISE = {
  ok: true,
  json: () => new Promise(res => res({ payload: GET_ROLE_PAYLOAD })),
};

const POST_ROLE_PROMISE = {
  ok: true,
  json: () => new Promise(res => res({ payload: BODY_OK })),
};

const PUT_ROLE_PROMISE = {
  ok: true,
  json: () => new Promise(res => res({ payload: LIST_ROLES_OK[0] })),
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

getRoles.mockReturnValue(new Promise(resolve => resolve(GET_ROLES_PROMISE)));

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

    it('when getRoles get error, should dispatch addErrors', (done) => {
      getRoles.mockReturnValueOnce(new Promise(resolve => resolve(MOCK_RETURN_PROMISE_ERROR)));
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
      getRole.mockReturnValueOnce(new Promise(resolve => resolve(GET_ROLE_PROMISE)));
      store.dispatch(fetchRole(GET_ROLE_PAYLOAD.code)).then(() => {
        expect(getRole).toHaveBeenCalled();
        done();
      }).catch(done.fail);
    });
  });

  it('when getRole get error, should dispatch addError', (done) => {
    getRole.mockReturnValueOnce(new Promise(resolve => resolve(MOCK_RETURN_PROMISE_ERROR)));
    store.dispatch(fetchRole(BODY_OK)).then(() => {
      expect(getRole).toHaveBeenCalled();
      const actions = store.getActions();
      expect(actions).toHaveLength(1);
      expect(actions[0]).toHaveProperty('type', ADD_ERRORS);
      done();
    }).catch(done.fail);
  });

  describe('sendPostRole()', () => {
    it('when postRoles succeeds should call post action', (done) => {
      postRoles.mockReturnValueOnce(new Promise(resolve => resolve(POST_ROLE_PROMISE)));
      store.dispatch(sendPostRole(BODY_OK)).then(() => {
        expect(postRoles).toHaveBeenCalled();
        done();
      }).catch(done.fail);
    });

    it('when postRoles get error, should dispatch addError', (done) => {
      postRoles.mockReturnValueOnce(new Promise(resolve => resolve(MOCK_RETURN_PROMISE_ERROR)));
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
      putRole.mockReturnValueOnce(new Promise(resolve => resolve(PUT_ROLE_PROMISE)));
      store.dispatch(sendPutRole(BODY_OK)).then(() => {
        expect(putRole).toHaveBeenCalled();
        done();
      }).catch(done.fail);
    });

    it('when putRole get error, should dispatch addError', (done) => {
      putRole.mockReturnValueOnce(new Promise(resolve => resolve(MOCK_RETURN_PROMISE_ERROR)));
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
