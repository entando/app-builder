import { combineReducers } from 'redux';

import { SET_SYSTEM_REPORT } from 'state/system/types';

const report = (state = {}, action = {}) => {
  switch (action.type) {
    case SET_SYSTEM_REPORT:
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  report,
});
