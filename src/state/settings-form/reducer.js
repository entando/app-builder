import { GET_OPTIONS } from './types';

const reducer = (state = [], action = {}) => {
  switch (action.type) {
    case GET_OPTIONS: {
      return action.payload.options;
    }
    default: return state;
  }
};

export default reducer;
