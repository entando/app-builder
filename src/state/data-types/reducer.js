import { combineReducers } from 'redux';
import { SET_DATA_TYPES } from 'state/data-types/types';

export const getList = (state = [], action = {}) => {
  switch (action.type) {
    case SET_DATA_TYPES: {
      return action.payload.dataTypes;
    }
    default: return state;
  }
};

export default combineReducers({
  list: getList,
});
