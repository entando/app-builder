import getWidgetAPI from 'api/widget';
import { initialize } from 'redux-form';

// eslint-disable-next-line
export const fetchWidget = widgetCode => dispatch => (
  getWidgetAPI(widgetCode).then((response) => {
    dispatch(initialize('widget', response.payload));
  })
);
