import { SET_WIDGET } from './types';

const initialState = {
  mode: '',
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_WIDGET:
      return Object.assign({}, state, action.payload);
    default: return state;
  }
};

export default reducer;
