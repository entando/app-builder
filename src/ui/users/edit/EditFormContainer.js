import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { formValueSelector, submit } from 'redux-form';
import { routeConverter } from '@entando/utils';

import { fetchUserForm, sendPutUser } from 'state/users/actions';
import { setVisibleModal } from 'state/modal/actions';
import { ConfirmCancelModalID } from 'ui/common/cancel-modal/ConfirmCancelModal';
import { ROUTE_USER_LIST } from 'app-init/router';
import UserForm from 'ui/users/common/UserForm';

const EDIT_MODE = 'edit';

export const mapStateToProps = (state, { match: { params } }) => ({
  mode: EDIT_MODE,
  username: params.username,
  password: formValueSelector('user')(state, 'password'),
});

export const mapDispatchToProps = (dispatch, { history }) => ({
  onWillMount: ({ username }) => { dispatch(fetchUserForm(username)); },
  onSubmit: (user) => {
    const editUser = { ...user, profileType: (user.profileType || {}).typeCode || '' };
    dispatch(sendPutUser(editUser));
  },
  onSave: () => { dispatch(setVisibleModal('')); dispatch(submit('user')); },
  onCancel: () => dispatch(setVisibleModal(ConfirmCancelModalID)),
  onDiscard: () => { dispatch(setVisibleModal('')); history.push(routeConverter(ROUTE_USER_LIST)); },
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false,
})(UserForm));
