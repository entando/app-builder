import React from 'react';
import PropTypes from 'prop-types';

import {
  ROUTE_HOME, ROUTE_DASHBOARD, ROUTE_PAGE_TREE,
} from 'app-init/router';

import { LoginPage } from 'frontend-common-components';
import LoginFormContainer from 'ui/login/LoginFormContainer';
import DashboardPage from 'ui/dashboard-page/DashboardPage';
import PageTreePageContainer from 'ui/page-tree-page/PageTreePageContainer';

const App = ({ route }) => {
  switch (route) {
    case ROUTE_HOME: return (
      <LoginPage>
        <LoginFormContainer />
      </LoginPage>
    );
    case ROUTE_DASHBOARD: return <DashboardPage />;
    case ROUTE_PAGE_TREE: return <PageTreePageContainer />;
    default: return <h1>NOT FOUND</h1>;
  }
};

App.propTypes = {
  route: PropTypes.string.isRequired,
};

export default App;
