import { SET_USER } from 'state/current-user/types';
import { isEmpty } from 'util/string';

const getInitialState = () => ({
  username: localStorage.getItem('username'),
  token: localStorage.getItem('token'),
});

const isPayloadValid = payload => (
  !isEmpty(payload.username) &&
  !isEmpty(payload.token) &&
  typeof payload.username === 'string' &&
  typeof payload.token === 'string'
);

const reducer = (state = getInitialState(), action = {}) => {
  switch (action.type) {
    case SET_USER: {
      return isPayloadValid(action.payload.user) ? action.payload.user : state;
    }
    default: return state;
  }
};

export default reducer;
