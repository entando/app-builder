// import { getApiNotifications } from 'api/notification';
import { getActivityStream, postActivityStreamComment } from 'api/activityStream';
import { gotoRoute } from '@entando/router';
import { convertToQueryString } from '@entando/utils';
import { ROUTE_USER_DETAIL } from 'app-init/router';
import { addErrors } from 'state/errors/actions';
import { TOGGLE_NOTIFICATION_DRAWER, ADD_NOTIFICATIONS, ADD_COMMENT, REMOVE_COMMENT } from 'state/activity-stream/types';
import { getHidden, getNotifications } from 'state/activity-stream/selectors';

export const toggleNotificationDrawer = () => ({
  type: TOGGLE_NOTIFICATION_DRAWER,
});

export const addNotifications = notifications => ({
  type: ADD_NOTIFICATIONS,
  payload: {
    notifications,
  },
});

export const addComment = notifcation => ({
  type: ADD_COMMENT,
  payload: {
    notifcation,
  },
});

export const removeComment = (recordId, commentId) => ({
  type: REMOVE_COMMENT,
  payload: {
    recordId,
    commentId,
  },
});

export const fetchNotifications = (page = { page: 1, pageSize: 10 }) => dispatch => (
  new Promise((resolve) => {
    const params = convertToQueryString({
      sorting: {
        attribute: 'id',
        direction: 'DESC',
      },
    });
    console.log(params);
    getActivityStream(page, '?direction=DESC').then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          dispatch(addNotifications(json.payload));
        } else {
          dispatch(addErrors(json.errors.map(e => e.message)));
        }
        resolve();
      });
    });
  }));


export const toggleNotificationList = () => (dispatch, getState) => {
  dispatch(toggleNotificationDrawer());
  if (!getHidden(getState())) {
    dispatch(fetchNotifications());
  }
};


export const getRouteUserName = id => (dispatch, getState) => {
  const notification = getNotifications(getState()).find(item => item.id === id);
  gotoRoute(ROUTE_USER_DETAIL, {
    username: notification.username,
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

export const sendPostActivityStreamComment = (recordId, comment) => dispatch =>
  new Promise((resolve) => {
    postActivityStreamComment({ recordId, comment }).then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          dispatch(addComment(json.payload));
        }
        dispatch(addErrors(json.errors.map(e => e.message)));
        resolve();
      });
    });
  });

export const sendDeleteActivityStreamComment = (recordId, commentId) => dispatch =>
  new Promise((resolve) => {
    postActivityStreamComment({ recordId, commentId }).then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          dispatch(removeComment(json.payload, commentId));
        }
        dispatch(addErrors(json.errors.map(e => e.message)));
        resolve();
      });
    });
  });
