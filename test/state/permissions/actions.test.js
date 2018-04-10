import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { setPermissions, fetchPermissions } from 'state/permissions/actions';
import { getPermissions } from 'api/permissions';
import { LIST_PERMISSIONS_OK } from 'test/mocks/permissions';
import { SET_PERMISSIONS } from 'state/permissions/types';
import { TOGGLE_LOADING } from 'state/loading/types';
import { SET_PAGE } from 'state/pagination/types';
import { ADD_ERRORS } from 'state/errors/types';
import { mockApi } from 'test/testUtils';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const INITIAL_STATE = {
  permissions: {
    list: [],
    map: {},
  },
};

describe('state/permissions/actions', () => {
  let store;

  beforeEach(() => {
    store = mockStore(INITIAL_STATE);
  });

  describe('setPermissions', () => {
    it('test setPermissions action sets the correct type', () => {
      const action = setPermissions(LIST_PERMISSIONS_OK);
      expect(action.type).toEqual(SET_PERMISSIONS);
    });
  });

  describe('fetchPermissions', () => {
    beforeEach(() => {
      getPermissions.mockImplementation(mockApi({ payload: LIST_PERMISSIONS_OK }));
    });

    it('fetchPermissions calls setPermissions and setPage actions', (done) => {
      store.dispatch(fetchPermissions()).then(() => {
        const actions = store.getActions();
        expect(actions).toHaveLength(3);
        expect(actions[0]).toHaveProperty('type', SET_PERMISSIONS);
        expect(actions[1]).toHaveProperty('type', TOGGLE_LOADING);
        expect(actions[2]).toHaveProperty('type', SET_PAGE);
        done();
      }).catch(done.fail);
    });

    it('permissions is defined and properly valued', (done) => {
      store.dispatch(fetchPermissions()).then(() => {
        const actionPayload = store.getActions()[0].payload;
        expect(actionPayload.permissions).toHaveLength(LIST_PERMISSIONS_OK.length);
        const permission = actionPayload.permissions[0];
        expect(permission).toHaveProperty('code', 'editContents');
        expect(permission).toHaveProperty('descr', 'content Editing');
        done();
      }).catch(done.fail);
    });

    it('when getPermissions get error, should dispatch addErrors', (done) => {
      getPermissions.mockImplementation(mockApi({ errors: true }));
      store.dispatch(fetchPermissions()).then(() => {
        expect(getPermissions).toHaveBeenCalled();
        const actions = store.getActions();
        expect(actions).toHaveLength(2);
        expect(actions[0]).toHaveProperty('type', ADD_ERRORS);
        expect(actions[1]).toHaveProperty('type', TOGGLE_LOADING);
        done();
      }).catch(done.fail);
    });
  });
});
