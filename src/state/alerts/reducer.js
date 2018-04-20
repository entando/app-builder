import { ADD_ALERT, CLEAR_ALERT } from 'state/alerts/types';

const reducer = (state = {}, action = {}) => {
  switch (action.type) {
    case ADD_ALERT: {
      const { id, type } = action.payload;
      return { ...state, [id]: type };
    }
    case CLEAR_ALERT: {
      const { id } = action.payload;
      const newState = { ...state };
      delete newState[id];
      return newState;
    }
    default: return state;
  }
};

export default reducer;
