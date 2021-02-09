import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import { getUsername } from '@entando/apimanager';

import { updateUserPreferences } from 'state/user-preferences/actions';
import { getUserPreferences } from 'state/user-preferences/selectors';
import AppSettingsForm from 'ui/users/my-profile/AppSettingsForm';
import { getGroupsList } from 'state/groups/selectors';
import { fetchGroups } from 'state/groups/actions';

export const mapStateToProps = state => ({
  username: getUsername(state),
  initialValues: {
    ...getUserPreferences(state),
  },
  selectGroups: getGroupsList(state).map(({ code, name }) => ({
    value: code,
    text: name,
  })),
  selectedJoinGroups: formValueSelector('userPreferences')(state, 'defaultJoinGroups') || [],
});

export const mapDispatchToProps = dispatch => ({
  onDidMount: () => {
    dispatch(fetchGroups({ page: 1, pageSize: 0 }));
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
