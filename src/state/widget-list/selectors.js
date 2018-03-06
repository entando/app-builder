import { createSelector } from 'reselect';

export const getWidgetList = state => state.widgetList;

export const getTableRow = createSelector(
  [getWidgetList],
  widgetList => widgetList.tableRow,
);
