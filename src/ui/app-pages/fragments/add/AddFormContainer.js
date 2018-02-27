import { connect } from 'react-redux';
import FragmentForm from 'ui/app-pages/fragments/FragmentForm';

export const mapDispatchToProps = () => ({
  onSubmit: (values) => {
    console.log(values);
  },
});

const AddFormContainer = connect(null, mapDispatchToProps)(FragmentForm);
export default AddFormContainer;
