import { createSelector } from 'reselect';
import { getLocale } from 'state/locale/selectors';
import { getWidgetsMap } from 'state/widgets/selectors';

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
  [getWidgetsMap, getLocale],
  (widgetTypes, locale) => {
    const mapTypology = Object.keys(widgetTypes).reduce((acc, item) => {
      const widget = widgetTypes[item];
      const obj = { code: widget.code, typology: widget.typology, titles: widget.titles };
      if (acc[widget.typology]) {
        acc[widget.typology].push(obj);
      } else {
        acc[widget.typology] = [obj];
      }
      return acc;
    }, []);
    const options = Object.keys(mapTypology).map(item => ({
      optgroup: item,
      options: mapTypology[item].map(widget => ({
        code: widget.code,
        title: widget.titles[locale],
      })),
    }));
    return options;
  },
);


export const getPluginsOptions = createSelector(
  [getPlugins, getLocale],
  (plugins, locale) =>
    plugins.map(plugin => ({
      code: plugin.code,
      title: plugin.titles[locale],
    })),
);
