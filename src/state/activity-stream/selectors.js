import { createSelector } from 'reselect';
import { isNull, isUndefined, isEmpty, get } from 'lodash';
import { routeConverter } from '@entando/utils';
import { getLocale } from 'state/locale/selectors';
import { ROUTE_DASHBOARD, ROUTE_PAGE_DETAIL } from 'app-init/router';
import apps from 'entando-apps';

export const getActivityStream = state => state.activityStream;
const getActivityStreamList = createSelector(getActivityStream, root => root.list);
const getActivityStreamMap = createSelector(getActivityStream, root => root.map);

export const getHidden = createSelector(
  [getActivityStream],
  activityStream => activityStream.hidden,
);

const getActionText = (notification) => {
  let actionText;
  apps.every((app) => {
    const { notificationMaker } = app;
    if (notificationMaker && notificationMaker.getActionText) {
      actionText = notificationMaker.getActionText(notification);
      if (actionText) {
        return false;
      }
    }
    return true;
  });
  if (actionText) {
    return actionText;
  }

  const { actionName, parameters } = notification;

  switch (actionName.toUpperCase()) {
    case 'POST': {
      if (isEmpty(parameters)) {
        return 'activityStream.newPage';
      }
      return 'activityStream.editPage';
    }
    case 'PUT': {
      return 'activityStream.editPage';
    }
    case 'DELETE': {
      return 'activityStream.deletePage';
    }
    case 'SAVE': {
      if (isEmpty(parameters)) {
        return 'activityStream.newPage';
      }
      return 'activityStream.savePage';
    }
    case 'SAVECONFIGURE': {
      return 'activityStream.modifyPage';
    }
    default: return '';
  }
};

const getTargetText = (notification, locale) => {
  let targetText;
  apps.every((app) => {
    const { notificationMaker } = app;
    if (notificationMaker && notificationMaker.getTargetText) {
      targetText = notificationMaker.getTargetText(notification, locale);
      if (targetText) {
        return false;
      }
    }
    return true;
  });
  if (targetText) {
    return targetText;
  }

  if (isEmpty(notification.parameters)) return '';
  const { pageCode, contentOnSessionMarker } = notification.parameters;
  if (!isNull(pageCode) && !isUndefined(pageCode)) {
    return get(notification, `parameters.lang${locale}`, pageCode);
  }
  if (!isNull(contentOnSessionMarker) && !isUndefined(contentOnSessionMarker)) {
    return get(notification.parameters, `Text:${locale}_Title`, contentOnSessionMarker);
  }
  return '';
};

const getTargetLink = (notification) => {
  let targetLink;
  apps.every((app) => {
    const { notificationMaker } = app;
    if (notificationMaker && notificationMaker.getTargetLink) {
      targetLink = notificationMaker.getTargetLink(notification);
      if (targetLink) {
        return false;
      }
    }
    return true;
  });
  if (targetLink) {
    return targetLink;
  }
  if (isEmpty(notification.parameters)) return ROUTE_DASHBOARD;
  const { pageCode } = notification.parameters;
  if (!isNull(pageCode) && !isUndefined(pageCode)) {
    return routeConverter(ROUTE_PAGE_DETAIL, { pageCode });
  }
  return '';
};

export const getNotifications = createSelector(
  [getActivityStreamList, getActivityStreamMap, getLocale],
  (activityStreamList, activityStreamMap, locale) =>
    activityStreamList.map((id) => {
      const obj = {
        ...activityStreamMap[id],
        actionText: getActionText(activityStreamMap[id]),
        targetText: getTargetText(activityStreamMap[id], locale),
        targetLink: getTargetLink(activityStreamMap[id]),
      };
      return obj;
    }),
);
