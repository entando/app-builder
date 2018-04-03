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
  ROUTE_WIDGET_CONFIG,
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
  ROUTE_USER_AUTHORITY,
  ROUTE_USER_ADD,
  ROUTE_USER_EDIT,
  ROUTE_USER_DETAIL,
  ROUTE_GROUP_LIST,
  ROUTE_GROUP_ADD,
  ROUTE_GROUP_EDIT,
  ROUTE_LABELS_AND_LANGUAGES,
  ROUTE_GROUP_DETAIL,
  ROUTE_LABELS_ADD,
} from 'app-init/router';

import LoginFormContainer from 'ui/login/LoginFormContainer';
import DashboardPage from 'ui/dashboard/DashboardPage';
import PageTreePageContainer from 'ui/pages/list/PageTreePageContainer';
import ListWidgetPageContainer from 'ui/widgets/list/ListWidgetPageContainer';
import AddWidgetPage from 'ui/widgets/add/AddWidgetPage';
import EditWidgetPageContainer from 'ui/widgets/edit/EditWidgetPageContainer';
import WidgetConfigPageContainer from 'ui/widgets/config/WidgetConfigPageContainer';
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
import UserAuthorityPageContainer from 'ui/users/authority/UserAuthorityPageContainer';
import AddUserPage from 'ui/users/add/AddUserPage';
import EditUserPage from 'ui/users/edit/EditUserPage';
import DetailUserPage from 'ui/users/detail/DetailUserPage';
import ListGroupPage from 'ui/groups/list/ListGroupPage';
import AddGroupPage from 'ui/groups/add/AddGroupPage';
import EditGroupPage from 'ui/groups/edit/EditGroupPage';
import AddLabelsPage from 'ui/labels/add/AddLabelsPage';
import LabelsAndLanguagesPageContainer from 'ui/labels/list/LabelsAndLanguagesPageContainer';
import DetailGroupPage from 'ui/groups/detail/DetailGroupPage';

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
    case ROUTE_WIDGET_CONFIG: return <WidgetConfigPageContainer />;
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
    case ROUTE_USER_AUTHORITY: return <UserAuthorityPageContainer />;
    case ROUTE_USER_ADD: return <AddUserPage />;
    case ROUTE_USER_EDIT: return <EditUserPage />;
    case ROUTE_USER_DETAIL: return <DetailUserPage />;
    case ROUTE_GROUP_LIST: return <ListGroupPage />;
    case ROUTE_GROUP_ADD: return <AddGroupPage />;
    case ROUTE_GROUP_EDIT: return <EditGroupPage />;
    case ROUTE_LABELS_AND_LANGUAGES: return <LabelsAndLanguagesPageContainer />;
    case ROUTE_GROUP_DETAIL: return <DetailGroupPage />;
    case ROUTE_LABELS_ADD: return <AddLabelsPage />;
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
