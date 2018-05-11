import { connect } from 'react-redux';

import { fetchUserSettings, updateUserSettings } from 'state/user-settings/actions';
import { getUserSettings } from 'state/user-settings/selectors';
import RestrictionsForm from 'ui/users/restrictions/RestrictionsForm';

export const mapStateToProps = state => ({
  settings: getUserSettings(state),
});

export const mapDispatchToProps = dispatch => ({
  onWillMount: () => dispatch(fetchUserSettings()),
  onSubmit: settings => dispatch(updateUserSettings(settings)),
});


export default connect(mapStateToProps, mapDispatchToProps)(RestrictionsForm);
