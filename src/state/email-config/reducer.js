import { combineReducers } from 'redux';

import { SET_EMAIL_SENDERS } from 'state/email-config/types';

const senders = (state = [], action = {}) => {
  switch (action.type) {
    case SET_EMAIL_SENDERS:
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  senders,
});
