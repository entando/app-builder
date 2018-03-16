import React from 'react';
import PropTypes from 'prop-types';
import { LoginPage, NotFoundPage, gotoRoute } from 'frontend-common-components';

import {
  ROUTE_HOME,
  ROUTE_DASHBOARD,
  ROUTE_PAGE_TREE,
  ROUTE_WIDGET_LIST,
  ROUTE_WIDGET_ADD,
  ROUTE_WIDGET_EDIT,
  ROUTE_FRAGMENT_LIST,
  ROUTE_FRAGMENT_ADD,
  ROUTE_FRAGMENT_EDIT,
  ROUTE_FRAGMENT_DETAIL,
  ROUTE_PAGE_ADD,
  ROUTE_PAGE_EDIT,
  ROUTE_DATA_MODEL_LIST,
  ROUTE_PAGE_SETTINGS,
  ROUTE_PAGE_CONFIG,
  ROUTE_DATA_MODEL_ADD,
  ROUTE_DATA_TYPE_LIST,
  ROUTE_USER_LIST,

} from 'app-init/router';

import LoginFormContainer from 'ui/login/LoginFormContainer';
import DashboardPage from 'ui/dashboard/DashboardPage';
import PageTreePageContainer from 'ui/pages/list/PageTreePageContainer';
import ListWidgetPageContainer from 'ui/widgets/list/ListWidgetPageContainer';
import AddWidgetPage from 'ui/widgets/add/AddWidgetPage';
import EditWidgetPageContainer from 'ui/widgets/edit/EditWidgetPageContainer';
import ListFragmentPage from 'ui/fragments/list/ListFragmentPage';
import AddFragmentPage from 'ui/fragments/add/AddFragmentPage';
import EditFragmentPageContainer from 'ui/fragments/edit/EditFragmentPageContainer';
import DetailFragmentPageContainer from 'ui/fragments/detail/DetailFragmentPageContainer';
import PagesAddPageContainer from 'ui/pages/add/PagesAddPageContainer';
import PagesEditPage from 'ui/pages/edit/PagesEditPage';
import PageSettingsPage from 'ui/pages/settings/PageSettings';
import PageConfigPageContainer from 'ui/pages/config/PageConfigPageContainer';
import AddDataModelPage from 'ui/data-models/add/AddDataModelPage';
import ListDataTypePage from 'ui/data-types/list/ListDataTypePage';
import DataModelListPage from 'ui/data-models/list/DataModelListPage';
import UserListPage from 'ui/users/list/UserListPage';

const App = ({ route, username }) => {
  if (username === null && route !== ROUTE_HOME && route) {
    gotoRoute(ROUTE_HOME);
    return <h1>401</h1>;
  }

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
    case ROUTE_FRAGMENT_LIST: return <ListFragmentPage />;
    case ROUTE_FRAGMENT_ADD: return <AddFragmentPage />;
    case ROUTE_FRAGMENT_EDIT: return <EditFragmentPageContainer />;
    case ROUTE_FRAGMENT_DETAIL: return <DetailFragmentPageContainer />;
    case ROUTE_PAGE_ADD: return <PagesAddPageContainer />;
    case ROUTE_PAGE_EDIT: return <PagesEditPage />;
    case ROUTE_PAGE_SETTINGS: return <PageSettingsPage />;
    case ROUTE_PAGE_CONFIG: return <PageConfigPageContainer />;
    case ROUTE_DATA_MODEL_ADD: return <AddDataModelPage />;
    case ROUTE_DATA_TYPE_LIST: return <ListDataTypePage />;
    case ROUTE_DATA_MODEL_LIST: return <DataModelListPage />;
    case ROUTE_USER_LIST: return <UserListPage />;
    default: return <NotFoundPage />;
  }
};

App.propTypes = {
  route: PropTypes.string.isRequired,
  username: PropTypes.string,
};

App.defaultProps = {
  username: null,
};

export default App;
