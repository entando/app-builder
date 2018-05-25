import { connect } from 'react-redux';

import { fetchFileList, downloadFile } from 'state/file-browser/actions';
import { getFileList, getPathInfo } from 'state/file-browser/selectors';
import { getLoading } from 'state/loading/selectors';
import FilesListTable from 'ui/file-browser/list/FilesListTable';
import { download } from 'ui/file-browser/utils/downloadFile';
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
  onClickDownload: (file) => {
    dispatch(downloadFile(file)).then((base64) => { download(file.name, base64); });
  },
  onClickDelete: (file) => {
    dispatch(setVisibleModal(MODAL_ID));
    dispatch(setInfo({ type: 'folder', file }));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(FilesListTable);
