import { SET_FILE_LIST, SET_PATH_INFO } from 'state/file-browser/types';

const defaultState = {
  list: [],
  pathInfo: {
    protectedFolder: null,
    prevPath: '',
    currentPath: '',
  },
};

const reducer = (state = defaultState, action = {}) => {
  switch (action.type) {
    case SET_FILE_LIST: {
      return { ...state, list: action.payload.fileList || defaultState.list };
    }
    case SET_PATH_INFO: {
      return {
        ...state,
        pathInfo: {
          protectedFolder: action.payload.pathInfo.protectedFolder,
          prevPath: action.payload.pathInfo.prevPath || defaultState.pathInfo.prevPath,
          currentPath: action.payload.pathInfo.currentPath || defaultState.pathInfo.currentPath,
        },
      };
    }
    default:
      return state;
  }
};

export default reducer;
