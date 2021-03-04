import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { initialize } from 'redux-form';
import { ADD_ERRORS, ADD_TOAST, TOAST_ERROR } from '@entando/messages';

import { fetchSMTPServerSettings } from 'state/email-config/actions';
import { getSMTPServerSettings } from 'api/emailConfig';
import { MOCK_SMTP_SERVER_SETTINGS } from 'test/mocks/emailConfig';

jest.mock('api/emailConfig', () => ({
  getSMTPServerSettings: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('state/email-config/actions', () => {
  let store;

  beforeEach(() => {
    store = mockStore({});
  });

  describe('fetchSMTPServerSettings', () => {
    it('should initialize the email sender form on success', (done) => {
      const GET_SMTP_SERVER_SETTINGS_RESPONSE = {
        ok: true,
        json: () => new Promise(res => res({ payload: MOCK_SMTP_SERVER_SETTINGS })),
      };
      getSMTPServerSettings.mockReturnValueOnce(new Promise(resolve =>
        resolve(GET_SMTP_SERVER_SETTINGS_RESPONSE)));

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
      const errorMessage = 'Test error message';
      const MOCK_ERROR_RESPONSE = {
        ok: false,
        json: () => new Promise(res => res({ errors: [{ message: errorMessage }] })),
      };
      getSMTPServerSettings.mockReturnValueOnce(new Promise(resolve =>
        resolve(MOCK_ERROR_RESPONSE)));

      const expectedActions = [
        { type: ADD_ERRORS, payload: { errors: [errorMessage] } },
        { type: ADD_TOAST, payload: { message: errorMessage, type: TOAST_ERROR } },
      ];

      store.dispatch(fetchSMTPServerSettings()).then(() => {
        const actions = store.getActions();
        expect(actions).toEqual(expectedActions);
        done();
      }).catch(done.fail);
    });
  });
});
