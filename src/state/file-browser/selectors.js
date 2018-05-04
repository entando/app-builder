import { createSelector } from 'reselect';

export const getFileBrowser = state => state.fileBrowser;

export const getFileList = createSelector(
  getFileBrowser,
  fileBrowser => fileBrowser.list,
);
