import { TOGGLE_LOADING } from 'state/loading/types';

const reducer = (state = {}, action = {}) => {
  switch (action.type) {
    case TOGGLE_LOADING: {
      const { id } = action.payload;
      return { ...state, [id]: !state[id] };
    }

    default: return state;
  }
};

export default reducer;
