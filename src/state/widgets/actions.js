import { initialize } from 'redux-form';
import { getWidget, getApiWidgetList } from 'api/widgets';
import { SET_WIDGET_LIST, SET_SELECTED_WIDGET } from 'state/widgets/types';
import { getSelectedWidget } from 'state/widgets/selectors';
import { addErrors } from 'state/errors/actions';


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


export const fetchWidgetList = () => dispatch =>
  getApiWidgetList().then((data) => {
    dispatch(getWidgetList(data.payload));
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
