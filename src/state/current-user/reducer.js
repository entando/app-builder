import { SET_USER } from 'state/current-user/types';
import { isEmpty } from 'util/string';

const initialState = {
  username: null,
  token: null,
};

const isPayloadValid = payload => (
  !isEmpty(payload.username) &&
  !isEmpty(payload.token) &&
  typeof payload.username === 'string' &&
  typeof payload.token === 'string'
);

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_USER: {
      return isPayloadValid(action.payload.user) ? action.payload.user : state;
    }
    default: return state;
  }
};

export default reducer;
