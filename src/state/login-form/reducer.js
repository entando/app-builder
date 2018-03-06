import { SET_LOGIN_ERROR_MESSAGE } from 'state/login-form/types';

const initialState = {
  loginErrorMessage: '',
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_LOGIN_ERROR_MESSAGE:
      return Object.assign({}, state, { loginErrorMessage: action.payload.message });
    default: return state;
  }
};

export default reducer;
