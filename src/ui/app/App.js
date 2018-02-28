import React from 'react';
import PropTypes from 'prop-types';
import {
  ROUTE_HOME,
  ROUTE_DASHBOARD,
  ROUTE_PAGE_TREE,
  ROUTE_WIDGET_LIST,
  ROUTE_WIDGET_ADD,
  ROUTE_WIDGET_EDIT,
  ROUTE_FRAGMENT_ADD,
  ROUTE_FRAGMENT_EDIT,
} from 'app-init/router';

import { LoginPage, NotFoundPage } from 'frontend-common-components';
import LoginFormContainer from 'ui/login/LoginFormContainer';
import DashboardPage from 'ui/dashboard/DashboardPage';
import PageTreePageContainer from 'ui/page-tree-page/PageTreePageContainer';
import WidgetListPageContainer from 'ui/widget-list-page/WidgetListPageContainer';
import AddWidgetPage from 'ui/widgets/add/AddWidgetPage';
import EditWidgetPageContainer from 'ui/widgets/edit/EditWidgetPageContainer';
import AddFragmentPage from 'ui/fragments/add/AddFragmentPage';
import EditFragmentPageContainer from 'ui/fragments/edit/EditFragmentPageContainer';

const App = ({ route }) => {
  switch (route) {
    case ROUTE_HOME: return (
      <LoginPage>
        <LoginFormContainer />
      </LoginPage>
    );
    case ROUTE_DASHBOARD: return <DashboardPage />;
    case ROUTE_PAGE_TREE: return <PageTreePageContainer />;
    case ROUTE_WIDGET_LIST: return <WidgetListPageContainer />;
    case ROUTE_WIDGET_ADD: return <AddWidgetPage />;
    case ROUTE_WIDGET_EDIT: return <EditWidgetPageContainer />;
    case ROUTE_FRAGMENT_ADD: return <AddFragmentPage />;
    case ROUTE_FRAGMENT_EDIT: return <EditFragmentPageContainer />;
    default: return <NotFoundPage />;
  }
};

App.propTypes = {
  route: PropTypes.string.isRequired,
};

export default App;
