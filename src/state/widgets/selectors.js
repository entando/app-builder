import { createSelector } from 'reselect';
import { get, isEmpty, uniq } from 'lodash';
import { groupWidgets } from 'state/widgets/helpers';

export const getWidgets = state => state.widgets;
export const getWidgetsTotal = state => state.widgets.total;
export const getWidgetsIdList = state => state.widgets.list;
export const getWidgetsMap = state => state.widgets.map;
export const getSelectedWidget = state => state.widgets.selected;
export const getSelectedParentWidget = state => state.widgets.selectedParent;

export const getSelectedWidgetDefaultUi = state => get(state.widgets.selected, 'guiFragments[0].defaultUi');

export const getListWidget = createSelector(
  [getWidgetsIdList, getWidgetsMap],
  (idList, widgetsMap) => idList.map(id => widgetsMap[id]),
);

export const getGroupedWidgets = createSelector(
  getListWidget,
  widgetList => groupWidgets(widgetList),
);

export const getWidgetGroupingList = createSelector(
  getGroupedWidgets,
  groupedWidgets => Object.keys(groupedWidgets).sort(),
);

export const getWidgetInfo = createSelector([getWidgets], (widget) => {
  const { info } = widget;
  if (!isEmpty(info)) {
    const list = uniq(info.draftUtilizers.map(m => m.pageCode)
      .concat(info.publishedUtilizers.map(m => m.pageCode)));
    const data = list.reduce((acc, pageCode) => {
      const draft = info.draftUtilizers.find(f => f.pageCode === pageCode);
      const publish = info.publishedUtilizers.find(f => f.pageCode === pageCode);
      acc[pageCode] = {
        pageFullPath: (draft && draft.pageFullPath) || (publish && publish.pageFullPath),
        draft: !isEmpty(draft),
        frameDraft: draft && `${draft.frame} [${draft.frameIndex}]`,
        publish: !isEmpty(publish),
        framePublish: publish && `${publish.frame} [${publish.frameIndex}]`,
      };
      return acc;
    }, {});
    return {
      code: info.code,
      data,
      titles: info.titles,
    };
  }
  return info;
});

export const getSelectedWidgetConfig = createSelector(
  getSelectedWidget,
  selectedWidget => get(selectedWidget, 'config'),
);

export const getSelectedWidgetParameters = createSelector(
  getSelectedWidget,
  selectedWidget => get(selectedWidget, 'parameters', []),
);

export const getSelectedParentWidgetParameters = createSelector(
  getSelectedParentWidget,
  selectedParentWidget => get(selectedParentWidget, 'parameters', []),
);
