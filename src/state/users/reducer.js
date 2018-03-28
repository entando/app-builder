import { combineReducers } from 'redux';
import { SET_USERS, SET_SELECTED_USER, TOGGLE_LOADING } from 'state/users/types';

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

export const loading = (state = {}, action = {}) => {
  switch (action.type) {
    case TOGGLE_LOADING: {
      return { ...state, [action.payload.id]: !state[action.payload.id] };
    }
    default: return state;
  }
};
export default combineReducers({
  list,
  map: userMap,
  selected,
  loading,
});
