import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { download } from 'ui/file-browser/utils/downloadFile';
import { saveFile, downloadFile, fetchFile } from 'state/file-browser/actions';

import CreateTextFileForm from 'ui/file-browser/common/CreateTextFileForm';

import { history, ROUTE_FILE_BROWSER } from 'app-init/router';

export const mapStateToProps = (state, { match: { params } }) => ({
  mode: 'edit',
  filename: params.filename,
});

export const mapDispatchToProps = dispatch => ({
  onWillMount: (filename) => {
    dispatch(fetchFile(filename, ['.txt', '.css']))
      .catch(() => {
        history.push(ROUTE_FILE_BROWSER);
      });
  },
  onClickDownload: (file) => {
    dispatch(downloadFile(file)).then((base64) => { download(file.name, base64); });
  },
  onSubmit: (file) => {
    dispatch(saveFile(file));
  },
});

const mergeProps = (stateProps, dispatchProps) => ({
  ...stateProps,
  ...dispatchProps,
  onSubmit: (values) => {
    const data = stateProps.filename.split('.');
    const file = new File([values.content], `${data[0]}.${data[1]}`);
    dispatchProps.onSubmit(file);
  },
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(CreateTextFileForm));
