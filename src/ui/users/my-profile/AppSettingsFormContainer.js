import { connect } from 'react-redux';
import { getUsername } from '@entando/apimanager';

import { updateUserPreferences } from 'state/user-preferences/actions';
import { getUserPreferences } from 'state/user-preferences/selectors';
import AppSettingsForm from 'ui/users/my-profile/AppSettingsForm';

export const mapStateToProps = state => ({
  username: getUsername(state),
  initialValues: {
    ...getUserPreferences(state),
  },
});

export const mapDispatchToProps = dispatch => ({
  onSubmit: (values) => {
    const { username, data } = values;
    dispatch(updateUserPreferences(username, data));
  },
});


export default connect(
  mapStateToProps, mapDispatchToProps,
  null, { pure: false },
)(AppSettingsForm);
