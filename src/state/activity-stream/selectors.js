
import { createSelector } from 'reselect';


const getActivityStream = state => state.activityStream;


// eslint-disable-next-line
export const getHidden = createSelector(
  [getActivityStream],
  activityStream => activityStream.hidden,
);
