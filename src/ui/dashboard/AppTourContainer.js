import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';

import { fetchUserForm, sendPostWizardSetting } from 'state/users/actions';
import { getUsername } from '@entando/apimanager';

import AppTour from 'ui/dashboard/AppTour';


export const mapStateToProps = state => ({
  username: getUsername(state),
  wizardEnabled: formValueSelector('user')(state, 'wizardEnabled'),
});

export const mapDispatchToProps = dispatch => ({
  onDidMount: ({ username }) => { dispatch(fetchUserForm(username)); },
  onToggleDontShow: (disableWizard, username) => {
    dispatch(sendPostWizardSetting(username, { wizardEnabled: !disableWizard, showToast: false }));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppTour);
