import { setLoginErrorMessage } from 'state/form/actions';
import { SET_LOGIN_ERROR_MESSAGE } from 'state/form/types';

const SET_LOGIN_ERROR_MESSAGE_MOCK = {
  type: SET_LOGIN_ERROR_MESSAGE,
  payload: {
    message: 'ERRORE',
  },
};

it('test setLoginErrorMessage action', () => {
  expect(setLoginErrorMessage('ERRORE')).toEqual(SET_LOGIN_ERROR_MESSAGE_MOCK);
});
