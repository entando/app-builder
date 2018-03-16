import { createSelector } from 'reselect';
import { cloneDeep } from 'lodash';
import { getParams } from 'frontend-common-components';

import { getLocale } from 'state/locale/selectors';
import { getListWidget, getWidgetsMap } from 'state/widgets/selectors';
import { getSelectedPageModelCellMap } from 'state/page-models/selectors';


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
export const getConfigMap = state => state.pageConfig.configMap;

export const getContent = state => state.pageConfig.content;

export const getToolbarExpanded = state => state.pageConfig.toolbarExpanded;

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


// the page model struct, enriched with infos about each column (frame, widget)
export const getPageConfigCellMap = createSelector(
  [getConfigMap, getParams, getWidgetsMap, getSelectedPageModelCellMap, getLocale],
  (configMap, routeParams, widgetsMap, cellMap, locale) => {
    const { pageCode } = routeParams;
    const pageConfig = configMap[pageCode];
    if (!pageCode || !pageConfig || !cellMap) return null;
    const newCellMap = cloneDeep(cellMap);

    const cells = Object.keys(newCellMap).map(key => newCellMap[key]);

    // add widget information to the full cells
    pageConfig.forEach((item, pos) => {
      if (item) {
        const relatedCell = cells.find(cell => cell.framePos === pos);
        const widget = widgetsMap[item.type];
        if (widget && relatedCell) {
          relatedCell.widgetCode = widget.code;
          relatedCell.widgetTitle = widget.titles[locale] || widget.name;
          relatedCell.widgetHasConfig = !!item.config;
        }
      }
    });
    return newCellMap;
  },
);
