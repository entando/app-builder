import { combineReducers } from 'redux';
import { SET_DATABASE_DUMPS } from 'state/database/types';

export const list = (state = [], action = {}) => {
  switch (action.type) {
    case SET_DATABASE_DUMPS: {
      return action.payload.database.map(item => item.code);
    }
    default: return state;
  }
};

export const map = (state = {}, action = {}) => {
  switch (action.type) {
    case SET_DATABASE_DUMPS: {
      return action.payload.database.reduce((acc, item) => {
        acc[item.code] = item;
        return acc;
      }, {});
    }
    default: return state;
  }
};

export default combineReducers({
  list,
  map,
});
