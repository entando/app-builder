import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { ADD_ERRORS, ADD_TOAST, TOAST_ERROR, TOAST_SUCCESS } from '@entando/messages';

import {
  fetchSMTPServerSettings,
  saveEmailConfig,
  testEmailConfig,
  sendTestEmail,
  fetchEmailSenders,
  setEmailSenders,
  deleteEmailSender,
  addEmailSender,
  fetchEmailSender,
  updateEmailSender,
  setSmtpServer,
  setSelectedSender,
} from 'state/email-config/actions';
import {
  getSMTPServerSettings,
  putSMTPServerSettings,
  postTestEmailConfig,
  postSendTestEmail,
  getEmailSenders,
  deleteEmailSender as deleteEmailSenderRequest,
  postEmailSender,
  getEmailSender,
  putEmailSender,
} from 'api/emailConfig';
import { SET_EMAIL_SENDERS, REMOVE_EMAIL_SENDER, SET_SELECTED_SENDER } from 'state/email-config/types';
import { MOCK_SMTP_SERVER_SETTINGS, MOCK_EMAIL_SENDER_LIST, MOCK_EMAIL_SENDER } from 'test/mocks/emailConfig';
import { mockApi } from 'test/testUtils';
import { history } from 'app-init/router';

jest.mock('api/emailConfig', () => ({
  getSMTPServerSettings: jest.fn(),
  putSMTPServerSettings: jest.fn(),
  postTestEmailConfig: jest.fn(),
  postSendTestEmail: jest.fn(),
  getEmailSenders: jest.fn(),
  deleteEmailSender: jest.fn(),
  postEmailSender: jest.fn(),
  getEmailSender: jest.fn(),
  putEmailSender: jest.fn(),
}));

history.push = jest.fn();

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

  const dispatch = action => store.dispatch(action);

  const getActions = () => store.getActions();

  beforeEach(() => {
    store = createMockStore({});
  });

  describe('setEmailSenders', () => {
    it('should create the correct action object', () => {
      expect(setEmailSenders(MOCK_EMAIL_SENDER_LIST)).toEqual({
        type: SET_EMAIL_SENDERS,
        payload: MOCK_EMAIL_SENDER_LIST,
      });
    });
  });

  describe('setSelectedSender', () => {
    it('should create the correct action object', () => {
      expect(setSelectedSender(MOCK_EMAIL_SENDER)).toEqual({
        type: SET_SELECTED_SENDER,
        payload: MOCK_EMAIL_SENDER,
      });
    });
  });

  describe('fetchSMTPServerSettings', () => {
    it('should initialize the email config form on success', (done) => {
      setupMockResponse(getSMTPServerSettings, MOCK_SMTP_SERVER_SETTINGS);

      const expectedActions = [
        setSmtpServer(MOCK_SMTP_SERVER_SETTINGS),
      ];

      dispatch(fetchSMTPServerSettings()).then(() => {
        const actions = getActions();
        expect(actions).toEqual(expectedActions);
        done();
      }).catch(done.fail);
    });

    it('should dispatch the correct actions on error', (done) => {
      setupMockError(getSMTPServerSettings);

      const expectedActions = [MOCK_ADD_ERRORS_ACTION, MOCK_ADD_TOAST_ERROR_ACTION];

      dispatch(fetchSMTPServerSettings()).then(() => {
        const actions = getActions();
        expect(actions).toEqual(expectedActions);
        done();
      }).catch(done.fail);
    });
  });

  describe('saveEmailConfig', () => {
    it('should re-initialize the email config form with new values on success', (done) => {
      setupMockResponseFromParams(putSMTPServerSettings);

      const expectedActions = [
        { type: ADD_TOAST, payload: { message: { id: 'emailConfig.saveSuccessful' }, type: TOAST_SUCCESS } },
      ];

      dispatch(saveEmailConfig(MOCK_SMTP_SERVER_SETTINGS)).then(() => {
        const actions = getActions();
        expect(actions).toEqual(expectedActions);
        done();
      }).catch(done.fail);
    });

    it('should dispatch the correct actions on error', (done) => {
      setupMockError(putSMTPServerSettings);

      const expectedActions = [MOCK_ADD_ERRORS_ACTION, MOCK_ADD_TOAST_ERROR_ACTION];

      dispatch(saveEmailConfig()).then(() => {
        const actions = getActions();
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

      dispatch(testEmailConfig(MOCK_SMTP_SERVER_SETTINGS)).then(() => {
        const actions = getActions();
        expect(actions).toEqual(expectedActions);
        done();
      }).catch(done.fail);
    });

    it('should dispatch the correct actions on error', (done) => {
      setupMockError(postTestEmailConfig);

      const expectedActions = [MOCK_ADD_ERRORS_ACTION, MOCK_ADD_TOAST_ERROR_ACTION];

      dispatch(testEmailConfig()).then(() => {
        const actions = getActions();
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

      dispatch(sendTestEmail()).then(() => {
        const actions = getActions();
        expect(actions).toEqual(expectedActions);
        done();
      }).catch(done.fail);
    });

    it('should dispatch the correct actions on error', (done) => {
      setupMockError(postSendTestEmail);

      const expectedActions = [MOCK_ADD_ERRORS_ACTION, MOCK_ADD_TOAST_ERROR_ACTION];

      dispatch(sendTestEmail()).then(() => {
        const actions = getActions();
        expect(actions).toEqual(expectedActions);
        done();
      }).catch(done.fail);
    });
  });

  describe('fetchEmailSenders', () => {
    it('should set email sender list on success', (done) => {
      setupMockResponse(getEmailSenders, MOCK_EMAIL_SENDER_LIST);

      const expectedActions = [
        { type: SET_EMAIL_SENDERS, payload: MOCK_EMAIL_SENDER_LIST },
      ];

      dispatch(fetchEmailSenders()).then(() => {
        const actions = getActions();
        expect(actions).toEqual(expectedActions);
        done();
      }).catch(done.fail);
    });

    it('should dispatch the correct actions on error', (done) => {
      setupMockError(getEmailSenders);

      const expectedActions = [MOCK_ADD_ERRORS_ACTION, MOCK_ADD_TOAST_ERROR_ACTION];

      dispatch(fetchEmailSenders()).then(() => {
        const actions = getActions();
        expect(actions).toEqual(expectedActions);
        done();
      }).catch(done.fail);
    });
  });

  describe('deleteEmailSender', () => {
    it('should remove email sender and dispatch a toast action on success', (done) => {
      setupMockResponseFromParams(deleteEmailSenderRequest);

      const testCode = 'testcode';
      const expectedActions = [
        { type: REMOVE_EMAIL_SENDER, payload: testCode },
        { type: ADD_TOAST, payload: { message: { id: 'app.deleted', values: { type: 'sender', code: testCode } }, type: TOAST_SUCCESS } },
      ];

      dispatch(deleteEmailSender(testCode)).then(() => {
        const actions = getActions();
        expect(actions).toEqual(expectedActions);
        done();
      }).catch(done.fail);
    });

    it('should dispatch the correct actions on error', (done) => {
      setupMockError(deleteEmailSenderRequest);

      const expectedActions = [MOCK_ADD_ERRORS_ACTION, MOCK_ADD_TOAST_ERROR_ACTION];

      dispatch(deleteEmailSender()).then(() => {
        const actions = getActions();
        expect(actions).toEqual(expectedActions);
        done();
      }).catch(done.fail);
    });
  });

  describe('addEmailSender', () => {
    it('should redirect to email senders on success', (done) => {
      setupMockResponseFromParams(postEmailSender);

      const sender = { code: 'testcode', email: 'testemail@test.com' };
      const expectedActions = [
        { type: ADD_TOAST, payload: { message: { id: 'app.created', values: { type: 'sender', code: sender.code } }, type: TOAST_SUCCESS } },
      ];

      dispatch(addEmailSender(sender)).then(() => {
        const actions = getActions();
        expect(postEmailSender).toHaveBeenCalledWith(sender);
        expect(history.push).toHaveBeenCalledWith('/email-config/senders');
        expect(actions).toEqual(expectedActions);
        done();
      }).catch(done.fail);
    });

    it('should dispatch the correct actions on error', (done) => {
      setupMockError(postEmailSender);

      const expectedActions = [MOCK_ADD_ERRORS_ACTION, MOCK_ADD_TOAST_ERROR_ACTION];

      dispatch(addEmailSender()).then(() => {
        const actions = getActions();
        expect(actions).toEqual(expectedActions);
        done();
      }).catch(done.fail);
    });
  });

  describe('fetchEmailSender', () => {
    it('should initialize the email sender form on success', (done) => {
      setupMockResponse(getEmailSender, MOCK_EMAIL_SENDER);

      const expectedActions = [
        { type: SET_SELECTED_SENDER, payload: MOCK_EMAIL_SENDER },
      ];

      dispatch(fetchEmailSender(MOCK_EMAIL_SENDER.code)).then(() => {
        const actions = getActions();
        expect(getEmailSender).toHaveBeenCalledWith(MOCK_EMAIL_SENDER.code);
        expect(actions).toEqual(expectedActions);
        done();
      }).catch(done.fail);
    });

    it('should dispatch the correct actions on error', (done) => {
      setupMockError(getEmailSender);

      const expectedActions = [MOCK_ADD_ERRORS_ACTION, MOCK_ADD_TOAST_ERROR_ACTION];

      dispatch(fetchEmailSender()).then(() => {
        const actions = getActions();
        expect(actions).toEqual(expectedActions);
        done();
      }).catch(done.fail);
    });
  });

  describe('updateEmailSender', () => {
    it('should redirect to email senders on success', (done) => {
      setupMockResponseFromParams(putEmailSender);

      const sender = { code: 'testcode', email: 'testemail@test.com' };
      const expectedActions = [
        { type: ADD_TOAST, payload: { message: { id: 'app.updated', values: { type: 'sender', code: sender.code } }, type: TOAST_SUCCESS } },
      ];

      dispatch(updateEmailSender(sender)).then(() => {
        const actions = getActions();
        expect(putEmailSender).toHaveBeenCalledWith(sender);
        expect(history.push).toHaveBeenCalledWith('/email-config/senders');
        expect(actions).toEqual(expectedActions);
        done();
      }).catch(done.fail);
    });

    it('should dispatch the correct actions on error', (done) => {
      setupMockError(putEmailSender);

      const expectedActions = [MOCK_ADD_ERRORS_ACTION, MOCK_ADD_TOAST_ERROR_ACTION];

      dispatch(updateEmailSender()).then(() => {
        const actions = getActions();
        expect(actions).toEqual(expectedActions);
        done();
      }).catch(done.fail);
    });
  });
});
