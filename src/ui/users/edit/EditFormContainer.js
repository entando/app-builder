import { connect } from 'react-redux';
import { getParams } from 'frontend-common-components';

import { fetchUserForm } from 'state/users/actions';
import UserForm from 'ui/users/common/UserForm';

export const mapStateToProps = state => ({
  mode: 'edit',
  username: getParams(state).username,
});

export const mapDispatchToProps = dispatch => ({
  onWillMount: ({ username }) => { dispatch(fetchUserForm(username)); },
  onSubmit: (values) => { console.log(values); },
});


const EditFormContainer = connect(mapStateToProps, mapDispatchToProps)(UserForm);
export default EditFormContainer;
