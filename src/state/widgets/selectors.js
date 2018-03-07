import { createSelector } from 'reselect';

export const getWidgets = state => state.widgets;

export const getListWidget = createSelector(
  [getWidgets],
  widgets => widgets.list,
);
