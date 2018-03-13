import { createSelector } from 'reselect';
import { getListWidget } from 'state/widgets/selectors';

const widgetGroupByCategory = widgetList =>

  widgetList.reduce((acc, widget) => {
    if (acc[widget.widgetCategory]) {
      acc[widget.widgetCategory].push(widget);
    } else {
      acc[widget.widgetCategory] = [widget];
    }
    return acc;
  }, {});

export const getPageConfig = state => state.pageConfig;

export const getSearchFilter = createSelector(getPageConfig, pageConfig => pageConfig.searchFilter);

export const getViewList = createSelector(getPageConfig, pageConfig => pageConfig.viewList);

export const filterWidgetList = createSelector(
  [getListWidget, getSearchFilter],
  (widgetList, searchFilter) => (searchFilter === null ? widgetList :
    widgetList.filter(f => f.name.includes(searchFilter))),
);

export const getGroupedWidgetList = createSelector(
  [filterWidgetList],
  widget => widgetGroupByCategory(widget),
);
