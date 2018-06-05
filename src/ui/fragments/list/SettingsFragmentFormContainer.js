import { connect } from 'react-redux';

import { fetchFragmentSettings, updateFragmentSettings } from 'state/fragments/actions';
import SettingsFragmentForm from 'ui/fragments/list/SettingsFragmentForm';

export const mapDispatchToProps = dispatch => ({
  onWillMount: () => {
    dispatch(fetchFragmentSettings());
  },
  onSubmit: (settings) => {
    dispatch(updateFragmentSettings(settings));
  },
});

const SettingsFragmentFormContainer =
  connect(null, mapDispatchToProps)(SettingsFragmentForm);

export default SettingsFragmentFormContainer;
