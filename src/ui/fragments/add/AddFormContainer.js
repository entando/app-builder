import { connect } from 'react-redux';
import FragmentForm from 'ui/fragments/FragmentForm';

export const mapDispatchToProps = () => ({
  onSubmit: (values) => {
    console.log(values);
  },
});

const AddFormContainer = connect(null, mapDispatchToProps)(FragmentForm);
export default AddFormContainer;
