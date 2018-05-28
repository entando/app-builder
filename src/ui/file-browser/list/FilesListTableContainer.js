import { connect } from 'react-redux';

import { fetchFileList, downloadFile } from 'state/file-browser/actions';
import { getFileList, getPathInfo } from 'state/file-browser/selectors';
import { getLoading } from 'state/loading/selectors';
import FilesListTable from 'ui/file-browser/list/FilesListTable';
import { download } from 'ui/file-browser/utils/downloadFile';
import { setVisibleModal, setInfo } from 'state/modal/actions';
import { DELETE_FOLDER_MODAL_ID } from 'ui/file-browser/common/DeleteFolderModal';
import { DELETE_FILE_MODAL_ID } from 'ui/file-browser/common/DeleteFileModal';

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
  onClickDownload: (file) => {
    dispatch(downloadFile(file)).then((base64) => { download(file.name, base64); });
  },
  onClickDeleteFolder: (file) => {
    dispatch(setVisibleModal(DELETE_FOLDER_MODAL_ID));
    dispatch(setInfo({ type: 'folder', file }));
  },
  onClickDeleteFile: (file) => {
    dispatch(setVisibleModal(DELETE_FILE_MODAL_ID));
    dispatch(setInfo({ type: 'file', file }));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(FilesListTable);
