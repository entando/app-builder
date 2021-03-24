export const getFileTree = state => state.nextFiles;
export const getFileTreeMap = state => state.nextFiles.map;
export const getFileTreePathList = state => state.nextFiles.list;
export const getOpenedFile = state => state.nextFiles.opened.file;
export const getOpenedFilePath = state => state.nextFiles.opened.openedFilePath;
export const getRootNode = state => state.nextFiles.rootNode;
