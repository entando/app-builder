import { getApiNotifications } from 'api/notification';
import { gotoRoute } from '@entando/router';
import { TOGGLE_NOTIFICATION_DRAWER, ADD_NOTIFICATIONS } from 'state/activity-stream/types';
import { getHidden, getNotifications } from 'state/activity-stream/selectors';
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

export const fetchNotifications = () => dispatch => (
  getApiNotifications().then((data) => {
    dispatch(addNotifications(data.payload.notifications));
  })
);

// if you have to check a property before call a dispatch action,
// you have to use a thunk by passing a second argument to check the state
export const toggleNotificationList = () => (dispatch, getState) => {
  dispatch(toggleNotificationDrawer());
  if (!getHidden(getState())) {
    dispatch(fetchNotifications());
  }
};


export const getRouteUserName = id => (dispatch, getState) => {
  const notification = getNotifications(getState()).find(item => item.id === id);
  gotoRoute('userprofile', {
    username: notification.author.username,
  });
};


export const getRouteTargetName = id => (dispatch, getState) => {
  const notification = getNotifications(getState()).find(item => item.id === id);
  switch (notification.targetType) {
    case 'content':
      gotoRoute('content', {
        content: notification.target.pageCode,
        frame: notification.target.frame,
      });
      break;
    case 'widget':
      gotoRoute('widget', {
        widget: notification.target.id,
      });
      break;
    case 'page':
      gotoRoute('page', {
        page: notification.target.pageCode,
      });
      break;
    default: gotoRoute('dashboard'); break;
  }
};
