
import { connect } from 'react-redux';

// import the Component to be connected
import { LoginForm, gotoRoute } from 'frontend-common-components';

import { login } from 'api/login';


const mapStateToProps = () => ({
  loginErrorMessage: '',
});

// map the props
const mapDispatchToProps = () => ({
  performLogin: (username, password) => {
    login(username, password).then(() => {
      gotoRoute('dashboard');
    });
  },
});

// connect the component
const LoginFormContainer = connect(mapStateToProps, mapDispatchToProps)(LoginForm);

// export connected component (Container)
export default LoginFormContainer;
