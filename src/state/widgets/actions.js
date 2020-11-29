import {
  SET_WIDGET_LIST,
  SET_SELECTED_WIDGET,
  REMOVE_WIDGET,
  SET_SELECTED_PARENT_WIDGET,
  REMOVE_PARENT_WIDGET,
  SET_WIDGETS_TOTAL,
  SET_WIDGET_INFO,
} from 'state/widgets/types';

export const setWidgetList = widgetList => ({
  type: SET_WIDGET_LIST,
  payload: {
    widgetList,
  },
});

export const setWidgetsTotal = widgetsTotal => ({
  type: SET_WIDGETS_TOTAL,
  payload: {
    widgetsTotal,
  },
});


export const setSelectedWidget = widget => ({
  type: SET_SELECTED_WIDGET,
  payload: {
    widget,
  },
});

export const removeWidget = widgetCode => ({
  type: REMOVE_WIDGET,
  payload: {
    widgetCode,
  },
});

export const setSelectedParentWidget = widget => ({
  type: SET_SELECTED_PARENT_WIDGET,
  payload: {
    widget,
  },
});

export const removeParentWidget = () => ({
  type: REMOVE_PARENT_WIDGET,
});

export const setWidgetInfo = widgetInfo => ({
  type: SET_WIDGET_INFO,
  payload: {
    widgetInfo,
  },
});
