import { combineReducers } from 'redux';
import { SET_FILE_LIST, SET_PATH_INFO } from 'state/file-browser/types';

const defaultState = {
  list: [],
  pathInfo: {
    protectedFolder: null,
    prevPath: '',
    currentPath: '',
  },
};

const list = (state = defaultState.list, action = {}) => {
  switch (action.type) {
    case SET_FILE_LIST: {
      return action.payload.fileList || defaultState.list;
    }
    default:
      return state;
  }
};

const pathInfo = (state = defaultState.pathInfo, action = {}) => {
  switch (action.type) {
    case SET_PATH_INFO: {
      return Object.assign({}, defaultState.pathInfo, action.payload.pathInfo);
    }
    default:
      return state;
  }
};

export default combineReducers({
  list,
  pathInfo,
});
