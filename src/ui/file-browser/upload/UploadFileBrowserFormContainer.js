import { connect } from 'react-redux';
import FileBrowserForm from 'ui/file-browser/common/FileBrowserForm';
import { fetchFile } from 'state/file-browser/actions';

export const mapDispatchToProps = dispatch => ({
  onSubmit: (values) => { dispatch(fetchFile(values.file)); },
});

const UploadFileBrowserFormContainer = connect(null, mapDispatchToProps)(FileBrowserForm);

export default UploadFileBrowserFormContainer;
