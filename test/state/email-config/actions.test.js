import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { initialize } from 'redux-form';
import { ADD_ERRORS, ADD_TOAST, TOAST_ERROR, TOAST_SUCCESS } from '@entando/messages';

import {
  fetchSMTPServerSettings,
  saveEmailConfig,
  testEmailConfig,
  sendTestEmail,
} from 'state/email-config/actions';
import {
  getSMTPServerSettings,
  putSMTPServerSettings,
  postTestEmailConfig,
  postSendTestEmail,
} from 'api/emailConfig';
import { MOCK_SMTP_SERVER_SETTINGS } from 'test/mocks/emailConfig';
import { mockApi } from 'test/testUtils';

jest.mock('api/emailConfig', () => ({
  getSMTPServerSettings: jest.fn(),
  putSMTPServerSettings: jest.fn(),
  postTestEmailConfig: jest.fn(),
  postSendTestEmail: jest.fn(),
}));

const middlewares = [thunk];
const createMockStore = configureMockStore(middlewares);

const MOCK_ERROR_MESSAGE = 'Test error message';

const MOCK_ADD_ERRORS_ACTION = {
  type: ADD_ERRORS,
  payload: { errors: [MOCK_ERROR_MESSAGE] },
};

const MOCK_ADD_TOAST_ERROR_ACTION = {
  type: ADD_TOAST,
  payload: { message: MOCK_ERROR_MESSAGE, type: TOAST_ERROR },
};

const setupMockResponse = (apiFunc, payload) => {
  apiFunc.mockImplementation(mockApi({ payload }));
};

const setupMockResponseFromParams = (apiFunc) => {
  apiFunc.mockImplementation(params => mockApi({ payload: params })());
};

const setupMockError = (apiFunc) => {
  apiFunc.mockImplementation(mockApi({
    errors: [{ message: MOCK_ERROR_MESSAGE }],
  }));
};

describe('state/email-config/actions', () => {
  let store;

  beforeEach(() => {
    store = createMockStore({});
  });

  describe('fetchSMTPServerSettings', () => {
    it('should initialize the email config form on success', (done) => {
      setupMockResponse(getSMTPServerSettings, MOCK_SMTP_SERVER_SETTINGS);

      const expectedActions = [
        initialize('emailConfig', MOCK_SMTP_SERVER_SETTINGS),
      ];

      store.dispatch(fetchSMTPServerSettings()).then(() => {
        const actions = store.getActions();
        expect(actions).toEqual(expectedActions);
        done();
      }).catch(done.fail);
    });

    it('should dispatch the correct actions on error', (done) => {
      setupMockError(getSMTPServerSettings);

      const expectedActions = [
        MOCK_ADD_ERRORS_ACTION,
        MOCK_ADD_TOAST_ERROR_ACTION,
      ];

      store.dispatch(fetchSMTPServerSettings()).then(() => {
        const actions = store.getActions();
        expect(actions).toEqual(expectedActions);
        done();
      }).catch(done.fail);
    });
  });

  describe('saveEmailConfig', () => {
    it('should re-initialize the email config form with new values on success', (done) => {
      setupMockResponseFromParams(putSMTPServerSettings);

      const expectedActions = [
        initialize('emailConfig', MOCK_SMTP_SERVER_SETTINGS),
      ];

      store.dispatch(saveEmailConfig(MOCK_SMTP_SERVER_SETTINGS)).then(() => {
        const actions = store.getActions();
        expect(actions).toEqual(expectedActions);
        done();
      }).catch(done.fail);
    });

    it('should dispatch the correct actions on error', (done) => {
      setupMockError(putSMTPServerSettings);

      const expectedActions = [
        MOCK_ADD_ERRORS_ACTION,
        MOCK_ADD_TOAST_ERROR_ACTION,
      ];

      store.dispatch(saveEmailConfig()).then(() => {
        const actions = store.getActions();
        expect(actions).toEqual(expectedActions);
        done();
      }).catch(done.fail);
    });
  });

  describe('testEmailConfig', () => {
    it('should dispatch a toast action on success', (done) => {
      setupMockResponseFromParams(postTestEmailConfig);

      const expectedActions = [
        { type: ADD_TOAST, payload: { message: { id: 'emailConfig.valid' }, type: TOAST_SUCCESS } },
      ];

      store.dispatch(testEmailConfig(MOCK_SMTP_SERVER_SETTINGS)).then(() => {
        const actions = store.getActions();
        expect(actions).toEqual(expectedActions);
        done();
      }).catch(done.fail);
    });

    it('should dispatch the correct actions on error', (done) => {
      setupMockError(postTestEmailConfig);

      const expectedActions = [
        MOCK_ADD_ERRORS_ACTION,
        MOCK_ADD_TOAST_ERROR_ACTION,
      ];

      store.dispatch(testEmailConfig()).then(() => {
        const actions = store.getActions();
        expect(actions).toEqual(expectedActions);
        done();
      }).catch(done.fail);
    });
  });

  describe('sendTestEmail', () => {
    it('should dispatch a toast action on success', (done) => {
      setupMockResponse(postSendTestEmail);

      const expectedActions = [
        { type: ADD_TOAST, payload: { message: { id: 'emailConfig.sendTestSuccess' }, type: TOAST_SUCCESS } },
      ];

      store.dispatch(sendTestEmail()).then(() => {
        const actions = store.getActions();
        expect(actions).toEqual(expectedActions);
        done();
      }).catch(done.fail);
    });

    it('should dispatch the correct actions on error', (done) => {
      setupMockError(postSendTestEmail);

      const expectedActions = [
        MOCK_ADD_ERRORS_ACTION,
        MOCK_ADD_TOAST_ERROR_ACTION,
      ];

      store.dispatch(sendTestEmail()).then(() => {
        const actions = store.getActions();
        expect(actions).toEqual(expectedActions);
        done();
      }).catch(done.fail);
    });
  });
});
