import { connect } from 'react-redux';
import { getParams } from '@entando/router';
import { download } from 'ui/file-browser/utils/downloadFile';
import { saveFile, downloadFile, fetchFile } from 'state/file-browser/actions';

import CreateTextFileForm from 'ui/file-browser/common/CreateTextFileForm';

export const mapStateToProps = state => ({
  mode: 'edit',
  initialValues: {
    extension: '.txt',
  },
  filename: getParams(state).filename,
});

export const mapDispatchToProps = dispatch => ({
  onWillMount: (filename) => {
    dispatch(fetchFile(filename));
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

const EditTextFileContainer =
  connect(mapStateToProps, mapDispatchToProps, mergeProps)(CreateTextFileForm);
export default EditTextFileContainer;
