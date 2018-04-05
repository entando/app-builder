import { createSelector } from 'reselect';
import { get } from 'lodash';

export const getWidgets = state => state.widgets;
export const getWidgetsIdList = state => state.widgets.list;
export const getWidgetsMap = state => state.widgets.map;
export const getSelectedWidget = state => state.widgets.selected;
export const getSelectedWidgetDefaultUi = state => get(state.widgets.selected, 'guiFragments[0].defaultUi');

export const getListWidget = createSelector(
  [getWidgetsIdList, getWidgetsMap],
  (idList, widgetsMap) => idList.map(id => widgetsMap[id]),
);
