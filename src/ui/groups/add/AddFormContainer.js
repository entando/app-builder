import { connect } from 'react-redux';
import GroupForm from 'ui/groups/common/GroupForm';

export const mapDispatchToProps = () => ({
  // calls post api
  onSubmit: (values) => { console.log(values); },
});

const AddFormContainer = connect(null, mapDispatchToProps)(GroupForm);
export default AddFormContainer;
