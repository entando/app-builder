import { routeConverter } from '@entando/utils';
import { addToast, addErrors, TOAST_SUCCESS, TOAST_ERROR } from '@entando/messages';

import {
  getActivityStream,
  postActivityStreamComment,
  deleteActivityStreamComment,
  postActivityStreamLike,
  deleteActivityStreamLike,
} from 'api/activityStream';
import { toggleLoading } from 'state/loading/actions';
import { getHidden, getNotifications } from 'state/activity-stream/selectors';
import {
  history,
  ROUTE_HOME,
  ROUTE_PAGE_EDIT,
  ROUTE_USER_DETAIL,
} from 'app-init/router';
import { TOGGLE_NOTIFICATION_DRAWER, ADD_NOTIFICATIONS, UPDATE_NOTIFCATION } from 'state/activity-stream/types';

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
          json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
        }
        dispatch(toggleLoading('activityStream'));
        resolve();
      });
    }).catch(() => {});
  }));


export const toggleNotificationList = () => (dispatch, getState) => {
  dispatch(toggleNotificationDrawer());
  if (!getHidden(getState())) {
    dispatch(fetchNotifications());
  }
};


export const getRouteUserName = id => (dispatch, getState) => {
  const notification = getNotifications(getState()).find(item => item.id === id);
  history.push(routeConverter(ROUTE_USER_DETAIL, {
    username: notification.username,
  }));
};


export const getRouteTargetName = id => (dispatch, getState) => {
  const notification = getNotifications(getState()).find(item => item.id === id);
  const actions = notification.namespace.split('/');
  const index = (actions).findIndex(item => item === 'api') + 1;
  switch (actions[index]) {
    case 'pages': {
      history.push(routeConverter(ROUTE_PAGE_EDIT, { pageCode: notification.parameters.pageCode }));
      break;
    }
    default: history.push(ROUTE_HOME); break;
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
          json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
        }
        resolve();
      });
    }).catch(() => {});
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
          dispatch(addToast({ id: 'activityStream.like' }, TOAST_SUCCESS));
        } else {
          dispatch(addErrors(json.errors.map(e => e.message)));
          json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
        }
        resolve();
      });
    }).catch(() => {});
  }));

export const sendDeleteActivityStreamLike = id => dispatch =>
  dispatch(wrapApiActivityStream(deleteActivityStreamLike)(id));
