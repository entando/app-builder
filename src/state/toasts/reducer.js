import { ADD_TOAST, REMOVE_TOAST } from 'state/toasts/types';
import uuid from 'uuid/v1';

const reducer = (state = {}, action = {}) => {
  switch (action.type) {
    case ADD_TOAST: {
      return { ...state, [uuid()]: action.payload };
    }
    case REMOVE_TOAST: {
      const { id } = action.payload;
      const newState = { ...state };
      delete newState[id];
      return newState;
    }
    default: return state;
  }
};

export default reducer;
