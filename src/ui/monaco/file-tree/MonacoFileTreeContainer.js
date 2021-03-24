import { connect } from 'react-redux';

import MonacoFileTree from 'ui/monaco/file-tree/MonacoFileTree';
import { getFileTreePathList, getRootNode } from 'state/next-pages/selectors';
import { getLoading } from 'state/loading/selectors';
import { fetchNextFileTree, setOpenFilePath } from 'state/next-pages/actions';
import { setInfo, setVisibleModal } from 'state/modal/actions';
import { MODAL_ID } from 'ui/monaco/file-tree/modals/DeleteFileOrFolderModal';
import { MODAL_ID as CREATE_NEW_MODAL_ID } from 'ui/monaco/file-tree/modals/CreateNewFileOrFolderModal';

export const mapStateToProps = state => ({
  loading: getLoading(state).nextFileTree,
  filePathsList: getFileTreePathList(state),
  rootNode: getRootNode(state),
});

export const mapDispatchToProps = dispatch => ({
  onDidMount: () => {
    dispatch(fetchNextFileTree());
  },
  onOpenFile: (path) => {
    dispatch(setOpenFilePath(path));
  },
  onDelete: (path) => {
    dispatch(setInfo({ path }));
    dispatch(setVisibleModal(MODAL_ID));
  },
  onCreateNew: (path, isDirectory) => {
    dispatch(setInfo({ path, isDirectory }));
    dispatch(setVisibleModal(CREATE_NEW_MODAL_ID));
  },
});

export default connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false,
})(MonacoFileTree);
