import { combineReducers } from 'redux';

import { REMOVE_EMAIL_SENDER, SET_EMAIL_SENDERS, SET_SELECTED_SENDER } from 'state/email-config/types';

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

const selectedSender = (state = {}, action = {}) => {
  switch (action.type) {
    case SET_SELECTED_SENDER:
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  senders,
  selectedSender,
});
