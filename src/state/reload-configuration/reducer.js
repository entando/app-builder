import { SET_STATUS, SET_RELOAD_INFO, SET_LOADING } from 'state/reload-configuration/types';
import { combineReducers } from 'redux';

const initialState = {
  status: null,
  percentage: null,
  info: null,
  loading: false,
};

export const status = (state = initialState.status, action = {}) => {
  switch (action.type) {
    case SET_STATUS: {
      return action.payload.status;
    }
    default: return state;
  }
};

export const percentage = (state = initialState.percentage, action = {}) => {
  switch (action.type) {
    case SET_RELOAD_INFO: {
      return action.payload.percentage;
    }
    default: return state;
  }
};

export const info = (state = initialState.info, action = {}) => {
  switch (action.type) {
    case SET_RELOAD_INFO: {
      return action.payload.info;
    }
    default: return state;
  }
};

export const loading = (state = initialState.loading, action = {}) => {
  switch (action.type) {
    case SET_LOADING: {
      return action.payload.loading;
    }
    default: return state;
  }
};

export default combineReducers({
  status,
  percentage,
  info,
  loading,
});
