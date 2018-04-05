import { connect } from 'react-redux';

import { getErrors } from 'state/errors/selectors';
import { fetchFragmentSettings, updateFragmentSettings } from 'state/fragments/actions';
import SettingsFragmentForm from 'ui/fragments/list/SettingsFragmentForm';

export const mapStateToProps = state => ({
  error: getErrors(state),
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
