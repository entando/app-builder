
import { createSelector } from 'reselect';
import { isNull } from 'lodash';

export const getActivityStream = state => state.activityStream;
const getActivityStreamList = createSelector(getActivityStream, root => root.list);
const getActivityStreamMap = createSelector(getActivityStream, root => root.map);

export const getHidden = createSelector(
  [getActivityStream],
  activityStream => activityStream.hidden,
);

const getActionText = (notification) => {
  const { actionName, parameters } = notification;
  switch (actionName) {
    case 'POST': {
      return 'Publish';
    }
    case 'PUT': {
      return isNull(parameters) ? 'UnPublish' : 'edit';
    }
    default: return '';
  }
};

export const getNotifications = createSelector(
  [getActivityStreamList, getActivityStreamMap],
  (activityStreamList, activityStreamMap) =>
    activityStreamList.map(id => (
      { ...activityStreamMap[id], actionText: getActionText(activityStreamMap[id]) })),
);
