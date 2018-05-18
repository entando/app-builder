import { createSelector } from 'reselect';

export const getFileBrowser = state => state.fileBrowser;

export const getFileList = createSelector(
  getFileBrowser,
  fileBrowser => fileBrowser.list,
);

export const getPathInfo = createSelector(
  getFileBrowser,
  fileBrowser => fileBrowser.pathInfo,
);
