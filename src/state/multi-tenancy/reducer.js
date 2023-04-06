import { combineReducers } from 'redux';
import { SET_CURRENT_TENANT } from 'state/multi-tenancy/types';

const currentTenant = (state = {}, action = {}) => {
  switch (action.type) {
    case SET_CURRENT_TENANT:
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  currentTenant,
});
