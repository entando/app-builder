import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import CreateTextFileForm from 'ui/file-browser/common/CreateTextFileForm';
import { saveFile } from 'state/file-browser/actions';

export const mapStateToProps = () => ({
  initialValues: {
    extension: '.txt',
  },
});

export const mapDispatchToProps = dispatch => ({
  onSubmit: (values) => {
    const { name, extension, content } = values;
    const file = new File([content], `${name}${extension}`);
    dispatch(saveFile(file));
  },
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  {
    pure: false,
  },
)(CreateTextFileForm));
