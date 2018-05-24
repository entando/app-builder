import { connect } from 'react-redux';

import { fetchFileList } from 'state/file-browser/actions';
import { getFileList, getPathInfo } from 'state/file-browser/selectors';
import { getLoading } from 'state/loading/selectors';
import FilesListTable from 'ui/file-browser/list/FilesListTable';
import { setVisibleModal, setInfo } from 'state/modal/actions';
import { MODAL_ID } from 'ui/file-browser/common/DeleteFolderModal';

export const mapStateToProps = state => (
  {
    files: getFileList(state),
    pathInfo: getPathInfo(state),
    loading: getLoading(state).files,
  }
);

export const mapDispatchToProps = dispatch => ({
  onWillMount: (protectedFolder = '', path = '') => {
    dispatch(fetchFileList(protectedFolder, path));
  },
  onClickDelete: (file) => {
    dispatch(setVisibleModal(MODAL_ID));
    dispatch(setInfo({ type: 'folder', file }));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(FilesListTable);
