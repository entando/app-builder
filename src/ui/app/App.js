import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { gotoRoute } from '@entando/router';
import { LoginPage, NotFoundPage } from '@entando/pages';

import {
  ROUTE_HOME,
  ROUTE_DASHBOARD,
  ROUTE_CMS,
  ROUTE_PAGE_TREE,
  ROUTE_WIDGET_LIST,
  ROUTE_WIDGET_ADD,
  ROUTE_WIDGET_EDIT,
  ROUTE_WIDGET_CONFIG,
  ROUTE_WIDGET_DETAIL,
  ROUTE_FRAGMENT_LIST,
  ROUTE_FRAGMENT_ADD,
  ROUTE_FRAGMENT_EDIT,
  ROUTE_FRAGMENT_DETAIL,
  ROUTE_PAGE_ADD,
  ROUTE_PAGE_EDIT,
  ROUTE_PAGE_DETAIL,
  ROUTE_PAGE_SETTINGS,
  ROUTE_PAGE_CONFIG,
  ROUTE_PAGE_MODEL_LIST,
  ROUTE_PAGE_MODEL_ADD,
  ROUTE_PAGE_MODEL_EDIT,
  ROUTE_PAGE_MODEL_DETAIL,
  ROUTE_USER_LIST,
  ROUTE_USER_AUTHORITY,
  ROUTE_USER_ADD,
  ROUTE_USER_EDIT,
  ROUTE_PAGE_CLONE,
  ROUTE_USER_DETAIL,
  ROUTE_USER_RESTRICTIONS,
  ROUTE_USER_MY_PROFILE,
  ROUTE_USER_PROFILE,
  ROUTE_GROUP_LIST,
  ROUTE_GROUP_ADD,
  ROUTE_GROUP_EDIT,
  ROUTE_LABELS_AND_LANGUAGES,
  ROUTE_LABEL_ADD,
  ROUTE_LABEL_EDIT,
  ROUTE_GROUP_DETAIL,
  ROUTE_CATEGORY_LIST,
  ROUTE_CATEGORY_ADD,
  ROUTE_CATEGORY_EDIT,
  ROUTE_CATEGORY_DETAIL,
  ROUTE_ROLE_LIST,
  ROUTE_ROLE_ADD,
  ROUTE_ROLE_EDIT,
  ROUTE_ROLE_DETAIL,
  ROUTE_RELOAD_CONFIG,
  ROUTE_RELOAD_CONFIRM,
  ROUTE_DATA_MODEL_LIST,
  ROUTE_DATA_MODEL_ADD,
  ROUTE_DATA_MODEL_EDIT,
  ROUTE_DATA_TYPE_LIST,
  ROUTE_DATA_TYPE_ADD,
  ROUTE_DATA_TYPE_EDIT,
  ROUTE_DATA_TYPE_ATTRIBUTE_ADD,
  ROUTE_DATA_TYPE_ATTRIBUTE_EDIT,
  ROUTE_ATTRIBUTE_MONOLIST_ADD,
  ROUTE_PROFILE_TYPE_LIST,
  ROUTE_PROFILE_TYPE_ADD,
  ROUTE_PROFILE_TYPE_EDIT,
  ROUTE_PROFILE_TYPE_ATTRIBUTE_ADD,
  ROUTE_PROFILE_TYPE_ATTRIBUTE_EDIT,
  ROUTE_ATTRIBUTE_MONOLIST_PROFILE_ADD,
  ROUTE_DATABASE_LIST,
  ROUTE_DATABASE_ADD,
  ROUTE_DATABASE_REPORT,
  ROUTE_DATABASE_DUMP_TABLE,
  ROUTE_FILE_BROWSER,
  ROUTE_FILE_BROWSER_UPLOAD,
  ROUTE_FILE_BROWSER_CREATE_FOLDER,
  ROUTE_FILE_BROWSER_CREATE_TEXT_FILE,
  ROUTE_FILE_BROWSER_EDIT_TEXT_FILE,
  ROUTE_PLUGIN_CONFIG_PAGE,
  ROUTE_DE_COMPONENT_LIST,
  ROUTE_DE_CONFIG_LIST,
  ROUTE_DE_CONFIG_EDIT,
  ROUTE_DE_CONFIG_ADD,
} from 'app-init/router';

import ToastsContainer from 'ui/app/ToastsContainer';
import LoginFormContainer from 'ui/login/LoginFormContainer';
import DashboardPage from 'ui/dashboard/DashboardPage';
import PageTreePageContainer from 'ui/pages/list/PageTreePageContainer';
import ListWidgetPageContainer from 'ui/widgets/list/ListWidgetPageContainer';
import AddWidgetPage from 'ui/widgets/add/AddWidgetPage';
import EditWidgetPageContainer from 'ui/widgets/edit/EditWidgetPageContainer';
import WidgetConfigPageContainer from 'ui/widgets/config/WidgetConfigPageContainer';
import DetailWidgetPageContainer from 'ui/widgets/detail/DetailWidgetPageContainer';
import ListFragmentPage from 'ui/fragments/list/ListFragmentPage';
import AddFragmentPage from 'ui/fragments/add/AddFragmentPage';
import EditFragmentPageContainer from 'ui/fragments/edit/EditFragmentPageContainer';
import DetailFragmentPageContainer from 'ui/fragments/detail/DetailFragmentPageContainer';
import PagesAddPageContainer from 'ui/pages/add/PagesAddPageContainer';
import PagesEditPage from 'ui/pages/edit/PagesEditPage';
import PagesClonePage from 'ui/pages/clone/PagesClonePage';
import PagesDetailPageContainer from 'ui/pages/detail/PagesDetailPageContainer';
import PageSettingsPage from 'ui/pages/settings/PageSettings';
import PageConfigPageContainer from 'ui/pages/config/PageConfigPageContainer';
import PageModelListPage from 'ui/page-models/list/PageModelListPage';
import PageModelAddPage from 'ui/page-models/add/PageModelAddPage';
import PageModelEditPage from 'ui/page-models/edit/PageModelEditPage';
import PageModelDetailPageContainer from 'ui/page-models/detail/PageModelDetailPageContainer';
import AddDataModelPage from 'ui/data-models/add/AddDataModelPage';
import EditDataModelPage from 'ui/data-models/edit/EditDataModelPage';
import DataModelListPage from 'ui/data-models/list/DataModelListPage';
import UserListPage from 'ui/users/list/UserListPage';
import UserAuthorityPageContainer from 'ui/users/authority/UserAuthorityPageContainer';
import AddUserPage from 'ui/users/add/AddUserPage';
import EditUserPage from 'ui/users/edit/EditUserPage';
import EditUserProfilePage from 'ui/user-profile/edit/EditUserProfilePage';
import DetailUserPage from 'ui/users/detail/DetailUserPage';
import UserRestrictionsPage from 'ui/users/restrictions/UserRestrictionsPage';
import MyProfilePage from 'ui/users/my-profile/MyProfilePage';
import ListGroupPage from 'ui/groups/list/ListGroupPage';
import AddGroupPage from 'ui/groups/add/AddGroupPage';
import EditGroupPage from 'ui/groups/edit/EditGroupPage';
import AddLabelPage from 'ui/labels/add/AddLabelPage';
import EditLabelPage from 'ui/labels/edit/EditLabelPage';
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
import ListDataTypePage from 'ui/data-types/list/ListDataTypePage';
import AddDataTypesPage from 'ui/data-types/add/AddDataTypesPage';
import EditDataTypesPage from 'ui/data-types/edit/EditDataTypesPage';
import AddDataTypeAttributePage from 'ui/data-types/attributes/AddDataTypeAttributePage';
import EditDataTypeAttributePage from 'ui/data-types/attributes/EditDataTypeAttributePage';
import MonolistPageContainer from 'ui/data-types/attributes/monolist/MonolistPageContainer';
// digital exchange
import ComponentListPage from 'ui/digital-exchange/components/list/ComponentListPage';
import ComponentListPageDisabled from 'ui/digital-exchange/components/list/ComponentListPageDisabled';
import SettingsListPage from 'ui/digital-exchange/settings/list/SettingsListPage';
import SettingsEditPage from 'ui/digital-exchange/settings/edit/SettingsEditPage';
import SettingsAddPage from 'ui/digital-exchange/settings/add/SettingsAddPage';
// attribute type
import ListProfileTypePage from 'ui/profile-types/list/ListProfileTypePage';
import AddProfileTypesPage from 'ui/profile-types/add/AddProfileTypesPage';
import EditProfileTypesPage from 'ui/profile-types/edit/EditProfileTypesPage';
import AddProfileTypeAttributePage from 'ui/profile-types/attributes/AddProfileTypeAttributePage';
import EditProfileTypeAttributePage from 'ui/profile-types/attributes/EditProfileTypeAttributePage';
import MonolistProfilePageContainer from 'ui/profile-types/attributes/monolist/MonolistProfilePageContainer';
import PluginConfigPageContainer from 'ui/integrations/PluginConfigPageContainer';
import ListDatabasePage from 'ui/database/list/ListDatabasePage';
import AddDatabasePageContainer from 'ui/database/add/AddDatabasePageContainer';
import ReportDatabasePageContainer from 'ui/database/report/ReportDatabasePageContainer';
import DatabaseDumpTablePageContainer from 'ui/database/dump/DatabaseDumpTablePageContainer';
import FileBrowserPage from 'ui/file-browser/list/ListFilesPage';
import UploadFileBrowserPage from 'ui/file-browser/upload/UploadFileBrowserPage';
import CreateFolderPage from 'ui/file-browser/add/CreateFolderPage';
import CreateTextFilePage from 'ui/file-browser/add/CreateTextFilePage';
import EditTextFilePage from 'ui/file-browser/edit/EditTextFilePage';

const getRouteComponent = (route) => {
  switch (route) {
    case ROUTE_HOME: return (
      <LoginPage>
        <LoginFormContainer />
      </LoginPage>
    );
    case ROUTE_DASHBOARD: return <DashboardPage />;
    case ROUTE_CMS: return <h1> CMS </h1>;
    case ROUTE_PAGE_TREE: return <PageTreePageContainer />;
    case ROUTE_WIDGET_LIST: return <ListWidgetPageContainer />;
    case ROUTE_WIDGET_ADD: return <AddWidgetPage />;
    case ROUTE_WIDGET_EDIT: return <EditWidgetPageContainer />;
    case ROUTE_WIDGET_CONFIG: return <WidgetConfigPageContainer />;
    case ROUTE_WIDGET_DETAIL: return <DetailWidgetPageContainer />;
    case ROUTE_FRAGMENT_LIST: return <ListFragmentPage />;
    case ROUTE_FRAGMENT_ADD: return <AddFragmentPage />;
    case ROUTE_FRAGMENT_EDIT: return <EditFragmentPageContainer />;
    case ROUTE_FRAGMENT_DETAIL: return <DetailFragmentPageContainer />;
    case ROUTE_PAGE_ADD: return <PagesAddPageContainer />;
    case ROUTE_PAGE_EDIT: return <PagesEditPage />;
    case ROUTE_PAGE_CLONE: return <PagesClonePage />;
    case ROUTE_PAGE_DETAIL: return <PagesDetailPageContainer />;
    case ROUTE_PAGE_SETTINGS: return <PageSettingsPage />;
    case ROUTE_PAGE_CONFIG: return <PageConfigPageContainer />;
    case ROUTE_PAGE_MODEL_LIST: return <PageModelListPage />;
    case ROUTE_PAGE_MODEL_ADD: return <PageModelAddPage />;
    case ROUTE_PAGE_MODEL_EDIT: return <PageModelEditPage />;
    case ROUTE_PAGE_MODEL_DETAIL: return <PageModelDetailPageContainer />;
    case ROUTE_USER_RESTRICTIONS: return <UserRestrictionsPage />;
    case ROUTE_DATA_MODEL_ADD: return <AddDataModelPage />;
    case ROUTE_DATA_MODEL_EDIT: return <EditDataModelPage />;
    case ROUTE_DATA_MODEL_LIST: return <DataModelListPage />;
    case ROUTE_USER_LIST: return <UserListPage />;
    case ROUTE_USER_AUTHORITY: return <UserAuthorityPageContainer />;
    case ROUTE_USER_ADD: return <AddUserPage />;
    case ROUTE_USER_EDIT: return <EditUserPage />;
    case ROUTE_USER_DETAIL: return <DetailUserPage />;
    case ROUTE_USER_MY_PROFILE: return <MyProfilePage />;
    case ROUTE_USER_PROFILE: return <EditUserProfilePage />;
    case ROUTE_GROUP_LIST: return <ListGroupPage />;
    case ROUTE_GROUP_ADD: return <AddGroupPage />;
    case ROUTE_GROUP_EDIT: return <EditGroupPage />;
    case ROUTE_LABELS_AND_LANGUAGES: return <LabelsAndLanguagesPageContainer />;
    case ROUTE_LABEL_ADD: return <AddLabelPage />;
    case ROUTE_LABEL_EDIT: return <EditLabelPage />;
    case ROUTE_GROUP_DETAIL: return <DetailGroupPage />;
    case ROUTE_CATEGORY_LIST: return <ListCategoryPage />;
    case ROUTE_CATEGORY_ADD: return <AddCategoryPage />;
    case ROUTE_CATEGORY_EDIT: return <EditCategoryPage />;
    case ROUTE_CATEGORY_DETAIL: return <DetailCategoryPage />;
    case ROUTE_ROLE_LIST: return <ListRolePage />;
    case ROUTE_ROLE_ADD: return <AddRolePage />;
    case ROUTE_ROLE_EDIT: return <EditRolePage />;
    case ROUTE_ROLE_DETAIL: return <DetailRolePage />;
    case ROUTE_RELOAD_CONFIG: return <ReloadConfigPage />;
    case ROUTE_RELOAD_CONFIRM: return <ReloadConfirmPage />;
    case ROUTE_PLUGIN_CONFIG_PAGE: return <PluginConfigPageContainer />;
    case ROUTE_DATA_TYPE_LIST: return <ListDataTypePage />;
    case ROUTE_DATA_TYPE_ADD: return <AddDataTypesPage />;
    case ROUTE_DATA_TYPE_EDIT: return <EditDataTypesPage />;
    case ROUTE_DATA_TYPE_ATTRIBUTE_ADD: return <AddDataTypeAttributePage />;
    case ROUTE_DATA_TYPE_ATTRIBUTE_EDIT: return <EditDataTypeAttributePage />;
    case ROUTE_ATTRIBUTE_MONOLIST_ADD: return <MonolistPageContainer />;
    case ROUTE_PROFILE_TYPE_LIST: return <ListProfileTypePage />;
    case ROUTE_PROFILE_TYPE_ADD: return <AddProfileTypesPage />;
    case ROUTE_PROFILE_TYPE_EDIT: return <EditProfileTypesPage />;
    case ROUTE_PROFILE_TYPE_ATTRIBUTE_ADD: return <AddProfileTypeAttributePage />;
    case ROUTE_PROFILE_TYPE_ATTRIBUTE_EDIT: return <EditProfileTypeAttributePage />;
    case ROUTE_ATTRIBUTE_MONOLIST_PROFILE_ADD: return <MonolistProfilePageContainer />;
    case ROUTE_DATABASE_LIST: return <ListDatabasePage />;
    case ROUTE_DATABASE_ADD: return <AddDatabasePageContainer />;
    case ROUTE_DATABASE_REPORT: return <ReportDatabasePageContainer />;
    case ROUTE_DATABASE_DUMP_TABLE: return <DatabaseDumpTablePageContainer />;
    case ROUTE_FILE_BROWSER: return <FileBrowserPage />;
    case ROUTE_FILE_BROWSER_UPLOAD: return <UploadFileBrowserPage />;
    case ROUTE_FILE_BROWSER_CREATE_FOLDER: return <CreateFolderPage />;
    case ROUTE_FILE_BROWSER_CREATE_TEXT_FILE: return <CreateTextFilePage />;
    case ROUTE_FILE_BROWSER_EDIT_TEXT_FILE: return <EditTextFilePage />;
    case ROUTE_DE_COMPONENT_LIST: return (process.env.DIGITAL_EXCHANGE_UI_ENABLED) ?
      <ComponentListPage /> : <ComponentListPageDisabled />;
    case ROUTE_DE_CONFIG_LIST: return (process.env.DIGITAL_EXCHANGE_UI_ENABLED) ?
      <SettingsListPage /> : <ComponentListPageDisabled />;
    case ROUTE_DE_CONFIG_EDIT: return (process.env.DIGITAL_EXCHANGE_UI_ENABLED) ?
      <SettingsEditPage /> : <ComponentListPageDisabled />;
    case ROUTE_DE_CONFIG_ADD: return (process.env.DIGITAL_EXCHANGE_UI_ENABLED) ?
      <SettingsAddPage /> : <ComponentListPageDisabled />;
    default: return <NotFoundPage />;
  }
};

const App = ({ route, username }) => {
  if (username === null && route !== ROUTE_HOME && route) {
    gotoRoute(ROUTE_HOME);
    return <h1>401</h1>;
  }

  return (
    <Fragment>
      <ToastsContainer />
      {getRouteComponent(route)}
    </Fragment>
  );
};

App.propTypes = {
  route: PropTypes.string.isRequired,
  username: PropTypes.string,
};

App.defaultProps = {
  username: null,
};

export default App;
