import { connect } from 'react-redux';
import UserForm from 'ui/users/common/UserForm';

export const mapDispatchToProps = () => ({
  onSubmit: () => {},
});

const AddFormContainer = connect(null, mapDispatchToProps)(UserForm);
export default AddFormContainer;
