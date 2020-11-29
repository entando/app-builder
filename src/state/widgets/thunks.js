import { get } from 'lodash';
import { initialize } from 'redux-form';
import { addToast, addErrors, TOAST_ERROR, TOAST_SUCCESS } from '@entando/messages';

import { removeParentWidget, removeWidget, setWidgetInfo, setSelectedParentWidget, setSelectedWidget, setWidgetList, setWidgetsTotal } from 'state/widgets/actions';
import { toggleLoading } from 'state/loading/actions';
import { getWidget, getWidgets, postWidgets, putWidgets, deleteWidgets, getWidgetInfo, getNavigatorNavspecFromExpressions, getNavigatorExpressionsFromNavspec } from 'api/widgets';
import { getSelectedWidget } from 'state/widgets/selectors';
import { prettyPrintJson } from 'state/widgets/helpers';

import { history, ROUTE_WIDGET_LIST } from 'app-init/router';

export const FREE_ACCESS_GROUP_VALUE = 'free';

const widgetToFormData = widget => ({
  ...widget,
  group: widget.group || FREE_ACCESS_GROUP_VALUE,
  configUi: prettyPrintJson(widget.configUi),
  customUi: get(widget, 'guiFragments[0].customUi', ''),
});

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

export const fetchSingleWidgetInfo = widgetCode => dispatch => (
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
  dispatch(fetchSingleWidgetInfo(widgetCode)).then(({ ok, json }) => {
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

export const fetchWidgetList = (page = { page: 1, pageSize: 0 }, params = '') => dispatch => new Promise((resolve) => {
  dispatch(toggleLoading('widgets'));
  getWidgets(page, params).then((response) => {
    response.json().then((json) => {
      if (response.ok) {
        dispatch(setWidgetList(json.payload));
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

export const sendPostWidgets = widgetObject => dispatch =>
  new Promise((resolve) => {
    postWidgets(widgetObject).then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          history.push(ROUTE_WIDGET_LIST);
          dispatch(addToast(
            { id: 'app.created', values: { type: 'widget', code: widgetObject.code } },
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

export const sendPutWidgets = widgetObject => dispatch =>
  new Promise((resolve) => {
    putWidgets(widgetObject).then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          history.push(ROUTE_WIDGET_LIST);
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

  // export const fetchWidget = widgetCode => dispatch => new Promise((resolve) => {
  //   const FORM_ID = 'widget';
  //   const toggleWidgetLoading = () => toggleLoading('fetchWidget');
  
  //   dispatch(removeParentWidget());
  //   dispatch(fetchSingleWidgetInfo(widgetCode)).then(({ ok, json }) => {
  //     const widgetPayload = get(json, 'payload');
  //     if (!ok || !widgetPayload) {
  //       toggleWidgetLoading();
  //       resolve();
  //     }
  
  //     const widgetFormData = pick(widgetPayload, ['code', 'titles', 'config', 'parentType', 'readonlyDefaultConfig', 'widgetCategory']);
  //     widgetFormData.group = widgetPayload.group || FREE_ACCESS_GROUP_VALUE;
  //     widgetFormData.configUi = !widgetPayload.configUi ? '' : JSON.stringify(widgetPayload.configUi, null, 2);
  //     widgetFormData.customUi = get(widgetPayload, 'guiFragments[0].customUi', '');
  
  //     const completeWidgetInit = () => {
  //       dispatch(initialize(FORM_ID, widgetFormData));
  //       dispatch(setSelectedWidget(widgetPayload));
  //       toggleWidgetLoading();
  //       resolve();
  //     };
  
  //     const isChildWidget = !!widgetFormData.parentType;
  //     if (isChildWidget) {
  //       dispatch(fetchSingleWidgetInfo(widgetFormData.parentType)).then((parentWidgetResponse) => {
  //         if (parentWidgetResponse.ok) {
  //           dispatch(setSelectedParentWidget(parentWidgetResponse.json.payload));
  //           completeWidgetInit();
  //         }
  //       });
  //     } else {
  //       completeWidgetInit();
  //     }
  //   }).catch(() => { toggleWidgetLoading(); });
  // });

const fetchParentWidget = widgetCode => dispatch => new Promise((resolve, reject) => {
  return dispatch(fetchSingleWidgetInfo(widgetCode)).then((parentWidgetResponse) => {
    if (parentWidgetResponse.ok) {
      dispatch(setSelectedParentWidget(parentWidgetResponse.json.payload));
      resolve();
    }
    reject();
  });
});

export const fetchWidget = widgetCode => dispatch => new Promise((resolve) => {
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

