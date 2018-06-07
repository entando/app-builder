import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { isFSA } from 'flux-standard-action';
import { ADD_TOAST, ADD_ERRORS } from '@entando/messages';

import {
  setUserSettings,
  fetchUserSettings,
  updateUserSettings,
} from 'state/user-settings/actions';
import { mockApi } from 'test/testUtils';
import { getUserSettings, putUserSettings } from 'api/userSettings';
import { SET_USER_SETTINGS } from 'state/user-settings/types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('state/user-settings/actions', () => {
  let action;

  describe('setUserSettings', () => {
    beforeEach(() => {
      action = setUserSettings({ attribute: true });
    });

    it('is FSA compliant', () => {
      expect(isFSA(action)).toBe(true);
    });

    it('is of type SET_APIS', () => {
      expect(action).toHaveProperty('type', SET_USER_SETTINGS);
    });

    it('defines payload property', () => {
      expect(action).toHaveProperty('payload');
      expect(action).toHaveProperty('payload.settings', { attribute: true });
    });
  });

  describe('thunks', () => {
    let store;
    beforeEach(() => {
      jest.clearAllMocks();
      store = mockStore({});
    });

    describe('fetchUserSettings', () => {
      it('calls the SET_USER_SETTINGS action', (done) => {
        store.dispatch(fetchUserSettings()).then(() => {
          const actions = store.getActions();
          expect(getUserSettings).toHaveBeenCalled();
          expect(actions).toHaveLength(2);
          expect(actions[0]).toHaveProperty('type', SET_USER_SETTINGS);
          expect(actions[1]).toHaveProperty('type', '@@redux-form/INITIALIZE');
          done();
        }).catch(done.fail);
      });

      it('when getUserSettings errors it should dispatch addErrors', (done) => {
        getUserSettings.mockImplementationOnce(mockApi({ errors: true }));
        store.dispatch(fetchUserSettings()).then(() => {
          expect(getUserSettings).toHaveBeenCalled();
          const actions = store.getActions();
          expect(actions).toHaveLength(2);
          expect(actions[0]).toHaveProperty('type', ADD_ERRORS);
          expect(actions[1]).toHaveProperty('type', ADD_TOAST);
          expect(actions[1].payload).toHaveProperty('type', 'error');
          done();
        }).catch(done.fail);
      });
    });

    describe('updateUserSettings', () => {
      it('calls the SET_USER_SETTINGS action', (done) => {
        store.dispatch(updateUserSettings()).then(() => {
          const actions = store.getActions();
          expect(putUserSettings).toHaveBeenCalled();
          expect(actions).toHaveLength(2);
          expect(actions[0]).toHaveProperty('type', SET_USER_SETTINGS);
          expect(actions[1]).toHaveProperty('type', ADD_TOAST);
          expect(actions[1].payload).toHaveProperty('type', 'success');
          done();
        }).catch(done.fail);
      });

      it('when putUserSettings errors it should dispatch addErrors', (done) => {
        putUserSettings.mockImplementationOnce(mockApi({ errors: true }));
        store.dispatch(updateUserSettings()).then(() => {
          expect(putUserSettings).toHaveBeenCalled();
          const actions = store.getActions();
          expect(actions).toHaveLength(2);
          expect(actions[0]).toHaveProperty('type', ADD_ERRORS);
          expect(actions[1]).toHaveProperty('type', ADD_TOAST);
          done();
        }).catch(done.fail);
      });
    });
  });
});
