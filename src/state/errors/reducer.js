import { ADD_ERRORS, CLEAR_ERRORS } from 'state/errors/types';

const reducer = (state = [], action = {}) => {
  switch (action.type) {
    case ADD_ERRORS: {
      return action.payload.errors;
    }
    case CLEAR_ERRORS: {
      return [];
    }
    default: return state;
  }
};

export default reducer;
