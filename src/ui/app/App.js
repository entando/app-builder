import React from 'react';
import PropTypes from 'prop-types';
import { LoginPage, NotFoundPage } from 'frontend-common-components';

import {
  ROUTE_HOME,
  ROUTE_DASHBOARD,
  ROUTE_PAGE_TREE,
  ROUTE_WIDGET_LIST,
  ROUTE_WIDGET_ADD,
  ROUTE_WIDGET_EDIT,
  ROUTE_FRAGMENT_ADD,
  ROUTE_FRAGMENT_EDIT,
  ROUTE_FRAGMENT_DETAIL,
  ROUTE_PAGE_ADD,
} from 'app-init/router';

import LoginFormContainer from 'ui/login/LoginFormContainer';
import DashboardPage from 'ui/dashboard/DashboardPage';
import PageTreePageContainer from 'ui/pages/list/PageTreePageContainer';
import ListWidgetPageContainer from 'ui/widgets/list/ListWidgetPageContainer';
import AddWidgetPage from 'ui/widgets/add/AddWidgetPage';
import EditWidgetPageContainer from 'ui/widgets/edit/EditWidgetPageContainer';
import AddFragmentPage from 'ui/fragments/add/AddFragmentPage';
import EditFragmentPageContainer from 'ui/fragments/edit/EditFragmentPageContainer';
import DetailFragmentPageContainer from 'ui/fragments/detail/DetailFragmentPageContainer';
import PagesAddPageContainer from 'ui/pages/add/PagesAddPageContainer';

const App = ({ route }) => {
  switch (route) {
    case ROUTE_HOME: return (
      <LoginPage>
        <LoginFormContainer />
      </LoginPage>
    );
    case ROUTE_DASHBOARD: return <DashboardPage />;
    case ROUTE_PAGE_TREE: return <PageTreePageContainer />;
    case ROUTE_WIDGET_LIST: return <ListWidgetPageContainer />;
    case ROUTE_WIDGET_ADD: return <AddWidgetPage />;
    case ROUTE_WIDGET_EDIT: return <EditWidgetPageContainer />;
    case ROUTE_FRAGMENT_ADD: return <AddFragmentPage />;
    case ROUTE_FRAGMENT_EDIT: return <EditFragmentPageContainer />;
    case ROUTE_FRAGMENT_DETAIL: return <DetailFragmentPageContainer />;
    case ROUTE_PAGE_ADD: return <PagesAddPageContainer />;
    default: return <NotFoundPage />;
  }
};

App.propTypes = {
  route: PropTypes.string.isRequired,
};

export default App;
