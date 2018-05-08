import { SET_APIS, SET_PLUGINS } from 'state/dashboard/types';

const defaultState = {
  apis: 0,
  plugins: 0,
};

const reducer = (state = defaultState, action = {}) => {
  switch (action.type) {
    case SET_APIS:
      return { ...state, apis: action.payload.apis };
    case SET_PLUGINS:
      return { ...state, plugins: action.payload.plugins };
    default:
      return state;
  }
};

export default reducer;
