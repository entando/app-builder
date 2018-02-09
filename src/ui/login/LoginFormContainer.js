
import { connect } from 'react-redux';

// import the Component to be connected
import { LoginForm } from 'frontend-common-components';

import { performLogin } from 'state/form/actions';
import { getLoginErrorMessage } from 'state/form/selectors';


export const mapStateToProps = state => ({
  loginErrorMessage: getLoginErrorMessage(state),
});

// map the props
export const mapDispatchToProps = dispatch => ({
  performLogin: (username, password) => dispatch(performLogin(username, password)),
});

// connect the component
const LoginFormContainer = connect(mapStateToProps, mapDispatchToProps)(LoginForm);

// export connected component (Container)
export default LoginFormContainer;
