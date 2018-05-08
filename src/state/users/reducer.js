import { combineReducers } from 'redux';
import { SET_USERS, SET_SELECTED_USER, SET_SELECTED_USER_AUTHORITIES, SET_USERS_TOTAL } from 'state/users/types';
import { ACTION_SAVE, ACTION_UPDATE } from 'state/users/const';

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

export const selected = (state = {}, action = {}) => {
  switch (action.type) {
    case SET_SELECTED_USER: {
      return action.payload.user;
    }
    default: return state;
  }
};

export const authorities = (state = [], action = {}) => {
  switch (action.type) {
    case SET_SELECTED_USER_AUTHORITIES: {
      let result = { username: action.payload.username };
      if (action.payload.authorities.length > 0) {
        result = { ...result, action: ACTION_UPDATE };
      } else {
        result = { ...result, action: ACTION_SAVE };
      }
      return result;
    }
    default: return state;
  }
};

export const total = (state = 0, action = {}) => {
  switch (action.type) {
    case SET_USERS_TOTAL: {
      return action.payload.usersTotal;
    }
    default: return state;
  }
};

export default combineReducers({
  list,
  map: userMap,
  selected,
  authorities,
  total,
});
