import { get } from 'lodash';

import { toggleLoading } from 'state/loading/actions';
import { fetchSingleWidgetInfo, removeParentWidget, setSelectedParentWidget, setSelectedWidget } from './actions';

export const FREE_ACCESS_GROUP_VALUE = 'free';

const fetchParentWidget = widgetCode => dispatch => new Promise((resolve, reject) => {
  return dispatch(fetchSingleWidgetInfo(widgetCode)).then((parentWidgetResponse) => {
    if (parentWidgetResponse.ok) {
      dispatch(setSelectedParentWidget(parentWidgetResponse.json.payload));
      resolve();
    }
    reject();
  });
});

const prettyPrintJson = json => (json ? JSON.stringify(json, null, 2) : '');

const widgetToFormData = widget => ({
  ...widget,
  group: widget.group || FREE_ACCESS_GROUP_VALUE,
  configUi: prettyPrintJson(widget.configUi),
  customUi: get(widget, 'guiFragments[0].customUi', ''),
});

const brandNewFetchWidget = widgetCode => dispatch => new Promise((resolve) => {
  const toggleWidgetLoading = () => toggleLoading('fetchWidget');
  const completeWidgetInit = () => {
    toggleWidgetLoading();
    resolve();
  };

  dispatch(removeParentWidget());
  dispatch(fetchSingleWidgetInfo(widgetCode)).then(({ ok, json }) => {
    const widgetPayload = get(json, 'payload');
    if (!ok || !widgetPayload) {
      completeWidgetInit();
    }

    const widgetFormData = widgetToFormData(widgetPayload);
    dispatch(setSelectedWidget(widgetFormData));

    const isChildWidget = !!widgetFormData.parentType;
    if (isChildWidget) {
      dispatch(fetchParentWidget(widgetPayload.parentType)).then(completeWidgetInit);
    } else {
      completeWidgetInit();
    }
  }).catch(() => { toggleWidgetLoading(); });
});

export default brandNewFetchWidget;
