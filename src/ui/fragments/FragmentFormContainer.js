import { connect } from 'react-redux';
import FragmentForm from './FragmentForm';

export const mapDispatchToProps = () => ({
  onSubmit: (values) => {
    console.log(values);
  },
});

const FragmentFormContainer = connect(null, mapDispatchToProps)(FragmentForm);
export default FragmentFormContainer;
