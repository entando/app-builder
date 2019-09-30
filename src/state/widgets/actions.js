import { initialize } from 'redux-form';
import { get, pick } from 'lodash';
import { formattedText } from '@entando/utils';
import { addToast, addErrors, TOAST_ERROR, TOAST_SUCCESS } from '@entando/messages';

import { toggleLoading } from 'state/loading/actions';
import { getWidget, getWidgets, postWidgets, putWidgets, deleteWidgets, getWidgetInfo } from 'api/widgets';
import { getSelectedWidget } from 'state/widgets/selectors';
import {
  SET_WIDGET_LIST,
  SET_SELECTED_WIDGET,
  REMOVE_WIDGET,
  SET_WIDGETS_TOTAL,
  SET_WIDGET_INFO,
} from 'state/widgets/types';
import { history, ROUTE_WIDGET_LIST } from 'app-init/router';

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

export const setWidgetInfo = widgetInfo => ({
  type: SET_WIDGET_INFO,
  payload: {
    widgetInfo,
  },
});

// thunk

export const loadSelectedWidget = widgetCode => (dispatch, getState) => {
  const selectedWidget = getSelectedWidget(getState());
  if (selectedWidget && selectedWidget.code === widgetCode) {
    return new Promise(r => r(selectedWidget));
  }
  return getWidget(widgetCode)
    .then(response => response.json()
      .then((json) => {
        if (response.ok) {
          dispatch(setSelectedWidget(json.payload));
          return json.payload;
        }
        dispatch(addErrors(json.errors.map(e => e.message)));
        return null;
      })).catch(() => {});
};

export const fetchWidget = widgetCode => dispatch => new Promise((resolve) => {
  getWidget(widgetCode).then((response) => {
    response.json().then((json) => {
      if (response.ok) {
        const newPayload = pick(json.payload, ['code', 'titles', 'group']);
        newPayload.customUi = get(json.payload, 'guiFragments[0].customUi');
        dispatch(initialize('widget', newPayload));
        dispatch(setSelectedWidget(json.payload));
      } else {
        dispatch(addErrors(json.errors.map(err => err.message)));
      }
      resolve();
    });
  }).catch(() => {});
});

export const fetchWidgetInfo = widgetCode => dispatch => new Promise((resolve) => {
  getWidgetInfo(widgetCode).then((response) => {
    response.json().then((json) => {
      if (response.ok) {
        dispatch(setWidgetInfo(json.payload));
      } else {
        dispatch(addErrors(json.errors.map(err => err.message)));
      }
      resolve();
    });
  }).catch(() => {});
});

export const fetchWidgetList = (page = { page: 1, pageSize: 0 }, params = '') => dispatch => new Promise((resolve) => {
  dispatch(toggleLoading('widgets'));
  getWidgets(page, params).then((response) => {
    response.json().then((json) => {
      if (response.ok) {
        dispatch(setWidgetList(json.payload));
      } else {
        dispatch(addErrors(json.errors.map(err => err.message)));
      }
      dispatch(toggleLoading('widgets'));
      resolve();
    });
  }).catch(() => {});
});

export const fetchWidgetsTotal = () => dispatch => new Promise((resolve) => {
  getWidgets({ page: 1, pageSize: 1 }).then((response) => {
    response.json().then((json) => {
      if (response.ok) {
        dispatch(setWidgetsTotal(json.metaData.totalItems));
      } else {
        dispatch(addErrors(json.errors.map(err => err.message)));
      }
      resolve();
    });
  }).catch(() => {});
});

export const sendPostWidgets = widgetObject => dispatch =>
  new Promise((resolve) => {
    postWidgets(widgetObject).then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          history.push(ROUTE_WIDGET_LIST);
          dispatch(addToast(
            formattedText('app.created', null, { type: 'widget', code: widgetObject.code }),
            TOAST_SUCCESS,
          ));
        } else {
          dispatch(addErrors(json.errors.map(err => err.message)));
        }
        resolve();
      });
    }).catch(() => {});
  });

export const sendPutWidgets = widgetObject => dispatch =>
  new Promise((resolve) => {
    putWidgets(widgetObject).then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          history.push(ROUTE_WIDGET_LIST);
          dispatch(addToast(
            formattedText('app.updated', null, { type: 'widget', code: widgetObject.code }),
            TOAST_SUCCESS,
          ));
        } else {
          dispatch(addErrors(json.errors.map(err => err.message)));
        }
        resolve();
      });
    }).catch(() => {});
  });

export const sendDeleteWidgets = widgetCode => dispatch =>
  new Promise((resolve) => {
    deleteWidgets(widgetCode).then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          dispatch(removeWidget(widgetCode));
          dispatch(addToast(
            formattedText('app.deleted', null, { type: 'widget', code: widgetCode }),
            TOAST_SUCCESS,
          ));
          history.push(ROUTE_WIDGET_LIST);
        } else {
          dispatch(addErrors(json.errors.map(err => err.message)));
          dispatch(addToast(json.errors[0].message, TOAST_ERROR));
        }
        resolve();
      });
    }).catch(() => {});
  });
