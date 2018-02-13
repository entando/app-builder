import React from 'react';
import PropTypes from 'prop-types';

import { LoginPage } from 'frontend-common-components';
import LoginFormContainer from 'ui/login/LoginFormContainer';
import DashboardPage from 'ui/dashboard-page/DashboardPage';

const App = ({ route }) => {
  switch (route) {
    case 'home': return (
      <LoginPage>
        <LoginFormContainer />
      </LoginPage>
    );
    case 'dashboard': return (
      <DashboardPage />
    );
    default: return <h1>NOT FOUND</h1>;
  }
};

App.propTypes = {
  route: PropTypes.string.isRequired,
};

export default App;
