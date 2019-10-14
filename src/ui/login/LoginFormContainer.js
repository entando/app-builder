import { connect } from 'react-redux';
import { LoginForm } from '@entando/pages';

import { performLogin } from 'state/login-form/actions';
import { setCurrentLanguage } from 'state/locale/actions';
import { getLoginErrorMessage } from 'state/login-form/selectors';
import { getLocale } from 'state/locale/selectors';


export const mapStateToProps = state => ({
  loginErrorMessage: getLoginErrorMessage(state),
  currentLanguage: getLocale(state),
});

export const mapDispatchToProps = dispatch => ({
  performLogin: (username, password) => dispatch(performLogin(username, password)),
  setLanguage: langCode => dispatch(setCurrentLanguage(langCode)),
});

export default connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false,
})(LoginForm);
