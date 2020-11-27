import { initialize } from 'redux-form';
import { get, pick } from 'lodash';

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

const widgetToFormData = (widget) => {
  const widgetFormData = pick(widget, ['code', 'titles', 'config', 'parentType', 'readonlyDefaultConfig', 'widgetCategory']);
  widgetFormData.group = widget.group || FREE_ACCESS_GROUP_VALUE;
  widgetFormData.configUi = !widget.configUi ? '' : JSON.stringify(widget.configUi, null, 2);
  widgetFormData.customUi = get(widget, 'guiFragments[0].customUi', '');
  return widgetFormData;
};

const brandNewFetchWidget = widgetCode => dispatch => new Promise((resolve) => {
  const FORM_ID = 'widget';
  const toggleWidgetLoading = () => toggleLoading('fetchWidget');

  dispatch(removeParentWidget());
  dispatch(fetchSingleWidgetInfo(widgetCode)).then(({ ok, json }) => {
    const widgetPayload = get(json, 'payload');
    if (!ok || !widgetPayload) {
      toggleWidgetLoading();
      resolve();
    }

    const widgetFormData = widgetToFormData(widgetPayload);
    dispatch(setSelectedWidget(widgetFormData));

    const completeWidgetInit = () => {
      dispatch(initialize(FORM_ID, widgetFormData));
      toggleWidgetLoading();
      resolve();
    };

    const isChildWidget = !!widgetFormData.parentType;
    if (isChildWidget) {
      dispatch(fetchParentWidget(widgetPayload.parentType)).then(completeWidgetInit);
    } else {
      completeWidgetInit();
    }
  }).catch(() => { toggleWidgetLoading(); });
});

export default brandNewFetchWidget;
