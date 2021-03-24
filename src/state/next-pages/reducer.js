import { combineReducers } from 'redux';
import {
  CHANGE_OPENED_FILE_CONTENT, DISCARD_OPENED_FILE_UNSAVED_CONTENT, OPEN_FILE,
  RESET_OPENED_FILE_CONTENT, SAVE_OPENED_FILE_CONTENT, SET_NEXT_FILE_TREE,
  SET_OPEN_FILE_PATH, SET_ROOT_NODE,
} from 'state/next-pages/types';
import { generateDirectoryTree } from 'ui/monaco/file-tree/index';

const map = (state = {}, action = {}) => {
  switch (action.type) {
    case SET_NEXT_FILE_TREE: {
      return action.payload.reduce((acc, file) => {
        acc[file.path] = file;
        return acc;
      }, {});
    }
    default: return state;
  }
};

const list = (state = [], action = {}) => {
  switch (action.type) {
    case SET_NEXT_FILE_TREE:
      return action.payload.map(file => file.path);
    default: return state;
  }
};

const opened = (state = { file: {} }, action = {}) => {
  switch (action.type) {
    case SET_OPEN_FILE_PATH: {
      return { ...state, openedFilePath: action.payload };
    }
    case OPEN_FILE: {
      const file = action.payload;
      const newFile = { ...file, lastSavedContent: file.content, currentContent: file.content };
      return { ...state, file: newFile };
    }
    case CHANGE_OPENED_FILE_CONTENT: {
      const changedFile = { ...state.file, currentContent: action.payload };
      return { ...state, file: changedFile };
    }
    case SAVE_OPENED_FILE_CONTENT: {
      const savedFile = { ...state.file, lastSavedContent: action.payload };
      return { ...state, file: savedFile };
    }
    case DISCARD_OPENED_FILE_UNSAVED_CONTENT: {
      const discardedFile = { ...state.file, currentContent: state.lastSavedContent };
      return { ...state, file: discardedFile };
    }
    case RESET_OPENED_FILE_CONTENT: {
      const resetFile = {
        ...state.file,
        lastSavedContent: state.content,
        currentContent: state.content,
      };
      return { ...state, file: resetFile };
    }
    default: return state;
  }
};

const rootNode = (state = null, action = {}) => {
  switch (action.type) {
    case SET_ROOT_NODE: {
      const tree = action.payload;
      return generateDirectoryTree(tree.map(t => t.path), 'root');
    }
    default: return state;
  }
};

export default combineReducers({
  map,
  list,
  opened,
  rootNode,
});
