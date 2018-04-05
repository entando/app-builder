import { connect } from 'react-redux';
import SettingsFragmentForm from 'ui/fragments/list/SettingsFragmentForm';

export const mapDispatchToProps = () => ({
  onSubmit: (value) => { console.log(value); },
});

const SettingsFragmentFormContainer = connect(null, mapDispatchToProps)(SettingsFragmentForm);

export default SettingsFragmentFormContainer;
