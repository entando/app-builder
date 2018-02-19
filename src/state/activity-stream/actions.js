import { getApiNotifications } from 'api/notification';
import { gotoRoute } from 'frontend-common-components';
import { TOGGLE_NOTIFICATION_DRAWER, ADD_NOTIFICATIONS } from './types';
import { getHidden } from './selectors';
// declare action for close notification drawer
// eslint-disable-next-line
export const toggleNotificationDrawer = () => ({
  type: TOGGLE_NOTIFICATION_DRAWER,
});

export const addNotifications = notifications => ({
  type: ADD_NOTIFICATIONS,
  payload: {
    notifications,
  },
});

export const getNotifications = () => (dispatch) => {
  getApiNotifications().then((data) => {
    dispatch(addNotifications(data.payload.notifications));
  });
};

// if you have to check a property before call a dispatch action,
// you have to use a thunk by passing a second argument to check the state
export const toggleNotificationList = () => (dispatch, getState) => {
  dispatch(toggleNotificationDrawer());
  if (!getHidden(getState())) {
    dispatch(getNotifications());
  }
};


export const getRouteUserName = id => (dispatch, getState) => {
  const notification = getState().activityStream.notifications.find(item => item.id === id);
  gotoRoute('userprofile', {
    username: notification.author.username,
  });
};
