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
    const { name, extension, content } = values;
    const file = new File([content], `${name}${extension}`);
    dispatch(saveFile(file));
  },
});

const CreateTextFileContainer = connect(mapStateToProps, mapDispatchToProps)(CreateTextFileForm);
export default CreateTextFileContainer;
