
import getWidgetAPI from 'api/widget';

import { GET_WIDGET } from './types';


// eslint-disable-next-line
export const getWidget = (payload) => ({
  type: GET_WIDGET,
  payload,
});


// thunks
export const fetchWidget = widgetCode => (dispatch) => (

  getWidgetAPI(widgetCode).then(
      response => response.json(),
      error => console.log('ERROR')
    ).then(
      json => dispatch(getWidget(json.payload),
    ),
);


/*

export const performLogin = (username, password) => (dispatch) => {
  if (username && password) {
    dispatch(setLoginErrorMessage(''));
    login(username, password).then(() => {
      gotoRoute('dashboard');
    });
  } else {
    dispatch(setLoginErrorMessage(formattedText('fcc.login.errorMessage', ERROR_LOGIN_MESSAGE, {})));
  }
};

*/
