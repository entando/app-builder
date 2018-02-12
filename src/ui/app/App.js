import React from 'react';
import PropTypes from 'prop-types';

// import { LoginPage } from 'frontend-common-components';
// import LoginFormContainer from 'ui/login/LoginFormContainer';
import InternalPage from 'ui/internal-page/InternalPage';

const App = ({ route }) => {
  switch (route) {
    case 'home': return (
      <InternalPage />
    );
    case 'dashboard': return (
      <h1>DASHBOARD</h1>
    );
    default: return <h1>NOT FOUND</h1>;
  }
};

App.propTypes = {
  route: PropTypes.string.isRequired,
};

export default App;
