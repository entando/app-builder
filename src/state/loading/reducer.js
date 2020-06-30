import { TOGGLE_LOADING, SET_LOADING } from 'state/loading/types';

const reducer = (state = {}, action = {}) => {
  switch (action.type) {
    case TOGGLE_LOADING: {
      const { id } = action.payload;
      return { ...state, [id]: !state[id] };
    }

    case SET_LOADING: {
      const { id, value } = action.payload;
      return { ...state, [id]: value };
    }

    default: return state;
  }
};

export default reducer;
