import { SET_FILE_LIST } from 'state/file-browser/types';

const defaultState = {
  list: [],
};

const reducer = (state = defaultState, action = {}) => {
  switch (action.type) {
    case SET_FILE_LIST: {
      return { ...state, list: action.payload.fileList };
    }
    default:
      return state;
  }
};

export default reducer;
