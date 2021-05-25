import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
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
  defaultPageJoinGroups: formValueSelector('userPreferences')(state, 'defaultPageJoinGroups') || [],
  defaultContentJoinGroups: formValueSelector('userPreferences')(state, 'defaultContentJoinGroups') || [],
});

export const mapDispatchToProps = dispatch => ({
  onDidMount: () => {
    dispatch(fetchMyGroups());
  },
  onSubmit: (values) => {
    const { username, data } = values;
    dispatch(updateUserPreferences(username, data));
  },
});


export default connect(
  mapStateToProps, mapDispatchToProps,
  null, { pure: false },
)(AppSettingsForm);
