import { createSelector } from 'reselect';
import { getLocale } from 'state/locale/selectors';
import { groupWidgets } from 'state/widgets/helpers';
import { getListWidget } from 'state/widgets/selectors';

export const getFragments = state => state.fragments;
export const getWidgetTypes = state => state.fragments.widgetTypes;
export const getPlugins = state => state.fragments.plugins;

export const getFragmentList = createSelector(
  getFragments,
  fragments => fragments.list,
);

export const getFragmentSelected = createSelector(
  [getFragments],
  fragment => fragment.selected,
);

export const getWidgetTypesOptions = createSelector(
  [getListWidget, getLocale],
  (widgetList, locale) => {
    const groupedWidgets = groupWidgets(widgetList);
    const widgetTypesOptions = Object.keys(groupedWidgets).map(widgetGrouping => ({
      optgroup: widgetGrouping,
      options: groupedWidgets[widgetGrouping].map(widget => ({
        code: widget.code,
        title: widget.titles[locale],
      })),
    }));
    return widgetTypesOptions;
  },
);

export const getPluginsOptions = createSelector(
  [getPlugins],
  plugins =>
    plugins.map(plugin => ({
      code: plugin.code,
      title: plugin.title,
    })),
);

export const getFilters = createSelector(
  getFragments,
  fragments => fragments.filters,
);
