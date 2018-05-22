import { connect } from 'react-redux';
import UploadFileBrowserForm from 'ui/file-browser/upload/UploadFileBrowserForm';
import { saveFile } from 'state/file-browser/actions';

export const mapDispatchToProps = dispatch => ({
  onSubmit: (values) => { dispatch(saveFile(values.file)); },
});

const UploadFileBrowserFormContainer = connect(null, mapDispatchToProps)(UploadFileBrowserForm);

export default UploadFileBrowserFormContainer;
