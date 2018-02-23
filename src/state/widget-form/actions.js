import getWidgetAPI from 'api/widget';
import { initialize } from 'redux-form';

import { SET_WIDGET } from './types';

// eslint-disable-next-line
export const setWidget = (payload) => ({
  type: SET_WIDGET,
  payload,
});

// thunks
export const fetchWidget = widgetCode => dispatch => (

  getWidgetAPI(widgetCode).then((response) => {
    dispatch(initialize('widget', response.payload));
  })
);
