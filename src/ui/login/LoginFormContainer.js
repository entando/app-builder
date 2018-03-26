
import { connect } from 'react-redux';

// import the Component to be connected
import { LoginForm } from 'frontend-common-components';

import { performLogin } from 'state/login-form/actions';
import { setCurrentLanguage } from 'state/locale/actions';
import { getLoginErrorMessage } from 'state/login-form/selectors';
import { getLocale } from 'state/locale/selectors';


export const mapStateToProps = state => ({
  loginErrorMessage: getLoginErrorMessage(state),
  currentLanguage: getLocale(state),
});

// map the props
export const mapDispatchToProps = dispatch => ({
  performLogin: (username, password) => dispatch(performLogin(username, password)),
  setLanguage: langCode => dispatch(setCurrentLanguage(langCode)),
});

// connect the component
const LoginFormContainer = connect(mapStateToProps, mapDispatchToProps)(LoginForm);

// export connected component (Container)
export default LoginFormContainer;
