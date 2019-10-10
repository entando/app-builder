import { connect } from 'react-redux';
import { sendPostCreateFolder } from 'state/file-browser/actions';
import CreateFolderForm from 'ui/file-browser/add/CreateFolderForm';

export const mapDispatchToProps = dispatch => ({
  onSubmit: (values) => {
    dispatch(sendPostCreateFolder(values));
  },
});

export default connect(null, mapDispatchToProps, null, {
  pure: false,
})(CreateFolderForm);
