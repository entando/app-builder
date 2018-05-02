import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { isFSA } from 'flux-standard-action';
import { setApis, setPlugins, fetchIntegration } from 'state/dashboard/actions';
import { mockApi } from 'test/testUtils';
import { getIntegration } from 'api/dashboard';
import { SET_APIS, SET_PLUGINS } from 'state/dashboard/types';
import { ADD_ERRORS } from 'state/errors/types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('state/plugins/actions', () => {
  let action;

  describe('setApis', () => {
    beforeEach(() => {
      action = setApis(2);
    });

    it('is FSA compliant', () => {
      expect(isFSA(action)).toBe(true);
    });

    it('is of type SET_APIS', () => {
      expect(action).toHaveProperty('type', SET_APIS);
    });

    it('defines payload property', () => {
      expect(action).toHaveProperty('payload');
      expect(action).toHaveProperty('payload.apis', 2);
    });
  });

  describe('setPlugins', () => {
    beforeEach(() => {
      action = setPlugins(3);
    });

    it('is FSA compliant', () => {
      expect(isFSA(action)).toBe(true);
    });

    it('is of type CLEAR_ALERT', () => {
      expect(action).toHaveProperty('type', SET_PLUGINS);
    });

    it('defines payload property', () => {
      expect(action).toHaveProperty('payload');
      expect(action).toHaveProperty('payload.plugins', 3);
    });
  });

  describe('thunks', () => {
    let store;
    beforeEach(() => {
      jest.clearAllMocks();
      store = mockStore({});
    });

    describe('fetchIntegration', () => {
      it('fetchUsers calls setUsers and setPage actions', (done) => {
        store.dispatch(fetchIntegration()).then(() => {
          const actions = store.getActions();
          expect(getIntegration).toHaveBeenCalled();
          expect(actions).toHaveLength(2);
          expect(actions[0]).toHaveProperty('type', SET_APIS);
          expect(actions[1]).toHaveProperty('type', SET_PLUGINS);
          done();
        }).catch(done.fail);
      });

      it('when fetchUsers get error, should dispatch addErrors', (done) => {
        getIntegration.mockImplementationOnce(mockApi({ errors: true }));
        store.dispatch(fetchIntegration()).then(() => {
          expect(getIntegration).toHaveBeenCalled();
          const actions = store.getActions();
          expect(actions).toHaveLength(1);
          expect(actions[0]).toHaveProperty('type', ADD_ERRORS);
          done();
        }).catch(done.fail);
      });
    });
  });
});
