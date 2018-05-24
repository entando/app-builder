import { initialize } from 'redux-form';
import { get } from 'lodash';
import { getParams, gotoRoute } from '@entando/router';
import { formattedText } from '@entando/utils';
import { addErrors } from 'state/errors/actions';
import { toggleLoading } from 'state/loading/actions';
import { ROUTE_WIDGET_LIST } from 'app-init/router';

import { getWidget, getWidgets, postWidgets, putWidgets, deleteWidgets } from 'api/widgets';
import {
  SET_WIDGET_LIST,
  SET_SELECTED_WIDGET,
  REMOVE_WIDGET,
  SET_WIDGETS_TOTAL,
} from 'state/widgets/types';
import { getSelectedWidget } from 'state/widgets/selectors';

import { addToast } from 'state/toasts/actions';

import { TOAST_ERROR, TOAST_SUCCESS } from 'state/toasts/const';


export const getWidgetList = widgetList => ({
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
      }));
};

export const fetchWidget = () => (dispatch, getState) => new Promise((resolve) => {
  const { widgetCode } = getParams(getState());
  getWidget(widgetCode).then((response) => {
    response.json().then((json) => {
      if (response.ok) {
        const newPayload = json.payload;
        newPayload.customUi = get(json.payload, 'guiFragments[0].customUi');
        dispatch(initialize('widget', newPayload));
        dispatch(setSelectedWidget(json.payload));
      } else {
        dispatch(addErrors(json.errors.map(err => err.message)));
      }
      resolve();
    });
  });
});

export const fetchWidgetList = (page = { page: 1, pageSize: 0 }, params = '') => dispatch => new Promise((resolve) => {
  dispatch(toggleLoading('widgets'));
  getWidgets(page, params).then((response) => {
    response.json().then((json) => {
      if (response.ok) {
        dispatch(getWidgetList(json.payload));
      } else {
        dispatch(addErrors(json.errors.map(err => err.message)));
      }
      dispatch(toggleLoading('widgets'));
      resolve();
    });
  });
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
  });
});

export const sendPostWidgets = widgetObject => dispatch =>
  new Promise((resolve) => {
    postWidgets(widgetObject).then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          gotoRoute(ROUTE_WIDGET_LIST);
          dispatch(addToast(
            formattedText('app.created', null, { type: 'widget', code: widgetObject.code }),
            TOAST_SUCCESS,
          ));
        } else {
          dispatch(addErrors(json.errors.map(err => err.message)));
        }
        resolve();
      });
    });
  });

export const sendPutWidgets = widgetObject => dispatch =>
  new Promise((resolve) => {
    putWidgets(widgetObject).then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          gotoRoute(ROUTE_WIDGET_LIST);
          dispatch(addToast(
            formattedText('app.updated', null, { type: 'widget', code: widgetObject.code }),
            TOAST_SUCCESS,
          ));
        } else {
          dispatch(addErrors(json.errors.map(err => err.message)));
        }
        resolve();
      });
    });
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
          gotoRoute(ROUTE_WIDGET_LIST);
        } else {
          dispatch(addErrors(json.errors.map(err => err.message)));
          dispatch(addToast(json.errors[0].message, TOAST_ERROR));
        }
        resolve();
      });
    });
  });
