import { connect } from 'react-redux';
import { destroy, submit } from 'redux-form';
import { withRouter } from 'react-router-dom';
import { routeConverter } from '@entando/utils';

import { fetchProfileTypes } from 'state/profile-types/actions';
import { getProfileTypesOptions } from 'state/profile-types/selectors';
import { sendPostUser } from 'state/users/actions';
import { setVisibleModal } from 'state/modal/actions';
import { ConfirmCancelModalID } from 'ui/common/cancel-modal/ConfirmCancelModal';
import { ROUTE_USER_LIST } from 'app-init/router';

import UserForm from 'ui/users/common/UserForm';

export const mapStateToProps = state => ({
  profileTypes: getProfileTypesOptions(state),
});

export const mapDispatchToProps = (dispatch, { history }) => ({
  onSubmit: (user) => {
    const { saveType } = user;
    dispatch(sendPostUser(user, saveType === 'editProfile'));
  },
  onWillMount: () => {
    dispatch(destroy('user'));
    dispatch(fetchProfileTypes({ page: 1, pageSize: 0 }));
  },
  onSave: () => { dispatch(setVisibleModal('')); dispatch(submit('user')); },
  onCancel: () => dispatch(setVisibleModal(ConfirmCancelModalID)),
  onDiscard: () => { dispatch(setVisibleModal('')); history.push(routeConverter(ROUTE_USER_LIST)); },
});

const AddFormContainer = connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false,
})(UserForm);

export default withRouter(AddFormContainer);
