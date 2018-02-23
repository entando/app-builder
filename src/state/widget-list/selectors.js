import { createSelector } from 'reselect';

export const getWidgetList = state => state.widgetList;

// created selector expects an input array.
// activityStream is arbitrary name that identifies the array name.
export const getTableRow = createSelector(
  [getWidgetList],
  widgetList => widgetList.tableRow,
);
