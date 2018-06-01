import { getActivityStream, postActivityStreamComment, deleteActivityStreamComment, postActivityStreamLike, deleteActivityStreamLike } from 'api/activityStream';
import { gotoRoute } from '@entando/router';
import { formattedText } from '@entando/utils';
import { ROUTE_HOME, ROUTE_PAGE_EDIT, ROUTE_USER_DETAIL } from 'app-init/router';
import { addErrors } from 'state/errors/actions';
import { toggleLoading } from 'state/loading/actions';
import { addToast } from 'state/toasts/actions';
import { TOAST_SUCCESS } from 'state/toasts/const';

import { TOGGLE_NOTIFICATION_DRAWER, ADD_NOTIFICATIONS, UPDATE_NOTIFCATION } from 'state/activity-stream/types';
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

export const updateNotification = notifcation => ({
  type: UPDATE_NOTIFCATION,
  payload: {
    notifcation,
  },
});

export const fetchNotifications = (page = { page: 1, pageSize: 10 }) => dispatch => (
  new Promise((resolve) => {
    const params = '?direction=DESC';
    dispatch(toggleLoading('activityStream'));
    getActivityStream(page, params).then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          dispatch(addNotifications(json.payload));
        } else {
          dispatch(addErrors(json.errors.map(e => e.message)));
        }
        dispatch(toggleLoading('activityStream'));
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
  const actions = notification.namespace.split('/');
  const index = (actions).findIndex(item => item === 'api') + 1;
  switch (actions[index]) {
    case 'pages': {
      gotoRoute(ROUTE_PAGE_EDIT, { pageCode: notification.parameters.pageCode });
      break;
    }
    default: gotoRoute(ROUTE_HOME); break;
  }
};

const wrapApiActivityStream = apiCall => (...params) => dispatch => (
  new Promise((resolve) => {
    apiCall(...params).then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          dispatch(updateNotification(json.payload));
        } else {
          dispatch(addErrors(json.errors.map(e => e.message)));
        }
        resolve();
      });
    });
  }));

export const sendPostActivityStreamComment = (recordId, comment) => dispatch =>
  dispatch(wrapApiActivityStream(postActivityStreamComment)({ recordId, comment }));

export const sendDeleteActivityStreamComment = (recordId, commentId) => dispatch =>
  dispatch(wrapApiActivityStream(deleteActivityStreamComment)({ recordId, commentId }));


export const sendPostActivityStreamLike = id => dispatch => (
  new Promise((resolve) => {
    postActivityStreamLike(id).then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          dispatch(updateNotification(json.payload));
          dispatch(addToast(formattedText('activityStream.like'), TOAST_SUCCESS));
        } else {
          dispatch(addErrors(json.errors.map(e => e.message)));
        }
        resolve();
      });
    });
  }));

export const sendDeleteActivityStreamLike = id => dispatch =>
  dispatch(wrapApiActivityStream(deleteActivityStreamLike)(id));
