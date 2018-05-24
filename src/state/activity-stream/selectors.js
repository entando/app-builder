
import { createSelector } from 'reselect';
import { isNull, isUndefined, isEmpty } from 'lodash';
import { formattedText } from '@entando/utils';

export const getActivityStream = state => state.activityStream;
const getActivityStreamList = createSelector(getActivityStream, root => root.list);
const getActivityStreamMap = createSelector(getActivityStream, root => root.map);

export const getHidden = createSelector(
  [getActivityStream],
  activityStream => activityStream.hidden,
);

const getActionText = (notification) => {
  const { actionName, parameters } = notification;
  const { strutsAction } = parameters;
  switch (actionName) {
    case 'save': {
      if (strutsAction === '1') {
        return formattedText('activityStream.newPage');
      } else if (strutsAction === '2') {
        return formattedText('activityStream.editPage');
      }
      return '';
    }
    case 'delete': {
      return formattedText('activityStream.deletePage');
    }
    case 'setOnline': {
      return formattedText('activityStream.onlinePage');
    }
    case 'setOffline': {
      return formattedText('activityStream.offlinePage');
    }
    case 'saveConfigure': {
      return formattedText('activityStream.modifyPage');
    }
    default: return '';
  }
};

const getTargetText = (notification) => {
  if (isEmpty(notification.parameters)) return '';
  const { pageCode } = notification.parameters;

  return isNull(pageCode) || isUndefined(pageCode) ? '' : pageCode;
};

export const getNotifications = createSelector(
  [getActivityStreamList, getActivityStreamMap],
  (activityStreamList, activityStreamMap) =>
    activityStreamList.map((id) => {
      const obj = {
        ...activityStreamMap[id],
        actionText: getActionText(activityStreamMap[id]),
        targetText: getTargetText(activityStreamMap[id]),
      };
      return obj;
    }),
);
