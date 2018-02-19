
import { createSelector } from 'reselect';


export const getActivityStream = state => state.activityStream;

export const getHidden = createSelector(
  [getActivityStream],
  activityStream => activityStream.hidden,
);
// created selector expects an input array.
// activityStream is arbitrary name that identifies the array name.
export const getNotifications = createSelector(
  [getActivityStream],
  activityStream => activityStream.notifications,
);
