import { createSelector } from 'reselect';
import { getListWidget } from 'state/widgets/selectors';

const getPageConfig = state => state.pageConfig;

const widgetGroupByCategory = widgetList =>

  widgetList.reduce((acc, widget) => {
    if (acc[widget.widgetCategory]) {
      acc[widget.widgetCategory].push(widget);
    } else {
      acc[widget.widgetCategory] = [widget];
    }
    return acc;
  }, {});

export const getSearchFilter = createSelector(getPageConfig, pageConfig => pageConfig.searchFilter);

export const filterWidgetList = createSelector(
  [getListWidget, getSearchFilter],
  (widgetList, searchFilter) => (searchFilter === null ? widgetList :
    widgetList.filter(f => f.name.includes(searchFilter))),
);

export const getWidgetList = createSelector(
  [filterWidgetList],
  widget => widgetGroupByCategory(widget),
);

export default getWidgetList;
