import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { isFSA } from 'flux-standard-action';
import {
  setApis,
  setPlugins,
  setPageStatus,
  fetchIntegration,
  fetchPageStatus,
} from 'state/dashboard/actions';
import { mockApi } from 'test/testUtils';
import { getIntegration, getPageStatus } from 'api/dashboard';
import { SET_APIS, SET_PLUGINS, SET_PAGE_STATUS } from 'state/dashboard/types';
import { ADD_ERRORS } from 'state/errors/types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('state/dashboard/actions', () => {
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

  describe('setPageStatus', () => {
    const pageStatus = {
      draft: 1,
      published: 2,
      unpublished: 3,
    };

    beforeEach(() => {
      action = setPageStatus(pageStatus);
    });

    it('is FSA compliant', () => {
      expect(isFSA(action)).toBe(true);
    });

    it('is of type CLEAR_ALERT', () => {
      expect(action).toHaveProperty('type', SET_PAGE_STATUS);
    });

    it('defines payload property', () => {
      expect(action).toHaveProperty('payload');
      expect(action).toHaveProperty('payload.pageStatus', pageStatus);
    });
  });

  describe('thunks', () => {
    let store;
    beforeEach(() => {
      jest.clearAllMocks();
      store = mockStore({});
    });

    describe('fetchIntegration', () => {
      it('calls the SET_APIS and SET_PLUGINS actions', (done) => {
        store.dispatch(fetchIntegration()).then(() => {
          const actions = store.getActions();
          expect(getIntegration).toHaveBeenCalled();
          expect(actions).toHaveLength(2);
          expect(actions[0]).toHaveProperty('type', SET_APIS);
          expect(actions[1]).toHaveProperty('type', SET_PLUGINS);
          done();
        }).catch(done.fail);
      });

      it('when getIntegration errors it should dispatch addErrors', (done) => {
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

    describe('fetchPageStatus', () => {
      it('calls the SET_PAGE_STATUS actions', (done) => {
        store.dispatch(fetchPageStatus()).then(() => {
          const actions = store.getActions();
          expect(getPageStatus).toHaveBeenCalled();
          expect(actions).toHaveLength(1);
          expect(actions[0]).toHaveProperty('type', SET_PAGE_STATUS);
          done();
        }).catch(done.fail);
      });

      it('when getPageStatus errors it should dispatch addErrors', (done) => {
        getPageStatus.mockImplementationOnce(mockApi({ errors: true }));
        store.dispatch(fetchPageStatus()).then(() => {
          expect(getPageStatus).toHaveBeenCalled();
          const actions = store.getActions();
          expect(actions).toHaveLength(1);
          expect(actions[0]).toHaveProperty('type', ADD_ERRORS);
          done();
        }).catch(done.fail);
      });
    });
  });
});
