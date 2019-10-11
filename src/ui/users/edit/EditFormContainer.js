import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { fetchUserForm, sendPutUser } from 'state/users/actions';
import UserForm from 'ui/users/common/UserForm';

const EDIT_MODE = 'edit';

export const mapStateToProps = (state, { match: { params } }) => ({
  mode: EDIT_MODE,
  username: params.username,
});

export const mapDispatchToProps = dispatch => ({
  onWillMount: ({ username }) => { dispatch(fetchUserForm(username)); },
  onSubmit: (user) => { dispatch(sendPutUser(user)); },
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false,
})(UserForm));
