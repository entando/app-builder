import { combineReducers } from 'redux';
import { TOGGLE_NOTIFICATION_DRAWER, ADD_NOTIFICATIONS } from 'state/activity-stream/types';


const hidden = (state = true, action = {}) => {
  switch (action.type) {
    case TOGGLE_NOTIFICATION_DRAWER: {
      return !state;
    }
    default: return state;
  }
};

const notifications = (state = [], action = {}) => {
  switch (action.type) {
    case ADD_NOTIFICATIONS: {
      return action.payload.notifications;
    }
    default: return state;
  }
};

export default combineReducers({ hidden, notifications });
