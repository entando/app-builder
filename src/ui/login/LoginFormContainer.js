import { connect } from 'react-redux';
import { LoginForm } from '@entando/pages';
import { injectIntl } from 'react-intl';

import { performLogin } from 'state/login-form/actions';
import { setCurrentLanguage } from 'state/locale/actions';
import { getLoginErrorMessage } from 'state/login-form/selectors';
import { getLocale } from 'state/locale/selectors';


export const mapStateToProps = (state, { intl }) => {
  const errorMessage = getLoginErrorMessage(state);
  const loginErrorMessage = (errorMessage && errorMessage.id && intl.formatMessage(errorMessage))
  || null;
  return {
    loginErrorMessage,
    currentLanguage: getLocale(state),
  };
};

export const mapDispatchToProps = dispatch => ({
  performLogin: (username, password) => dispatch(performLogin(username, password)),
  setLanguage: langCode => dispatch(setCurrentLanguage(langCode)),
});

const LoginFormContainer = connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false,
})(LoginForm);

export default injectIntl(LoginFormContainer);
