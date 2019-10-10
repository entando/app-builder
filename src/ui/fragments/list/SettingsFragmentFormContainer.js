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

export default connect(null, mapDispatchToProps, null, {
  pure: false,
})(SettingsFragmentForm);
