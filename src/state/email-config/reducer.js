import { combineReducers } from 'redux';

import { REMOVE_EMAIL_SENDER, SET_EMAIL_SENDERS, SET_SMTP_SERVER } from 'state/email-config/types';

const senders = (state = [], action = {}) => {
  switch (action.type) {
    case SET_EMAIL_SENDERS:
      return action.payload;
    case REMOVE_EMAIL_SENDER:
      return state.filter(({ code }) => code !== action.payload);
    default:
      return state;
  }
};

export const initialState = {
  active: false,
  debugMode: false,
  host: '',
  port: '',
  protocol: '',
  checkServerIdentity: false,
  timeout: '',
  username: '',
  password: '',
};

const smtpServer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_SMTP_SERVER:
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  senders,
  smtpServer,
});
