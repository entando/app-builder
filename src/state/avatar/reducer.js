import { combineReducers } from 'redux';
import { SET_AVATAR_FILE_NAME, SET_USE_GRAVATAR } from './types';

const initialState = {
  filename: '',
  useGravatar: false,
};

const filename = (state = initialState.filename, action = {}) => {
  switch (action.type) {
    case SET_AVATAR_FILE_NAME: {
      return action.payload.filename;
    }
    default:
      return state;
  }
};

const useGravatar = (state = initialState.useGravatar, action = {}) => {
  switch (action.type) {
    case SET_USE_GRAVATAR: {
      return action.payload.useGravatar;
    }
    default:
      return state;
  }
};

export default combineReducers({
  filename,
  useGravatar,
});

