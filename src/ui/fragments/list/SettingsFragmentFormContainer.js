import { connect } from 'react-redux';

import { fetchFragmentSettings, updateFragmentSettings } from 'state/fragments/actions';
import SettingsFragmentForm from 'ui/fragments/list/SettingsFragmentForm';
import { getAlerts } from 'state/alerts/selectors';

export const mapStateToProps = state => ({
  alert: getAlerts(state).fragmentSettings,
});

export const mapDispatchToProps = dispatch => ({
  onWillMount: () => {
    dispatch(fetchFragmentSettings());
  },
  onSubmit: (settings) => {
    dispatch(updateFragmentSettings(settings));
  },
});

const SettingsFragmentFormContainer =
  connect(mapStateToProps, mapDispatchToProps)(SettingsFragmentForm);

export default SettingsFragmentFormContainer;
