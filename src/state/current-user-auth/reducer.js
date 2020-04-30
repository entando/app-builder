import { SET_CURRENT_USER_AUTH, CLEAR_CURRENT_USER_AUTH } from 'state/current-user-auth/types';

const reducer = (state = [], action = {}) => {
  switch (action.type) {
    case SET_CURRENT_USER_AUTH:
      return [...action.payload];
    case CLEAR_CURRENT_USER_AUTH:
      return [];
    default: return state;
  }
};

export default reducer;
