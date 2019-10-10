import { connect } from 'react-redux';
import { getUsername } from '@entando/apimanager';

import { sendPostUserPassword } from 'state/users/actions';
import PasswordForm from 'ui/users/my-profile/PasswordForm';

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
});


export default connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false,
})(PasswordForm);
