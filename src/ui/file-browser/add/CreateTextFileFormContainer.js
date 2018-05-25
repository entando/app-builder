import { connect } from 'react-redux';
import CreateTextFileForm from 'ui/file-browser/add/CreateTextFileForm';
import { saveFile } from 'state/file-browser/actions';

export const mapStateToProps = () => ({
  initialValues: {
    extension: '.txt',
  },
});

export const mapDispatchToProps = dispatch => ({
  onSubmit: (values) => {
    const { path, extension, content } = values;
    const file = new File([content], `${path}${extension}`);
    dispatch(saveFile(file));
  },
});

const CreateTextFileContainer = connect(mapStateToProps, mapDispatchToProps)(CreateTextFileForm);
export default CreateTextFileContainer;
