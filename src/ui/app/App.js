import React from 'react';
import PropTypes from 'prop-types';
import {
  ROUTE_HOME, ROUTE_DASHBOARD, ROUTE_PAGE_TREE, ROUTE_WIDGET_FORM, ROUTE_FRAGMENT,
} from 'app-init/router';

import { LoginPage, NotFoundPage } from 'frontend-common-components';
import LoginFormContainer from 'ui/login/LoginFormContainer';
import DashboardPage from 'ui/dashboard-page/DashboardPage';
import PageTreePageContainer from 'ui/page-tree-page/PageTreePageContainer';
import WidgetPage from 'ui/app-pages/WidgetPage';
import FragmentPage from 'ui/app-pages/FragmentPage';

const App = ({ route }) => {
  switch (route) {
    case ROUTE_HOME: return (
      <LoginPage>
        <LoginFormContainer />
      </LoginPage>
    );
    case ROUTE_DASHBOARD: return <DashboardPage />;
    case ROUTE_PAGE_TREE: return <PageTreePageContainer />;
    case ROUTE_WIDGET_FORM: return <WidgetPage />;
    case ROUTE_FRAGMENT: return <FragmentPage />;
    default: return <NotFoundPage />;
  }
};

App.propTypes = {
  route: PropTypes.string.isRequired,
};

export default App;
