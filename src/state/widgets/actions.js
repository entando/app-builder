import { initialize } from 'redux-form';
import { get, pick } from 'lodash';
import { addToast, addErrors, TOAST_ERROR, TOAST_SUCCESS } from '@entando/messages';
import { routeConverter } from '@entando/utils';

import { toggleLoading } from 'state/loading/actions';
import { getWidget, getWidgets, postWidgets, putWidgets, deleteWidgets, getWidgetInfo, getNavigatorNavspecFromExpressions, getNavigatorExpressionsFromNavspec } from 'api/widgets';
import { getFile } from 'api/fileBrowser';
import { sendPostFile, sendPutFile, createFileObject } from 'state/file-browser/actions';
import { getSelectedWidget } from 'state/widgets/selectors';
import {
  SET_WIDGET_LIST,
  SET_SELECTED_WIDGET,
  REMOVE_WIDGET,
  SET_SELECTED_PARENT_WIDGET,
  REMOVE_PARENT_WIDGET,
  SET_WIDGETS_TOTAL,
  SET_WIDGET_INFO,
} from 'state/widgets/types';
import { history, ROUTE_WIDGET_EDIT, ROUTE_WIDGET_LIST } from 'app-init/router';
import { CONTINUE_SAVE_TYPE } from 'state/widgets/const';

export const FREE_ACCESS_GROUP_VALUE = 'free';

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
        json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
        return null;
      })).catch(() => {});
};

export const getSingleWidgetInfo = widgetCode => dispatch => (
  getWidget(widgetCode).then(response => (
    response.json().then((json) => {
      if (response.ok) {
        return { json, ok: response.ok };
      }
      dispatch(addErrors(json.errors.map(err => err.message)));
      json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
      return { ok: false };
    })
  )).catch(() => {})
);

export const initNewUserWidget = (widgetCode, isCloning = false) => (dispatch) => {
  toggleLoading('fetchWidget');
  dispatch(getSingleWidgetInfo(widgetCode)).then(({ ok, json }) => {
    if (ok) {
      const config = get(json.payload, 'parameters', [])
        .reduce((acc, curr) => ({
          ...acc,
          [curr.code]: '',
        }), {});
      dispatch(setSelectedParentWidget(json.payload));
      if (!isCloning) {
        dispatch(initialize('widget', {
          parentType: json.payload.code,
          config,
        }));
      }
    } else {
      dispatch(removeParentWidget());
    }
  }).catch(() => { toggleLoading('fetchWidget'); });
};

export const fetchWidget = widgetCode => dispatch => new Promise((resolve) => {
  toggleLoading('fetchWidget');
  dispatch(getSingleWidgetInfo(widgetCode)).then(({ ok, json }) => {
    if (ok) {
      const newPayload = pick(json.payload, ['code', 'titles', 'group', 'configUi', 'parentType', 'readonlyDefaultConfig', 'widgetCategory', 'icon']);
      newPayload.configUi = !newPayload.configUi ? '' : JSON.stringify(newPayload.configUi, null, 2);
      newPayload.group = newPayload.group || FREE_ACCESS_GROUP_VALUE;
      const userWidgetInitDispatches = () => {
        dispatch(initialize('widget', newPayload));
        dispatch(setSelectedWidget(json.payload));
        toggleLoading('fetchWidget');
        resolve();
      };
      if (newPayload.parentType) {
        dispatch(getSingleWidgetInfo(newPayload.parentType)).then((response) => {
          if (response.ok) {
            newPayload.config = json.payload.config;
            dispatch(setSelectedParentWidget(response.json.payload));
          } else {
            dispatch(removeParentWidget());
            newPayload.customUi = get(json.payload, 'guiFragments[0].customUi');
          }
          userWidgetInitDispatches();
        });
      } else {
        dispatch(removeParentWidget());
        newPayload.customUi = get(json.payload, 'guiFragments[0].customUi');
        userWidgetInitDispatches();
      }
    } else {
      toggleLoading('fetchWidget');
      resolve();
    }
  }).catch(() => { toggleLoading('fetchWidget'); });
});

export const fetchWidgetInfo = widgetCode => dispatch => new Promise((resolve) => {
  getWidgetInfo(widgetCode).then((response) => {
    response.json().then((json) => {
      if (response.ok) {
        dispatch(setWidgetInfo(json.payload));
      } else {
        dispatch(addErrors(json.errors.map(err => err.message)));
        json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
      }
      resolve();
    });
  }).catch(() => {});
});

const widgetsToHide = [
  'userprofile_editCurrentUser',
  'userprofile_editCurrentUser_password',
  'userprofile_editCurrentUser_profile',
];

export const fetchWidgetList = (page = { page: 1, pageSize: 0 }, params = '') => dispatch => new Promise((resolve) => {
  dispatch(toggleLoading('widgets'));
  getWidgets(page, params).then((response) => {
    response.json().then((json) => {
      if (response.ok) {
        // FIXME temporary FE-side filtering to hide user-related widgets
        const widgetList = get(json, 'payload', []).filter(widget => !widgetsToHide.includes(widget.code));
        dispatch(setWidgetList(widgetList));
      } else {
        dispatch(addErrors(json.errors.map(err => err.message)));
        json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
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
        json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
      }
      resolve();
    });
  }).catch(() => {});
});

export const sendPostWidgets = (widgetObject, saveType) => dispatch =>
  new Promise((resolve) => {
    postWidgets(widgetObject).then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          dispatch(addToast(
            { id: 'app.created', values: { type: 'widget', code: widgetObject.code } },
            TOAST_SUCCESS,
          ));
          if (saveType !== CONTINUE_SAVE_TYPE) history.push(ROUTE_WIDGET_LIST);
          else {
            history.push(routeConverter(ROUTE_WIDGET_EDIT, { widgetCode: widgetObject.code }));
          }
        } else {
          dispatch(addErrors(json.errors.map(err => err.message)));
          json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
        }
        resolve();
      });
    }).catch(() => {});
  });

export const sendPutWidgets = (widgetObject, saveType) => dispatch =>
  new Promise((resolve) => {
    putWidgets(widgetObject).then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          if (saveType !== CONTINUE_SAVE_TYPE) history.push(ROUTE_WIDGET_LIST);
          dispatch(addToast(
            { id: 'app.updated', values: { type: 'widget', code: widgetObject.code } },
            TOAST_SUCCESS,
          ));
        } else {
          dispatch(addErrors(json.errors.map(err => err.message)));
          json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
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
            { id: 'app.deleted', values: { type: 'widget', code: widgetCode } },
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

export const sendGetNavigatorNavspecFromExpressions = expressions =>
  dispatch => new Promise(resolve => getNavigatorNavspecFromExpressions(expressions)
    .then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          resolve(json.payload);
        } else {
          dispatch(addErrors(json.errors.map(err => err.message)));
          json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
          resolve();
        }
      }).catch(() => { resolve(); });
    })
    .catch(() => { resolve(); }));

export const sendGetNavigatorExpressionsFromNavspec = navSpec =>
  dispatch => new Promise((resolve) => {
    dispatch(toggleLoading('expressionList'));
    getNavigatorExpressionsFromNavspec(navSpec)
      .then((response) => {
        response.json().then((json) => {
          if (response.ok) {
            resolve(json.payload);
          } else {
            dispatch(addErrors(json.errors.map(err => err.message)));
            json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
            resolve();
          }
          dispatch(toggleLoading('expressionList'));
        }).catch(() => {
          dispatch(toggleLoading('expressionList'));
          resolve();
        });
      })
      .catch(() => {
        dispatch(toggleLoading('expressionList'));
        resolve();
      });
  });

const bodyApi = apiFunc => (...args) => (dispatch) => {
  createFileObject(...args).then((obj) => {
    apiFunc(obj).then(() => {
      dispatch(addToast({ id: 'fileBrowser.uploadFileComplete' }, TOAST_SUCCESS));
      dispatch(toggleLoading('iconUpload'));
    }).catch((error) => {
      dispatch(toggleLoading('iconUpload'));
      const message = { id: 'fileBrowser.uploadFileError', values: { errmsg: error } };
      dispatch(message, TOAST_ERROR);
    });
  });
};

export const uploadIcon = file =>
  dispatch => new Promise((resolve) => {
    const protectedFolder = 'false';
    const currentPath = 'static/widget-icons';
    const queryString = `?protectedFolder=${protectedFolder}&currentPath=${currentPath}/${file.name}`;
    dispatch(toggleLoading('iconUpload'));
    getFile(queryString).then((response) => {
      response.json().then((json) => {
        if (response.status === 404) {
          dispatch(bodyApi(sendPostFile)(protectedFolder, currentPath, file));
        } else if (response.ok) {
          dispatch(bodyApi(sendPutFile)(protectedFolder, currentPath, file));
        } else {
          dispatch(toggleLoading('iconUpload'));
          dispatch(addErrors(json.errors.map(e => e.message)));
          json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
        }
        resolve();
      });
    }).catch(() => {});
  });
