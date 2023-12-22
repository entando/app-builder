import { combineReducers } from 'redux';
import { SET_AVATAR_FILE_NAME } from './types';

const initialState = {
  filename: '',
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

export default combineReducers({
  filename,
});

