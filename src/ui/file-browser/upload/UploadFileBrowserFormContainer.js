import { connect } from 'react-redux';
import { getLoading } from 'state/loading/selectors';
import UploadFileBrowserForm from 'ui/file-browser/upload/UploadFileBrowserForm';
import { saveFile } from 'state/file-browser/actions';

export const mapStateToProps = state => ({
  loading: getLoading(state).uploadFile,
});

export const mapDispatchToProps = dispatch => ({
  onSubmit: (values) => { dispatch(saveFile(values.file)); },
});

export default connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false,
})(UploadFileBrowserForm);
