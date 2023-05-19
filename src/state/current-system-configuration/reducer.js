import { combineReducers } from 'redux';

import { SET_CURRENT_SYSTEM_CONFIGURATION } from 'state/current-system-configuration/types';

const currentSystemConfiguration = (state = {}, action = {}) => {
  switch (action.type) {
    case SET_CURRENT_SYSTEM_CONFIGURATION:
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  currentSystemConfiguration,
});
