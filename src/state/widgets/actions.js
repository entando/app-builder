import { initialize } from 'redux-form';
import { SET_WIDGET_LIST } from 'state/widgets/types';
import { getWidget, getWidgets } from 'api/widgets';
import { toggleLoading } from 'state/loading/actions';
import { addErrors } from 'state/errors/actions';
import { setPage } from 'state/pagination/actions';

export const getWidgetList = widgetList => ({
  type: SET_WIDGET_LIST,
  payload: {
    widgetList,
  },
});

// thunk

export const fetchWidget = widgetCode => dispatch => new Promise((resolve) => {
  getWidget(widgetCode).then((response) => {
    response.json().then((json) => {
      if (response.ok) {
        dispatch(initialize('widget', json.payload));
        resolve();
      } else {
        dispatch(addErrors(json.errors.map(err => err.message)));
        resolve();
      }
    });
  });
});


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
