import { combineReducers } from 'redux';
import { SET_USERS } from 'state/users/types';

const toMap = array => array.reduce((acc, user) => {
  acc[user.username] = user;
  return acc;
}, {});

const toIdList = array => array.map(user => user.username);

export const list = (state = [], action = {}) => {
  switch (action.type) {
    case SET_USERS: {
      return toIdList(action.payload.users);
    }
    default: return state;
  }
};

const userMap = (state = {}, action = {}) => {
  switch (action.type) {
    case SET_USERS: {
      return toMap(action.payload.users);
    }
    default: return state;
  }
};


export default combineReducers({
  list,
  map: userMap,
});
