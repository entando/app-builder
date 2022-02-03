import reducer, { initialState as smtpInitialState } from 'state/email-config/reducer';
import { SET_EMAIL_SENDERS, REMOVE_EMAIL_SENDER, SET_SMTP_SERVER } from 'state/email-config/types';
import { MOCK_EMAIL_SENDER_LIST, MOCK_SMTP_SERVER_SETTINGS } from '../../test/mocks/emailConfig';

describe('state/email-config/reducer', () => {
  const initialState = {
    senders: [],
    smtpServer: { ...smtpInitialState },
  };

  it('should return the initial state as the default returned object', () => {
    const state = reducer();
    expect(state).toEqual(initialState);
  });

  it('should return the correct state when action is SET_EMAIL_SENDERS', () => {
    const state = reducer(initialState, {
      type: SET_EMAIL_SENDERS, payload: MOCK_EMAIL_SENDER_LIST,
    });
    expect(state).toEqual({
      ...initialState,
      senders: MOCK_EMAIL_SENDER_LIST,
    });
  });

  it('should return the correct state when action is REMOVE_EMAIL_SENDER', () => {
    const state = reducer({
      ...initialState,
      senders: MOCK_EMAIL_SENDER_LIST,
    }, {
      type: REMOVE_EMAIL_SENDER, payload: MOCK_EMAIL_SENDER_LIST[1].code,
    });
    expect(state).toEqual({
      ...initialState,
      senders: [MOCK_EMAIL_SENDER_LIST[0]],
    });
  });

  it('should return the correct state when action is SET_SMTP_SERVER', () => {
    const state = reducer(initialState, {
      type: SET_SMTP_SERVER, payload: MOCK_SMTP_SERVER_SETTINGS,
    });
    expect(state).toEqual({
      ...initialState,
      smtpServer: { ...MOCK_SMTP_SERVER_SETTINGS },
    });
  });
});
