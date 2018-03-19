import { connect } from 'react-redux';
import { getParams } from 'frontend-common-components';

import { fetchUserForm, sendPutUser } from 'state/users/actions';
import UserForm from 'ui/users/common/UserForm';

const EDIT_MODE = 'edit';

export const mapStateToProps = state => ({
  mode: EDIT_MODE,
  username: getParams(state).username,
});

export const mapDispatchToProps = dispatch => ({
  onWillMount: ({ username }) => { dispatch(fetchUserForm(username)); },
  onSubmit: (user) => { dispatch(sendPutUser(user)); },
});


const EditFormContainer = connect(mapStateToProps, mapDispatchToProps)(UserForm);
export default EditFormContainer;
