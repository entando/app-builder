import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { formValueSelector } from 'redux-form';

import { fetchUserSettings, updateUserSettings } from 'state/user-settings/actions';
import RestrictionsForm from 'ui/users/restrictions/RestrictionsForm';
import { getLoading } from 'state/loading/selectors';

export const mapStateToProps = state => ({
  passwordActive: formValueSelector('user-restrictions')(state, 'passwordAlwaysActive'),
  loading: getLoading(state).userSettings,
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


const RestrictionsFormContainer = connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false,
})(RestrictionsForm);

export default injectIntl(RestrictionsFormContainer);
