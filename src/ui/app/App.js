import React from 'react';
import PropTypes from 'prop-types';

import { LoginPage } from 'frontend-common-components';
import LoginFormContainer from 'ui/login/LoginFormContainer';
import DashboardPage from 'ui/dashboard-page/DashboardPage';
import WidgetListPageContainer from 'ui/widget-list-page/WidgetListPageContainer';
import WidgetPage from 'ui/app-pages/WidgetPage';

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
    case 'widgetList': return (
      <WidgetListPageContainer />
    );
    case 'widgetForm': return (
      <WidgetPage />
    );
    default: return <h1>NOT FOUND</h1>;
  }
};

App.propTypes = {
  route: PropTypes.string.isRequired,
};

export default App;
