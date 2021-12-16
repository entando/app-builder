import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DDProvider } from '@entando/ddtable';
import {
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import withAuth from 'auth/withAuth';
import { LoginPage } from '@entando/pages';

import {
  ROUTE_HOME,
  ROUTE_DASHBOARD,
  ROUTE_PAGE_TREE,
  ROUTE_WIDGET_LIST,
  ROUTE_WIDGET_ADD,
  ROUTE_WIDGET_EDIT,
  ROUTE_WIDGET_NEW_USERWIDGET,
  ROUTE_WIDGET_CONFIG,
  ROUTE_WIDGET_DETAIL,
  ROUTE_FRAGMENT_LIST,
  ROUTE_FRAGMENT_ADD,
  ROUTE_FRAGMENT_EDIT,
  ROUTE_FRAGMENT_CLONE,
  ROUTE_FRAGMENT_DETAIL,
  ROUTE_PAGE_ADD,
  ROUTE_PAGE_EDIT,
  ROUTE_PAGE_DETAIL,
  ROUTE_PAGE_SETTINGS,
  ROUTE_PAGE_CONFIG,
  ROUTE_PAGE_TEMPLATE_LIST,
  ROUTE_PAGE_TEMPLATE_ADD,
  ROUTE_PAGE_TEMPLATE_EDIT,
  ROUTE_PAGE_TEMPLATE_CLONE,
  ROUTE_PAGE_TEMPLATE_DETAIL,
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
  ROUTE_ECR_COMPONENT_LIST,
  ROUTE_ECR_CONFIG_LIST,
  ROUTE_ECR_CONFIG_EDIT,
  ROUTE_ECR_CONFIG_ADD,
  ROUTE_PLUGINS,
  ROUTE_ABOUT,
  ROUTE_LICENSE,
  ROUTE_CLONE_WIDGET,
  ROUTE_EMAIL_CONFIG,
  ROUTE_CMS_CONTENTTEMPLATE_LIST,
  ROUTE_CMS_CONTENTTEMPLATE_ADD,
  ROUTE_CMS_ADD_CONTENT,
  ROUTE_CMS_EDIT_CONTENT,
  ROUTE_CMS_CONTENTTEMPLATE_EDIT,
  ROUTE_CMS_ASSETS_LIST,
  ROUTE_CMS_CONTENTTYPE_LIST,
  ROUTE_CMS_CONTENTTYPE_ADD,
  ROUTE_CMS_CONTENTTYPE_EDIT,
  ROUTE_CMS_CONTENT_TYPE_ATTRIBUTE_ADD,
  ROUTE_CMS_CONTENT_TYPE_ATTRIBUTE_EDIT,
  ROUTE_CMS_CONTENT_TYPE_ATTRIBUTE_MONOLIST_ADD,
  ROUTE_CMS_CONTENT_SETTINGS,
  ROUTE_CMS_CONTENTS,
  ROUTE_CMS_VERSIONING,
  ROUTE_CMS_VERSIONING_CONTENT_DETAIL,
  ROUTE_CMS_VERSIONING_CONTENT_HISTORY,
} from 'app-init/router';

import LoginFormContainer from 'ui/login/LoginFormContainer';
import ToastsContainer from 'ui/app/ToastsContainer';
import DashboardPage from 'ui/dashboard/DashboardPage';
import PageTreePageContainer from 'ui/pages/list/PageTreePageContainer';
import ListWidgetPageContainer from 'ui/widgets/list/ListWidgetPageContainer';
import AddWidgetPage from 'ui/widgets/add/AddWidgetPage';
import NewUserWidgetPage from 'ui/widgets/newUserWidget/NewUserWidgetPage';
import EditWidgetPageContainer from 'ui/widgets/edit/EditWidgetPageContainer';
import WidgetConfigPageContainer from 'ui/widgets/config/WidgetConfigPageContainer';
import DetailWidgetPageContainer from 'ui/widgets/detail/DetailWidgetPageContainer';
import ListFragmentPage from 'ui/fragments/list/ListFragmentPage';
import AddFragmentPage from 'ui/fragments/add/AddFragmentPage';
import EditFragmentPageContainer from 'ui/fragments/edit/EditFragmentPageContainer';
import CloneFragmentPageContainer from 'ui/fragments/clone/CloneFragmentPageContainer';
import DetailFragmentPageContainer from 'ui/fragments/detail/DetailFragmentPageContainer';
import PagesAddPageContainer from 'ui/pages/add/PagesAddPageContainer';
import PagesEditPage from 'ui/pages/edit/PagesEditPage';
import PagesClonePage from 'ui/pages/clone/PagesClonePage';
import PagesDetailPageContainer from 'ui/pages/detail/PagesDetailPageContainer';
import PageSettingsPage from 'ui/pages/settings/PageSettings';
import PageConfigPageContainer from 'ui/pages/config/PageConfigPageContainer';
import PageTemplateListPage from 'ui/page-templates/list/PageTemplateListPage';
import PageTemplateAddPage from 'ui/page-templates/add/PageTemplateAddPage';
import PageTemplateEditPage from 'ui/page-templates/edit/PageTemplateEditPage';
import PageTemplateClonePage from 'ui/page-templates/clone/PageTemplateClonePage';
import PageTemplateDetailPageContainer from 'ui/page-templates/detail/PageTemplateDetailPageContainer';
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
import MyProfilePageContainer from 'ui/users/my-profile/MyProfilePageContainer';
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
// component repository
import ComponentListPage from 'ui/component-repository/components/list/ComponentListPage';
import ComponentListPageDisabled from 'ui/component-repository/components/list/ComponentListPageDisabled';
import SettingsListPage from 'ui/component-repository/settings/list/SettingsListPage';
import SettingsEditPage from 'ui/component-repository/settings/edit/SettingsEditPage';
import SettingsAddPage from 'ui/component-repository/settings/add/SettingsAddPage';
// attribute type
import ListProfileTypePage from 'ui/profile-types/list/ListProfileTypePage';
import AddProfileTypesPage from 'ui/profile-types/add/AddProfileTypesPage';
import EditProfileTypesPage from 'ui/profile-types/edit/EditProfileTypesPage';
import AddProfileTypeAttributePage from 'ui/profile-types/attributes/AddProfileTypeAttributePage';
import EditProfileTypeAttributePage from 'ui/profile-types/attributes/EditProfileTypeAttributePage';
import MonolistProfilePageContainer from 'ui/profile-types/attributes/monolist/MonolistProfilePageContainer';
import PluginConfigPageContainer from 'ui/plugins/PluginConfigPageContainer';
import ListDatabasePage from 'ui/database/list/ListDatabasePage';
import AddDatabasePageContainer from 'ui/database/add/AddDatabasePageContainer';
import ReportDatabasePageContainer from 'ui/database/report/ReportDatabasePageContainer';
import FileBrowserPage from 'ui/file-browser/list/ListFilesPage';
import UploadFileBrowserPage from 'ui/file-browser/upload/UploadFileBrowserPage';
import CreateFolderPage from 'ui/file-browser/add/CreateFolderPage';
import CreateTextFilePage from 'ui/file-browser/add/CreateTextFilePage';
import EditTextFilePage from 'ui/file-browser/edit/EditTextFilePage';
import PluginsPageContainer from 'ui/plugins/PluginsPageContainer';
import PageNotFoundContainer from 'ui/app/PageNotFoundContainer';
import CloneWidgetPage from 'ui/widgets/clone/CloneWidgetPage';
import EmailConfigPage from 'ui/email-config/EmailConfigPage';
import ContentTemplateListPage from 'ui/content-template/ContentTemplateListPage';
import AddContentTemplatePage from 'ui/content-template/AddContentTemplatePage';
import AddContentPage from 'ui/add-content/AddContentPage';
import EditContentPage from 'ui/edit-content/EditContentPage';
import EditContentTemplatePage from 'ui/content-template/EditContentTemplatePage';
import AssetsListPage from 'ui/assets/AssetsListPage';
import ContentTypeListPage from 'ui/content-type/ContentTypeListPage';
import AddContentTypePage from 'ui/content-type/AddContentTypePage';
import EditContentTypePage from 'ui/content-type/EditContentTypePage';
import AddContentTypeAttributePage from 'ui/content-type/attributes/AddContentTypeAttributePage';
import EditContentTypeAttributePage from 'ui/content-type/attributes/EditContentTypeAttributePage';
import ContentTypeMonolistPageContainer from 'ui/content-type/attributes/monolist/MonolistPageContainer';
import ContentSettingsPage from 'ui/content-settings/ContentSettingsPage';
import ContentsPage from 'ui/contents/ContentsPage';
import VersioningListPage from 'ui/versioning/VersioningListPage';
import ContentVersionDetailsPage from 'ui/versioning/details/ContentVersionDetailsPage';
import SingleContentVersioningHistoryPage from 'ui/versioning/SingleContentVersioningHistoryPage';

import InternalPage from 'ui/internal-page/InternalPage';
import entandoApps from 'entando-apps';
import AboutPage from 'ui/about/AboutPage';
import LicensePage from 'ui/license/LicensePage';
import getRuntimeEnv from 'helpers/getRuntimeEnv';

const appsRoutes = entandoApps.reduce((routes, app) => (
  [
    ...routes,
    ...app.routesDir.map(AppRoute => (
      <Route
        exact
        key={AppRoute.path}
        path={AppRoute.path}
        // eslint-disable-next-line react/jsx-pascal-case
        render={() => <InternalPage><AppRoute.component /></InternalPage>}
      />
    )),
  ]
), []);

const getRouteComponent = () => {
  const { COMPONENT_REPOSITORY_UI_ENABLED } = getRuntimeEnv();
  return (
    <Switch>
      <Route
        path={ROUTE_HOME}
        exact
        render={() => (
          <LoginPage>
            <LoginFormContainer />
          </LoginPage>
      )}
      />
      <Route path={ROUTE_DASHBOARD} component={DashboardPage} />
      {/* page */}
      <Route exact path={ROUTE_PAGE_TREE} component={PageTreePageContainer} />
      <Route path={ROUTE_PAGE_ADD} component={PagesAddPageContainer} />
      <Route path={ROUTE_PAGE_EDIT} component={PagesEditPage} />
      <Route path={ROUTE_PAGE_CLONE} component={PagesClonePage} />
      <Route path={ROUTE_PAGE_DETAIL} component={PagesDetailPageContainer} />
      <Route path={ROUTE_PAGE_SETTINGS} component={PageSettingsPage} />
      <Route path={ROUTE_PAGE_CONFIG} component={PageConfigPageContainer} />
      {/* page template */}
      <Route exact path={ROUTE_PAGE_TEMPLATE_LIST} component={PageTemplateListPage} />
      <Route path={ROUTE_PAGE_TEMPLATE_ADD} component={PageTemplateAddPage} />
      <Route path={ROUTE_PAGE_TEMPLATE_EDIT} component={PageTemplateEditPage} />
      <Route path={ROUTE_PAGE_TEMPLATE_CLONE} component={PageTemplateClonePage} />
      <Route path={ROUTE_PAGE_TEMPLATE_DETAIL} component={PageTemplateDetailPageContainer} />
      {/* widgets */}
      <Route exact path={ROUTE_WIDGET_LIST} component={ListWidgetPageContainer} />
      <Route path={ROUTE_WIDGET_ADD} component={AddWidgetPage} />
      <Route path={ROUTE_WIDGET_EDIT} component={EditWidgetPageContainer} />
      <Route path={ROUTE_WIDGET_NEW_USERWIDGET} component={NewUserWidgetPage} />
      <Route path={ROUTE_WIDGET_DETAIL} component={DetailWidgetPageContainer} />
      <Route path={ROUTE_WIDGET_CONFIG} component={WidgetConfigPageContainer} />
      <Route path={ROUTE_CLONE_WIDGET} component={CloneWidgetPage} />
      {/* fragments */}
      <Route exact path={ROUTE_FRAGMENT_LIST} component={ListFragmentPage} />
      <Route path={ROUTE_FRAGMENT_ADD} component={AddFragmentPage} />
      <Route path={ROUTE_FRAGMENT_EDIT} component={EditFragmentPageContainer} />
      <Route path={ROUTE_FRAGMENT_CLONE} component={CloneFragmentPageContainer} />
      <Route path={ROUTE_FRAGMENT_DETAIL} component={DetailFragmentPageContainer} />
      {/* cms */}
      <Route exact path={ROUTE_CMS_CONTENTTEMPLATE_LIST} component={ContentTemplateListPage} />
      <Route exact path={ROUTE_CMS_CONTENTTEMPLATE_ADD} component={AddContentTemplatePage} />
      <Route exact path={ROUTE_CMS_ADD_CONTENT} component={AddContentPage} />
      <Route exact path={ROUTE_CMS_CONTENTTEMPLATE_EDIT} component={EditContentTemplatePage} />
      <Route exact path={ROUTE_CMS_CONTENTTYPE_LIST} component={ContentTypeListPage} />
      <Route exact path={ROUTE_CMS_CONTENTTYPE_ADD} component={AddContentTypePage} />
      <Route exact path={ROUTE_CMS_CONTENTTYPE_EDIT} component={EditContentTypePage} />
      <Route
        exact
        path={ROUTE_CMS_CONTENT_TYPE_ATTRIBUTE_ADD}
        component={AddContentTypeAttributePage}
      />
      <Route
        exact
        path={ROUTE_CMS_CONTENT_TYPE_ATTRIBUTE_EDIT}
        component={EditContentTypeAttributePage}
      />
      <Route
        exact
        path={ROUTE_CMS_CONTENT_TYPE_ATTRIBUTE_MONOLIST_ADD}
        component={ContentTypeMonolistPageContainer}
      />
      <Route exact path={ROUTE_CMS_EDIT_CONTENT} component={EditContentPage} />
      <Route exact path={ROUTE_CMS_ASSETS_LIST} component={AssetsListPage} />
      <Route exact path={ROUTE_CMS_CONTENT_SETTINGS} component={ContentSettingsPage} />
      <Route exact path={ROUTE_CMS_CONTENTS} component={ContentsPage} />
      <Route exact path={ROUTE_CMS_VERSIONING} component={VersioningListPage} />
      <Route
        exact
        path={ROUTE_CMS_VERSIONING_CONTENT_DETAIL}
        component={ContentVersionDetailsPage}
      />
      <Route
        exact
        path={ROUTE_CMS_VERSIONING_CONTENT_HISTORY}
        component={SingleContentVersioningHistoryPage}
      />
      {/* data models */}
      <Route exact path={ROUTE_DATA_MODEL_LIST} component={DataModelListPage} />
      <Route path={ROUTE_DATA_MODEL_ADD} component={AddDataModelPage} />
      <Route path={ROUTE_DATA_MODEL_EDIT} component={EditDataModelPage} />
      {/* data type */}
      <Route exact path={ROUTE_DATA_TYPE_LIST} component={ListDataTypePage} />
      <Route path={ROUTE_DATA_TYPE_ADD} component={AddDataTypesPage} />
      <Route path={ROUTE_DATA_TYPE_EDIT} component={EditDataTypesPage} />
      {/* user */}
      <Route exact path={ROUTE_USER_LIST} component={UserListPage} />
      <Route path={ROUTE_USER_ADD} component={AddUserPage} />
      <Route path={ROUTE_USER_EDIT} component={EditUserPage} />
      <Route path={ROUTE_USER_DETAIL} component={DetailUserPage} />
      <Route path={ROUTE_USER_RESTRICTIONS} component={UserRestrictionsPage} />
      <Route path={ROUTE_USER_MY_PROFILE} component={MyProfilePageContainer} />
      <Route path={ROUTE_USER_AUTHORITY} component={UserAuthorityPageContainer} />
      {/* profiles */}
      <Route exact path={ROUTE_PROFILE_TYPE_LIST} component={ListProfileTypePage} />
      <Route path={ROUTE_PROFILE_TYPE_ADD} component={AddProfileTypesPage} />
      <Route path={ROUTE_PROFILE_TYPE_EDIT} component={EditProfileTypesPage} />
      {/* groups */}
      <Route exact path={ROUTE_GROUP_LIST} component={ListGroupPage} />
      <Route path={ROUTE_GROUP_ADD} component={AddGroupPage} />
      <Route path={ROUTE_GROUP_EDIT} component={EditGroupPage} />
      <Route path={ROUTE_GROUP_DETAIL} component={DetailGroupPage} />
      {/* labels */}
      <Route exact path={ROUTE_LABELS_AND_LANGUAGES} component={LabelsAndLanguagesPageContainer} />
      <Route path={ROUTE_LABEL_ADD} component={AddLabelPage} />
      <Route path={ROUTE_LABEL_EDIT} component={EditLabelPage} />
      {/* categories */}
      <Route exact path={ROUTE_CATEGORY_LIST} component={ListCategoryPage} />
      <Route path={ROUTE_CATEGORY_ADD} component={AddCategoryPage} />
      <Route path={ROUTE_CATEGORY_EDIT} component={EditCategoryPage} />
      <Route path={ROUTE_CATEGORY_DETAIL} component={DetailCategoryPage} />
      {/* roles */}
      <Route exact path={ROUTE_ROLE_LIST} component={ListRolePage} />
      <Route path={ROUTE_ROLE_ADD} component={AddRolePage} />
      <Route path={ROUTE_ROLE_EDIT} component={EditRolePage} />
      <Route path={ROUTE_ROLE_DETAIL} component={DetailRolePage} />
      {/* database */}
      <Route exact path={ROUTE_DATABASE_LIST} component={ListDatabasePage} />
      <Route path={ROUTE_DATABASE_ADD} component={AddDatabasePageContainer} />
      <Route path={ROUTE_DATABASE_DUMP_TABLE} component={ReportDatabasePageContainer} />
      <Route path={ROUTE_DATABASE_REPORT} component={ReportDatabasePageContainer} />
      {/* files */}
      <Route exact path={ROUTE_FILE_BROWSER} component={FileBrowserPage} />
      <Route path={ROUTE_FILE_BROWSER_UPLOAD} component={UploadFileBrowserPage} />
      <Route path={ROUTE_FILE_BROWSER_CREATE_FOLDER} component={CreateFolderPage} />
      <Route path={ROUTE_FILE_BROWSER_CREATE_TEXT_FILE} component={CreateTextFilePage} />
      <Route path={ROUTE_FILE_BROWSER_EDIT_TEXT_FILE} component={EditTextFilePage} />
      {/* component repository */}
      <Route
        exact
        path={ROUTE_ECR_COMPONENT_LIST}
        render={() => (
      (COMPONENT_REPOSITORY_UI_ENABLED) ?
        <ComponentListPage /> : <ComponentListPageDisabled />
      )}
      />
      <Route
        exact
        path={ROUTE_ECR_CONFIG_LIST}
        render={() => (
      (COMPONENT_REPOSITORY_UI_ENABLED) ?
        <SettingsListPage /> : <ComponentListPageDisabled />
      )}
      />
      <Route
        path={ROUTE_ECR_CONFIG_EDIT}
        render={() => (
      (COMPONENT_REPOSITORY_UI_ENABLED) ?
        <SettingsEditPage /> : <ComponentListPageDisabled />
      )}
      />
      <Route
        path={ROUTE_ECR_CONFIG_ADD}
        render={() => (
      (COMPONENT_REPOSITORY_UI_ENABLED) ?
        <SettingsAddPage /> : <ComponentListPageDisabled />
      )}
      />
      {/* email config */}
      <Route path={ROUTE_EMAIL_CONFIG} component={EmailConfigPage} />
      {/* other */}
      <Route path={ROUTE_USER_PROFILE} component={EditUserProfilePage} />
      <Route exact path={ROUTE_PLUGINS} component={PluginsPageContainer} />
      <Route path={ROUTE_PLUGIN_CONFIG_PAGE} component={PluginConfigPageContainer} />
      <Route path={ROUTE_DATA_TYPE_ATTRIBUTE_ADD} component={AddDataTypeAttributePage} />
      <Route path={ROUTE_DATA_TYPE_ATTRIBUTE_EDIT} component={EditDataTypeAttributePage} />
      <Route path={ROUTE_PROFILE_TYPE_ATTRIBUTE_ADD} component={AddProfileTypeAttributePage} />
      <Route path={ROUTE_PROFILE_TYPE_ATTRIBUTE_EDIT} component={EditProfileTypeAttributePage} />
      <Route path={ROUTE_ATTRIBUTE_MONOLIST_ADD} component={MonolistPageContainer} />
      <Route path={ROUTE_ATTRIBUTE_MONOLIST_PROFILE_ADD} component={MonolistProfilePageContainer} />
      <Route exact path={ROUTE_RELOAD_CONFIG} component={ReloadConfigPage} />
      <Route path={ROUTE_RELOAD_CONFIRM} component={ReloadConfirmPage} />
      { /* static routes */ }
      <Route path={ROUTE_ABOUT} component={AboutPage} />
      <Route path={ROUTE_LICENSE} component={LicensePage} />
      { /* app routes */ }
      {appsRoutes}
      {/* 404 */}
      <Route component={PageNotFoundContainer} />
    </Switch>
  );
};

class App extends Component {
  componentDidMount() {
    const { username, fetchUserPreferences } = this.props;

    // prevent calling the userPreferences API on login screen
    if (username) {
      fetchUserPreferences(username);
    }
  }

  componentDidUpdate(prevProps) {
    const { username, fetchPlugins, fetchUserPreferences } = this.props;
    if (username && username !== prevProps.username) {
      fetchPlugins();
      fetchUserPreferences(username);
    }
  }

  render() {
    const {
      currentRoute,
      auth,
      isReady,
      username,
    } = this.props;
    if (!username && currentRoute !== ROUTE_HOME) {
      return <Redirect to={ROUTE_HOME} />;
    }

    const readyDisplay = !auth.enabled || auth.authenticated
      ? getRouteComponent()
      : <LoginPage />;

    return (
      <DDProvider>
        <ToastsContainer />
        {!isReady ? null : readyDisplay}
      </DDProvider>
    );
  }
}

App.propTypes = {
  currentRoute: PropTypes.string.isRequired,
  username: PropTypes.string,
  auth: PropTypes.shape({ enabled: PropTypes.bool, authenticated: PropTypes.bool }),
  isReady: PropTypes.bool,
  fetchPlugins: PropTypes.func,
  fetchUserPreferences: PropTypes.func,
};

App.defaultProps = {
  username: null,
  auth: { enabled: false },
  fetchPlugins: () => {},
  fetchUserPreferences: () => {},
  isReady: false,
};

export default withAuth(App);
