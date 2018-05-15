import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';

import { fetchUserSettings, updateUserSettings } from 'state/user-settings/actions';
import RestrictionsForm from 'ui/users/restrictions/RestrictionsForm';

export const mapStateToProps = state => ({
  passwordActive: formValueSelector('user-restrictions')(state, 'passwordAlwaysActive'),
});

export const mapDispatchToProps = dispatch => ({
  onWillMount: () => dispatch(fetchUserSettings()),
  onSubmit: (settings) => {
    dispatch(updateUserSettings({
      ...settings,
      restrictionsActive: !settings.passwordAlwaysActive,
    }));
  },
});


export default connect(mapStateToProps, mapDispatchToProps)(RestrictionsForm);
