import { addToast, addErrors, TOAST_ERROR } from '@entando/messages';

import { getNextFile, getNextFileTree } from 'api/nextPages';
import { toggleLoading } from 'state/loading/actions';
import {
  CHANGE_OPENED_FILE_CONTENT, DISCARD_OPENED_FILE_UNSAVED_CONTENT, OPEN_FILE,
  RESET_OPENED_FILE_CONTENT, SAVE_OPENED_FILE_CONTENT, SET_NEXT_FILE_TREE, SET_ROOT_NODE,
  SET_OPEN_FILE_PATH,
} from 'state/next-pages/types';

export const setRootNode = tree => ({
  type: SET_ROOT_NODE,
  payload: tree,
});

export const setNextFileTree = tree => ({
  type: SET_NEXT_FILE_TREE,
  payload: tree,
});

export const setOpenFile = file => ({
  type: OPEN_FILE,
  payload: file,
});

export const setOpenFilePath = path => ({
  type: SET_OPEN_FILE_PATH,
  payload: path,
});

export const changeOpenedFileContent = newContent => ({
  type: CHANGE_OPENED_FILE_CONTENT,
  payload: newContent,
});

export const saveOpenedFileContent = newContent => ({
  type: SAVE_OPENED_FILE_CONTENT,
  payload: newContent,
});

export const discardOpenedFileUnsavedContent = newContent => ({
  type: DISCARD_OPENED_FILE_UNSAVED_CONTENT,
  payload: newContent,
});

export const resetOpenedFileContent = newContent => ({
  type: RESET_OPENED_FILE_CONTENT,
  payload: newContent,
});


// thunks

export const fetchNextFileTree = (maxDepth = 0, params = '') => dispatch => (
  new Promise((resolve) => {
    dispatch(toggleLoading('nextFileTree'));
    getNextFileTree(maxDepth, params).then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          dispatch(setRootNode(json.payload));
          dispatch(setNextFileTree(json.payload));
        } else if (json && json.errors) {
          dispatch(addErrors(json.errors.map(err => err.message)));
          json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
        }
        dispatch(toggleLoading('nextFileTree'));
        resolve();
      });
    }).catch(() => {});
  })
);

export const fetchNextFile = (path, params = '') => dispatch => (
  new Promise((resolve) => {
    dispatch(toggleLoading('openNextFile'));
    getNextFile(path, params).then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          dispatch(setOpenFile(json.payload));
        } else if (json && json.errors) {
          dispatch(addErrors(json.errors.map(err => err.message)));
          json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
        }
        dispatch(toggleLoading('openNextFile'));
        resolve();
      });
    }).catch(() => {});
  })
);

export const sendCreateNewFile = (path, params = '') => dispatch => (
  new Promise((resolve) => {
    dispatch(toggleLoading('createNewNextFile'));
    getNextFile(path, params).then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          dispatch(fetchNextFileTree());
        } else if (json && json.errors) {
          dispatch(addErrors(json.errors.map(err => err.message)));
          json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
        }
        dispatch(toggleLoading('createNewNextFile'));
        resolve();
      });
    }).catch(() => {});
  })
);

export const sendDelete = (path, params = '') => dispatch => (
  new Promise((resolve) => {
    dispatch(toggleLoading('deleteNextFile'));
    getNextFile(path, params).then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          dispatch(fetchNextFileTree());
        } else if (json && json.errors) {
          dispatch(addErrors(json.errors.map(err => err.message)));
          json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
        }
        dispatch(toggleLoading('deleteNextFile'));
        resolve();
      });
    }).catch(() => {});
  })
);
