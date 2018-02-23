import React from 'react';
import PropTypes from 'prop-types';

import { LoginPage } from 'frontend-common-components';
import LoginFormContainer from 'ui/login/LoginFormContainer';
import DashboardPage from 'ui/dashboard-page/DashboardPage';
import WidgetPage from 'ui/app-pages/WidgetPage';
import WidgetEditPageContainer from 'ui/widgets/WidgetEditPageContainer';

const App = ({ route }) => {
  switch (route) {
    case 'home': return (
      <LoginPage>
        <LoginFormContainer />
      </LoginPage>
    );
    case 'dashboard': return <DashboardPage />;
    case 'widgetForm': return <WidgetPage />;
    case 'widgetEdit': return <WidgetEditPageContainer />;
    default: return <h1>NOT FOUND</h1>;
  }
};

App.propTypes = {
  route: PropTypes.string.isRequired,
};

export default App;
