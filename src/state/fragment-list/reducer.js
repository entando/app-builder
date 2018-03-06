import { SET_FRAGMENTS } from 'state/fragment-list/types';

const reducer = (state = [], action = {}) => {
  switch (action.type) {
    case SET_FRAGMENTS: {
      return action.payload.fragments;
    }
    default: return state;
  }
};

export default reducer;
