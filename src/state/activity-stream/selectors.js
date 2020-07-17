
import { createSelector } from 'reselect';
import { isNull, isUndefined, isEmpty, get } from 'lodash';
import { getLocale } from 'state/locale/selectors';

export const getActivityStream = state => state.activityStream;
const getActivityStreamList = createSelector(getActivityStream, root => root.list);
const getActivityStreamMap = createSelector(getActivityStream, root => root.map);

export const getHidden = createSelector(
  [getActivityStream],
  activityStream => activityStream.hidden,
);

const getActionText = (notification) => {
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
      if (parameters.contentOnSessionMarker) {
        return 'activityStream.saveContent';
      } else if (isEmpty(parameters)) {
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

export const getNotifications = createSelector(
  [getActivityStreamList, getActivityStreamMap, getLocale],
  (activityStreamList, activityStreamMap, locale) =>
    activityStreamList.map((id) => {
      const obj = {
        ...activityStreamMap[id],
        actionText: getActionText(activityStreamMap[id]),
        targetText: getTargetText(activityStreamMap[id], locale),
      };
      return obj;
    }),
);
