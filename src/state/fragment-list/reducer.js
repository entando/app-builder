import { ADD_FRAGMENTS } from 'state/fragment-list/types';

const reducer = (state = [], action = {}) => {
  switch (action.type) {
    case ADD_FRAGMENTS: {
      return [...state, ...action.payload.fragments];
    }
    default: return state;
  }
};

export default reducer;
