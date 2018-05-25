import { combineReducers } from 'redux';
import { TOGGLE_NOTIFICATION_DRAWER, ADD_NOTIFICATIONS, UPDATE_NOTIFCATION } from 'state/activity-stream/types';

const toMap = array => array.reduce((acc, notification) => {
  acc[notification.id] = notification;
  return acc;
}, {});

export const list = (state = [], action = {}) => {
  switch (action.type) {
    case ADD_NOTIFICATIONS: {
      return action.payload.notifications.map(notification => notification.id);
    }
    default: return state;
  }
};

export const map = (state = [], action = {}) => {
  switch (action.type) {
    case ADD_NOTIFICATIONS: {
      return toMap(action.payload.notifications);
    }
    case UPDATE_NOTIFCATION: {
      const { id } = action.payload.notifcation;
      return ({ ...state, [id]: action.payload.notifcation });
    }
    default: return state;
  }
};

const hidden = (state = true, action = {}) => {
  switch (action.type) {
    case TOGGLE_NOTIFICATION_DRAWER: {
      return !state;
    }
    default: return state;
  }
};

export default combineReducers({
  list,
  map,
  hidden,
});
