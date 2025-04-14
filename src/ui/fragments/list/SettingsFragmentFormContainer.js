import { connect } from 'react-redux';

import { fetchFragmentSettings, updateFragmentSettings } from 'state/fragments/actions';
import { getFragmentSettings } from 'state/fragments/selectors';
import SettingsFragmentForm from 'ui/fragments/list/SettingsFragmentForm';

export const DEFAULT_FRAGMENT_SETTINGS = {
  enableEditingWhenEmptyDefaultGui: false,
};

export const mapStateToProps = state => (
  {
    initialValues: getFragmentSettings(state) || DEFAULT_FRAGMENT_SETTINGS,
  });

export const mapDispatchToProps = dispatch => ({
  onWillMount: () => {
    dispatch(fetchFragmentSettings());
  },
  onSubmit: settings => dispatch(updateFragmentSettings(settings)),
});

export default connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false,
})(SettingsFragmentForm);
