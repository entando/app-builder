import { connect } from 'react-redux';
import { getUsername } from '@entando/apimanager';
import { submit } from 'redux-form';

import { sendPostMyPassword } from 'state/users/actions';
import AccountForm from 'ui/users/my-profile/AccountForm';
import { setVisibleModal } from 'state/modal/actions';
import { getLocale } from 'state/locale/selectors';

export const mapStateToProps = state => ({
  username: getUsername(state),
  locale: getLocale(state),
});

export const mapDispatchToProps = dispatch => ({
  onSubmit: (data) => {
    dispatch(sendPostMyPassword({ ...data, newPasswordConfirm: undefined }));
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
      const { oldPassword, newPassword } = data;
      dispatchProps.onSubmit({ oldPassword, newPassword });
    },
  }),
  { pure: false },
)(AccountForm);
