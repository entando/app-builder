import getWidgetAPI from 'api/widget';
import { initialize } from 'redux-form';

import { SET_WIDGET } from './types';

// eslint-disable-next-line
export const setWidget = (widgetValues) => ({
  type: SET_WIDGET,
  payload: {
    widgetValues,
  },
});

// thunks
export const fetchWidget = widgetCode => dispatch => (

  getWidgetAPI(widgetCode).then((response) => {
    dispatch(setWidget(response.payload));
    dispatch(initialize('widget', response.payload));
  })
);
