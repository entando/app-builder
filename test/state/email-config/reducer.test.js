import reducer from 'state/email-config/reducer';
import { SET_EMAIL_SENDERS } from 'state/email-config/types';
import { MOCK_EMAIL_SENDER_LIST } from '../../test/mocks/emailConfig';

describe('state/email-config/reducer', () => {
  const initialState = {
    senders: [],
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
});
