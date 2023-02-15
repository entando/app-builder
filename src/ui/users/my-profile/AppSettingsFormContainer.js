import { connect } from 'react-redux';
import { getUsername } from '@entando/apimanager';

import { updateUserPreferences } from 'state/user-preferences/actions';
import { getUserPreferences } from 'state/user-preferences/selectors';
import AppSettingsForm from 'ui/users/my-profile/AppSettingsForm';
import { getGroupsList } from 'state/groups/selectors';
import { fetchMyGroups } from 'state/groups/actions';

export const mapStateToProps = state => ({
  username: getUsername(state),
  initialValues: {
    ...getUserPreferences(state),
  },
  selectGroups: getGroupsList(state).map(({ code, name }) => ({
    value: code,
    text: name,
  })),
});

export const mapDispatchToProps = dispatch => ({
  onDidMount: () => {
    dispatch(fetchMyGroups());
  },
  onSubmit: (values) => {
    const { username, data } = values;
    console.log('values', values);
    dispatch(updateUserPreferences(username, data));
  },
});

export default connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false,
})(AppSettingsForm);
