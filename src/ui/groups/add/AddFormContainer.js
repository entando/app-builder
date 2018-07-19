import { connect } from 'react-redux';
import GroupForm from 'ui/groups/common/GroupForm';
import { change, touch } from 'redux-form';
import { sendPostGroup } from 'state/groups/actions';

export const mapDispatchToProps = dispatch => ({
  // calls post api
  onSubmit: values => dispatch(sendPostGroup(values)),
  onChangeName: (name) => {
    dispatch(change('group', 'code', name.replace(/\W/g, '_').toLowerCase()));
    dispatch(touch('group', 'code'));
  },
  onFocus: (name) => {
    dispatch(touch('group', name));
  },
});

const AddFormContainer = connect(null, mapDispatchToProps)(GroupForm);
export default AddFormContainer;
