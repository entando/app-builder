import { initialize } from 'redux-form';
import { SET_WIDGET_LIST, SET_SELECTED_WIDGET } from 'state/widgets/types';
import { getSelectedWidget } from 'state/widgets/selectors';
import { addErrors } from 'state/errors/actions';
import { getWidget, getWidgets } from 'api/widgets';
import { toggleLoading } from 'state/loading/actions';
import { setPage } from 'state/pagination/actions';

export const getWidgetList = widgetList => ({
  type: SET_WIDGET_LIST,
  payload: {
    widgetList,
  },
});


export const setSelectedWidget = widget => ({
  type: SET_SELECTED_WIDGET,
  payload: {
    widget,
  },
});

// thunk
export const fetchWidget = widgetCode => dispatch =>
  new Promise((resolve) => {
    getWidget(widgetCode).then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          dispatch(initialize('widget', json.payload));
        } else {
          dispatch(addErrors(json.errors.map(e => e.message)));
        }
        resolve();
      });
    });
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
        return null;
      }));
};


export const fetchWidgetList = (page = { page: 1, pageSize: 10 }, params = '') => dispatch => new Promise((resolve) => {
  dispatch(toggleLoading('widgets'));
  getWidgets(page, params).then((response) => {
    response.json().then((json) => {
      if (response.ok) {
        dispatch(getWidgetList(json.payload));
        dispatch(toggleLoading('widgets'));
        dispatch(setPage(json.metaData));
        resolve();
      } else {
        dispatch(addErrors(json.errors.map(err => err.message)));
        dispatch(toggleLoading('widgets'));
        resolve();
      }
    });
  });
});
