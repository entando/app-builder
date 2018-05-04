import { SET_STATUS } from 'state/reload-configuration/types';

export const status = (state = {}, action = {}) => {
  switch (action.type) {
    case SET_STATUS: {
      return action.payload.status;
    }
    default: return state;
  }
};

export default status;
