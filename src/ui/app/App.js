import React from 'react';
import PropTypes from 'prop-types';
import { gotoRoute } from '@entando/router';
import { LoginPage, NotFoundPage } from 'frontend-common-components';

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
  ROUTE_PAGE_DETAIL,
  ROUTE_DATA_MODEL_LIST,
  ROUTE_PAGE_SETTINGS,
  ROUTE_PAGE_CONFIG,
  ROUTE_PAGE_MODEL_LIST,
  ROUTE_PAGE_MODEL_ADD,
  ROUTE_PAGE_MODEL_EDIT,
  ROUTE_PAGE_MODEL_DETAIL,
  ROUTE_DATA_MODEL_ADD,
  ROUTE_DATA_TYPE_LIST,
  ROUTE_DATA_TYPE_ADD,
  ROUTE_DATA_TYPE_EDIT,
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
  ROUTE_CATEGORY_LIST,
  ROUTE_CATEGORY_ADD,
  ROUTE_CATEGORY_EDIT,
  ROUTE_CATEGORY_DETAIL,
  ROUTE_LABELS_ADD,
  ROUTE_ROLE_LIST,
  ROUTE_ROLE_ADD,
  ROUTE_ROLE_EDIT,
  ROUTE_ROLE_DETAIL,
  ROUTE_RELOAD_CONFIG,
  ROUTE_RELOAD_CONFIRM,
  ROUTE_DATABASE_LIST,
  ROUTE_DATABASE_ADD,
  ROUTE_PLUGIN_CONFIG_PAGE,
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
import PagesDetailPageContainer from 'ui/pages/detail/PagesDetailPageContainer';
import PageSettingsPage from 'ui/pages/settings/PageSettings';
import PageConfigPageContainer from 'ui/pages/config/PageConfigPageContainer';
import PageModelListPage from 'ui/page-models/list/PageModelListPage';
import PageModelAddPage from 'ui/page-models/add/PageModelAddPage';
import PageModelEditPage from 'ui/page-models/edit/PageModelEditPage';
import PageModelDetailPageContainer from 'ui/page-models/detail/PageModelDetailPageContainer';
import AddDataModelPage from 'ui/data-models/add/AddDataModelPage';
import ListDataTypePage from 'ui/data-types/list/ListDataTypePage';
import AddDataTypesPage from 'ui/data-types/add/AddDataTypesPage';
import EditDataTypesPage from 'ui/data-types/edit/EditDataTypesPage';
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
import ListCategoryPage from 'ui/categories/list/ListCategoryPage';
import AddCategoryPage from 'ui/categories/add/AddCategoryPage';
import EditCategoryPage from 'ui/categories/edit/EditCategoryPage';
import DetailCategoryPage from 'ui/categories/detail/DetailCategoryPage';
import ListRolePage from 'ui/roles/list/ListRolePage';
import AddRolePage from 'ui/roles/add/AddRolePage';
import EditRolePage from 'ui/roles/edit/EditRolePage';
import DetailRolePage from 'ui/roles/detail/DetailRolePage';
import ReloadConfigPage from 'ui/reload-configuration/ReloadConfigPage';
import ReloadConfirmPage from 'ui/reload-configuration/ReloadConfirmPage';
import PluginConfigPageContainer from 'ui/integrations/PluginConfigPageContainer';
import ListDatabasePage from 'ui/database/list/ListDatabasePage';
import AddDatabasePageContainer from 'ui/database/add/AddDatabasePageContainer';

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
    case ROUTE_PAGE_DETAIL: return <PagesDetailPageContainer />;
    case ROUTE_PAGE_SETTINGS: return <PageSettingsPage />;
    case ROUTE_PAGE_CONFIG: return <PageConfigPageContainer />;
    case ROUTE_PAGE_MODEL_LIST: return <PageModelListPage />;
    case ROUTE_PAGE_MODEL_ADD: return <PageModelAddPage />;
    case ROUTE_PAGE_MODEL_EDIT: return <PageModelEditPage />;
    case ROUTE_PAGE_MODEL_DETAIL: return <PageModelDetailPageContainer />;
    case ROUTE_DATA_MODEL_ADD: return <AddDataModelPage />;
    case ROUTE_DATA_TYPE_LIST: return <ListDataTypePage />;
    case ROUTE_DATA_TYPE_ADD: return <AddDataTypesPage />;
    case ROUTE_DATA_TYPE_EDIT: return <EditDataTypesPage />;
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
    case ROUTE_CATEGORY_LIST: return <ListCategoryPage />;
    case ROUTE_CATEGORY_ADD: return <AddCategoryPage />;
    case ROUTE_CATEGORY_EDIT: return <EditCategoryPage />;
    case ROUTE_CATEGORY_DETAIL: return <DetailCategoryPage />;
    case ROUTE_LABELS_ADD: return <AddLabelsPage />;
    case ROUTE_ROLE_LIST: return <ListRolePage />;
    case ROUTE_ROLE_ADD: return <AddRolePage />;
    case ROUTE_ROLE_EDIT: return <EditRolePage />;
    case ROUTE_ROLE_DETAIL: return <DetailRolePage />;
    case ROUTE_RELOAD_CONFIG: return <ReloadConfigPage />;
    case ROUTE_RELOAD_CONFIRM: return <ReloadConfirmPage />;
    case ROUTE_PLUGIN_CONFIG_PAGE: return <PluginConfigPageContainer />;
    case ROUTE_DATABASE_LIST: return <ListDatabasePage />;
    case ROUTE_DATABASE_ADD: return <AddDatabasePageContainer />;
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
