import { SET_STATUS } from 'state/reload-configuration/types';

export const reducer = (state = {}, action = {}) => {
  switch (action.type) {
    case SET_STATUS: {
      return action.payload.status;
    }
    default: return state;
  }
};

export default reducer;
