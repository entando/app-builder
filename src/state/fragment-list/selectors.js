import { createSelector } from 'reselect';

export const getFragmentList = state => state.fragmentList;

// created selector expects an input array.
// activityStream is arbitrary name that identifies the array name.
export const getTableRow = createSelector(
  [getFragmentList],
  fragmentList => fragmentList,
);
