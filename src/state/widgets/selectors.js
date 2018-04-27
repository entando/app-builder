import { createSelector } from 'reselect';
import { get } from 'lodash';

export const getWidgets = state => state.widgets;
export const getWidgetsTotal = state => state.widgets.total;
export const getWidgetsIdList = state => state.widgets.list;
export const getWidgetsMap = state => state.widgets.map;
export const getSelectedWidget = state => state.widgets.selected;
export const getSelectedWidgetDefaultUi = state => get(state.widgets.selected, 'guiFragments[0].defaultUi');

export const getListWidget = createSelector(
  [getWidgetsIdList, getWidgetsMap],
  (idList, widgetsMap) => idList.map(id => widgetsMap[id]),
);

export const getTypologyWidgetList = createSelector(getListWidget, widgetList =>

  widgetList.reduce((acc, widget) => {
    if (acc[widget.typology]) {
      acc[widget.typology].push(widget);
    } else {
      acc[widget.typology] = [widget];
    }
    return acc;
  }, {}));
