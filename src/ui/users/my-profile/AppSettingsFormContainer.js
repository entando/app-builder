import { connect } from 'react-redux';
import { getUsername } from '@entando/apimanager';

// eslint-disable-next-line no-unused-vars
import { fetchUserForm, sendPutUser } from 'state/users/actions';
import AppSettingsForm from 'ui/users/my-profile/AppSettingsForm';
import { formValueSelector } from 'redux-form';

export const mapStateToProps = state => ({
  username: getUsername(state),
  wizardEnabled: formValueSelector('user')(state, 'wizardEnabled'),
});

export const mapDispatchToProps = dispatch => ({
  onDidMount: ({ username }) => { dispatch(fetchUserForm(username)); },
  onSubmit: (values) => {
    dispatch(sendPutUser(values));
  },
});


export default connect(
  mapStateToProps, mapDispatchToProps,
  null, { pure: false },
)(AppSettingsForm);
