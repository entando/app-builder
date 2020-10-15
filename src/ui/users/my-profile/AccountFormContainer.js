import { connect } from 'react-redux';
import { getUsername } from '@entando/apimanager';
import { submit } from 'redux-form';

import { sendPostUserPassword } from 'state/users/actions';
import AccountForm from 'ui/users/my-profile/AccountForm';
import { setVisibleModal } from 'state/modal/actions';

export const mapStateToProps = state => ({
  username: getUsername(state),
});

export const mapDispatchToProps = dispatch => ({
  onSubmit: (username, data) => {
    dispatch(sendPostUserPassword(
      username,
      {
        ...data,
        username,
      },
    ));
  },
  onEdit: () => {
    dispatch(setVisibleModal(AccountForm.FORM_ID));
  },
  onModalFormSubmit: () => {
    dispatch(submit(AccountForm.FORM_ID));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  (stateProps, dispatchProps, ownProps) => ({
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
    onSubmit: (data) => {
      dispatchProps.onSubmit(stateProps.username, data);
    },
  }),
  { pure: false },
)(AccountForm);
