import { createSelector } from 'reselect';
import { cloneDeep, isEqual } from 'lodash';
import { getParams } from 'frontend-common-components';

import { getLocale } from 'state/locale/selectors';
import { getListWidget, getWidgetsMap } from 'state/widgets/selectors';
import { getSelectedPageModelCellMap, getSelectedPageModelMainFrame, getSelectedPageModelDefaultConfig } from 'state/page-models/selectors';
import { WIDGET_STATUS_MATCH, WIDGET_STATUS_DIFF, WIDGET_STATUS_REMOVED } from 'state/page-config/const';


const widgetGroupByCategory = (widgetList, locale) =>

  widgetList.reduce((acc, widget) => {
    if (acc[widget.typology]) {
      acc[widget.typology].push({ ...widget, name: widget.titles[locale] });
    } else {
      acc[widget.typology] = [{ ...widget, name: widget.titles[locale] }];
    }
    return acc;
  }, {});

export const getPageConfig = state => state.pageConfig;
export const getConfigMap = state => state.pageConfig.configMap;
export const getPublishedConfigMap = state => state.pageConfig.publishedConfigMap;
export const getContent = state => state.pageConfig.content;
export const getToolbarExpanded = state => state.pageConfig.toolbarExpanded;

export const getSearchFilter = createSelector(getPageConfig, pageConfig => pageConfig.searchFilter);

export const getViewList = createSelector(getPageConfig, pageConfig => pageConfig.viewList);


export const filterWidgetList = createSelector(
  [getListWidget, getSearchFilter, getLocale],
  (widgetList, searchFilter, locale) => (searchFilter === null ? widgetList :
    widgetList.filter(f => f.titles[locale].includes(searchFilter)))
  ,
);

export const getGroupedWidgetList = createSelector(
  [filterWidgetList, getLocale],
  (widget, locale) => widgetGroupByCategory(widget, locale),
);

export const getSelectedPageConfig = createSelector(
  [getConfigMap, getParams],
  (configMap, params) => configMap[params.pageCode] || null,
);

export const getSelectedPagePublishedConfig = createSelector(
  [getPublishedConfigMap, getParams],
  (publishedConfigMap, params) => publishedConfigMap[params.pageCode] || null,
);


// the page model struct, enriched with infos about each column (frame, widget)
export const getPageConfigCellMap = createSelector(
  [getConfigMap, getPublishedConfigMap, getParams, getWidgetsMap, getSelectedPageModelCellMap,
    getLocale],
  (configMap, publishedConfigMap, routeParams, widgetsMap, cellMap, locale) => {
    const { pageCode } = routeParams;
    const pageConfig = configMap[pageCode];
    if (!pageCode || !pageConfig || !cellMap) return null;
    const publishedConfig = publishedConfigMap[pageCode];
    const newCellMap = cloneDeep(cellMap);

    const cells = Object.keys(newCellMap).map(key => newCellMap[key]);

    // add widget information to the full cells
    pageConfig.forEach((draftItem, pos) => {
      const publishedItem = publishedConfig && publishedConfig[pos];
      const relatedCell = cells.find(cell => cell.framePos === pos);
      const item = draftItem || publishedItem;
      if (relatedCell) {
        if (item) {
          const widget = widgetsMap[item.type];
          if (widget && relatedCell) {
            relatedCell.widgetCode = widget.code;
            relatedCell.widgetTitle = widget.titles[locale] || widget.name;
            relatedCell.widgetHasConfig = !!item.config;
          }
        }
        if (draftItem && publishedConfig) {
          if (!isEqual(draftItem, publishedItem)) {
            relatedCell.widgetStatus = WIDGET_STATUS_DIFF;
          } else {
            relatedCell.widgetStatus = WIDGET_STATUS_MATCH;
          }
        } else if (publishedItem && !draftItem) {
          relatedCell.widgetStatus = WIDGET_STATUS_REMOVED;
        }
      }
    });
    return newCellMap;
  },
);

export const getPageIsOnTheFly = createSelector(
  [getSelectedPageConfig, getSelectedPageModelMainFrame],
  (draftConfig, mainFrame) => {
    if (!draftConfig || !mainFrame) {
      return false;
    }
    const mainConfigItem = draftConfig[mainFrame.pos];
    return (mainConfigItem && mainConfigItem.type === 'content_viewer' && !mainConfigItem.config);
  },
);

export const getSelectedPageDiffersFromPublished = createSelector(
  [getSelectedPageConfig, getSelectedPagePublishedConfig],
  (draftConfig, publishedConfig) => {
    if (!draftConfig || !publishedConfig) {
      return false;
    }
    return !isEqual(draftConfig, publishedConfig);
  },
);

export const getSelectedPageConfigMatchesDefault = createSelector(
  [getSelectedPageConfig, getSelectedPageModelDefaultConfig],
  (draftConfig, defaultConfig) => isEqual(draftConfig, defaultConfig),
);
