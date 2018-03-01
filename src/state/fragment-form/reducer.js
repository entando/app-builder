import { SET_FRAGMENT } from './types';

const initialState = {
  fragmentValues: {},
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_FRAGMENT:
      return Object.assign({}, state, action.payload);
    default: return state;
  }
};

export default reducer;
