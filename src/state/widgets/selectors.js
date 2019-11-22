import { createSelector } from 'reselect';
import { get, isEmpty, uniq } from 'lodash';
import { getFormValues } from 'redux-form';
import { WIDGET_CONFIG_FORM_ID } from 'state/widget-config/const';

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
    const title = widget.pluginDesc || widget.typology;
    if (acc[title]) {
      acc[title].push(widget);
    } else {
      acc[title] = [widget];
    }
    return acc;
  }, {}));

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

export const getWidgetConfigForm = getFormValues(WIDGET_CONFIG_FORM_ID);
