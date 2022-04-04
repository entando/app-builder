import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { withRouter } from 'react-router-dom';

import { fetchFileList, downloadFile } from 'state/file-browser/actions';
import { getFileList, getPathInfo } from 'state/file-browser/selectors';
import { getLoading } from 'state/loading/selectors';
import FilesListTable from 'ui/file-browser/list/FilesListTable';
import { download } from 'ui/file-browser/utils/downloadFile';
import { setVisibleModal, setInfo } from 'state/modal/actions';
import { DELETE_FOLDER_MODAL_ID } from 'ui/file-browser/common/DeleteFolderModal';
import { DELETE_FILE_MODAL_ID } from 'ui/file-browser/common/DeleteFileModal';
import { ROUTE_FILE_BROWSER } from 'app-init/router';

export const mapStateToProps = state => (
  {
    files: getFileList(state),
    pathInfo: getPathInfo(state),
    loading: getLoading(state).files,
  }
);

export const mapDispatchToProps = (dispatch, { history }) => {
  const prevLoc = history.location.state && history.location.state.from;

  return ({
    onWillMount: (protectedFolder = '', path = '') => {
      if (!prevLoc || prevLoc === ROUTE_FILE_BROWSER || !prevLoc.startsWith(ROUTE_FILE_BROWSER)) {
        dispatch(fetchFileList(protectedFolder, path));
      }
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
};

export default withRouter(injectIntl(connect(mapStateToProps, mapDispatchToProps)(FilesListTable)));
