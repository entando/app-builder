import React, { Component, Suspense } from 'react';
import PropTypes from 'prop-types';
import { DDProvider } from '@entando/ddtable';
import {
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import withAuth from 'auth/withAuth';
import { LoginPage } from '@entando/pages';
import { Spinner } from 'patternfly-react';

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
} from 'app-init/router';

import LoginFormContainer from 'ui/login/LoginFormContainer';
import ToastsContainer from 'ui/app/ToastsContainer';
import DashboardPage from 'ui/dashboard/DashboardPage';
import PageTreePageContainer from 'ui/pages/list/PageTreePageContainer';

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
import ListGroupPage from 'ui/groups/list/ListGroupPage';
import AddGroupPage from 'ui/groups/add/AddGroupPage';
import EditGroupPage from 'ui/groups/edit/EditGroupPage';
import DetailGroupPage from 'ui/groups/detail/DetailGroupPage';
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
import AddProfileTypeAttributePage from 'ui/profile-types/attributes/AddProfileTypeAttributePage';
import EditProfileTypeAttributePage from 'ui/profile-types/attributes/EditProfileTypeAttributePage';
import MonolistProfilePageContainer from 'ui/profile-types/attributes/monolist/MonolistProfilePageContainer';

import InternalPage from 'ui/internal-page/InternalPage';
import RowSpinner from 'ui/pages/common/RowSpinner';
import entandoApps from 'entando-apps';
import getRuntimeEnv from 'helpers/getRuntimeEnv';

const ListWidgetPageContainer = React.lazy(() => import('ui/widgets/list/ListWidgetPageContainer'));
const AddWidgetPage = React.lazy(() => import('ui/widgets/add/AddWidgetPage'));
const EditWidgetPageContainer = React.lazy(() => import('ui/widgets/edit/EditWidgetPageContainer'));
const NewUserWidgetPage = React.lazy(() => import('ui/widgets/newUserWidget/NewUserWidgetPage'));
const DetailWidgetPageContainer = React.lazy(() => import('ui/widgets/detail/DetailWidgetPageContainer'));
const WidgetConfigPageContainer = React.lazy(() => import('ui/widgets/config/WidgetConfigPageContainer'));
const CloneWidgetPage = React.lazy(() => import('ui/widgets/clone/CloneWidgetPage'));
const ListFragmentPage = React.lazy(() => import('ui/fragments/list/ListFragmentPage'));
const AddFragmentPage = React.lazy(() => import('ui/fragments/add/AddFragmentPage'));
const EditFragmentPageContainer = React.lazy(() => import('ui/fragments/edit/EditFragmentPageContainer'));
const CloneFragmentPageContainer = React.lazy(() => import('ui/fragments/clone/CloneFragmentPageContainer'));
const DetailFragmentPageContainer = React.lazy(() => import('ui/fragments/detail/DetailFragmentPageContainer'));
const PluginConfigPageContainer = React.lazy(() => import('ui/plugins/PluginConfigPageContainer'));
const PluginsPageContainer = React.lazy(() => import('ui/plugins/PluginsPageContainer'));
const EditUserProfilePage = React.lazy(() => import('ui/user-profile/edit/EditUserProfilePage'));
const EmailConfigPage = React.lazy(() => import('ui/email-config/EmailConfigPage'));
const DetailRolePage = React.lazy(() => import('ui/roles/detail/DetailRolePage'));
const EditRolePage = React.lazy(() => import('ui/roles/edit/EditRolePage'));
const AddRolePage = React.lazy(() => import('ui/roles/add/AddRolePage'));
const ListRolePage = React.lazy(() => import('ui/roles/list/ListRolePage'));
const EditLabelPage = React.lazy(() => import('ui/labels/edit/EditLabelPage'));
const AddLabelPage = React.lazy(() => import('ui/labels/add/AddLabelPage'));
const LabelsAndLanguagesPageContainer = React.lazy(() => import('ui/labels/list/LabelsAndLanguagesPageContainer'));
const EditProfileTypesPage = React.lazy(() => import('ui/profile-types/edit/EditProfileTypesPage'));
const AddProfileTypesPage = React.lazy(() => import('ui/profile-types/add/AddProfileTypesPage'));
const ListProfileTypePage = React.lazy(() => import('ui/profile-types/list/ListProfileTypePage'));
const UserAuthorityPageContainer = React.lazy(() => import('ui/users/authority/UserAuthorityPageContainer'));
const MyProfilePageContainer = React.lazy(() => import('ui/users/my-profile/MyProfilePageContainer'));
const UserRestrictionsPage = React.lazy(() => import('ui/users/restrictions/UserRestrictionsPage'));
const DetailUserPage = React.lazy(() => import('ui/users/detail/DetailUserPage'));
const EditUserPage = React.lazy(() => import('ui/users/edit/EditUserPage'));
const AddUserPage = React.lazy(() => import('ui/users/add/AddUserPage'));
const UserListPage = React.lazy(() => import('ui/users/list/UserListPage'));

const AboutPage = React.lazy(() => import('ui/about/AboutPage'));
const LicensePage = React.lazy(() => import('ui/license/LicensePage'));
const PageNotFoundContainer = React.lazy(() => import('ui/app/PageNotFoundContainer'));

const ListDatabasePage = React.lazy(() => import('ui/database/list/ListDatabasePage'));
const AddDatabasePageContainer = React.lazy(() => import('ui/database/add/AddDatabasePageContainer'));
const ReportDatabasePageContainer = React.lazy(() => import('ui/database/report/ReportDatabasePageContainer'));
const FileBrowserPage = React.lazy(() => import('ui/file-browser/list/ListFilesPage'));
const UploadFileBrowserPage = React.lazy(() => import('ui/file-browser/upload/UploadFileBrowserPage'));
const CreateFolderPage = React.lazy(() => import('ui/file-browser/add/CreateFolderPage'));
const CreateTextFilePage = React.lazy(() => import('ui/file-browser/add/CreateTextFilePage'));
const EditTextFilePage = React.lazy(() => import('ui/file-browser/edit/EditTextFilePage'));

export const renderWithSuspense = component =>
  <Suspense fallback={<Spinner loading />}>{component}</Suspense>;

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
      <Route
        exact
        path={ROUTE_WIDGET_LIST}
        render={() => renderWithSuspense(<ListWidgetPageContainer />)}
      />
      <Route
        path={ROUTE_WIDGET_ADD}
        render={() => renderWithSuspense(<AddWidgetPage />)}
      />
      <Route
        path={ROUTE_WIDGET_EDIT}
        render={() => renderWithSuspense(<EditWidgetPageContainer />)}
      />
      <Route
        path={ROUTE_WIDGET_NEW_USERWIDGET}
        render={() => renderWithSuspense(<NewUserWidgetPage />)}
      />
      <Route
        path={ROUTE_WIDGET_DETAIL}
        render={() => renderWithSuspense(<DetailWidgetPageContainer />)}
      />
      <Route
        path={ROUTE_WIDGET_CONFIG}
        render={() => renderWithSuspense(<WidgetConfigPageContainer />)}
      />
      <Route
        path={ROUTE_CLONE_WIDGET}
        render={() => renderWithSuspense(<CloneWidgetPage />)}
      />
      {/* fragments */}
      <Route
        exact
        path={ROUTE_FRAGMENT_LIST}
        render={() => renderWithSuspense(<ListFragmentPage />)}
      />
      <Route
        path={ROUTE_FRAGMENT_ADD}
        render={() => renderWithSuspense(<AddFragmentPage />)}
      />
      <Route
        path={ROUTE_FRAGMENT_EDIT}
        render={() => renderWithSuspense(<EditFragmentPageContainer />)}
      />
      <Route
        path={ROUTE_FRAGMENT_CLONE}
        render={() => renderWithSuspense(<CloneFragmentPageContainer />)}
      />
      <Route
        path={ROUTE_FRAGMENT_DETAIL}
        render={() => renderWithSuspense(<DetailFragmentPageContainer />)}
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
      <Route exact path={ROUTE_USER_LIST} render={() => renderWithSuspense(<UserListPage />)} />
      <Route path={ROUTE_USER_ADD} render={() => renderWithSuspense(<AddUserPage />)} />
      <Route path={ROUTE_USER_EDIT} render={() => renderWithSuspense(<EditUserPage />)} />
      <Route path={ROUTE_USER_DETAIL} render={() => renderWithSuspense(<DetailUserPage />)} />
      <Route
        path={ROUTE_USER_RESTRICTIONS}
        render={() => renderWithSuspense(<UserRestrictionsPage />)}
      />
      <Route
        path={ROUTE_USER_MY_PROFILE}
        render={() => renderWithSuspense(<MyProfilePageContainer />)}
      />
      <Route
        path={ROUTE_USER_AUTHORITY}
        render={() => renderWithSuspense(<UserAuthorityPageContainer />)}
      />
      {/* profiles */}
      <Route
        exact
        path={ROUTE_PROFILE_TYPE_LIST}
        render={() => renderWithSuspense(<ListProfileTypePage />)}
      />
      <Route
        path={ROUTE_PROFILE_TYPE_ADD}
        render={() => renderWithSuspense(<AddProfileTypesPage />)}
      />
      <Route
        path={ROUTE_PROFILE_TYPE_EDIT}
        render={() => renderWithSuspense(<EditProfileTypesPage />)}
      />
      {/* groups */}
      <Route exact path={ROUTE_GROUP_LIST} component={ListGroupPage} />
      <Route path={ROUTE_GROUP_ADD} component={AddGroupPage} />
      <Route path={ROUTE_GROUP_EDIT} component={EditGroupPage} />
      <Route path={ROUTE_GROUP_DETAIL} component={DetailGroupPage} />
      {/* labels */}
      <Route
        exact
        path={ROUTE_LABELS_AND_LANGUAGES}
        render={() => renderWithSuspense(<LabelsAndLanguagesPageContainer />)}
      />
      <Route path={ROUTE_LABEL_ADD} render={() => renderWithSuspense(<AddLabelPage />)} />
      <Route path={ROUTE_LABEL_EDIT} render={() => renderWithSuspense(<EditLabelPage />)} />
      {/* roles */}
      <Route exact path={ROUTE_ROLE_LIST} render={() => renderWithSuspense(<ListRolePage />)} />
      <Route path={ROUTE_ROLE_ADD} render={() => renderWithSuspense(<AddRolePage />)} />
      <Route path={ROUTE_ROLE_EDIT} render={() => renderWithSuspense(<EditRolePage />)} />
      <Route path={ROUTE_ROLE_DETAIL} render={() => renderWithSuspense(<DetailRolePage />)} />
      {/* database */}
      <Route
        exact
        path={ROUTE_DATABASE_LIST}
        render={() => renderWithSuspense(<ListDatabasePage />)}
      />
      <Route
        path={ROUTE_DATABASE_ADD}
        render={() => renderWithSuspense(<AddDatabasePageContainer />)}
      />
      <Route
        path={ROUTE_DATABASE_DUMP_TABLE}
        render={() => renderWithSuspense(<ReportDatabasePageContainer />)}
      />
      <Route
        path={ROUTE_DATABASE_REPORT}
        render={() => renderWithSuspense(<ReportDatabasePageContainer />)}
      />
      {/* files */}
      <Route
        exact
        path={ROUTE_FILE_BROWSER}
        render={() => renderWithSuspense(<FileBrowserPage />)}
      />
      <Route
        path={ROUTE_FILE_BROWSER_UPLOAD}
        render={() => renderWithSuspense(<UploadFileBrowserPage />)}
      />
      <Route
        path={ROUTE_FILE_BROWSER_CREATE_FOLDER}
        render={() => renderWithSuspense(<CreateFolderPage />)}
      />
      <Route
        path={ROUTE_FILE_BROWSER_CREATE_TEXT_FILE}
        render={() => renderWithSuspense(<CreateTextFilePage />)}
      />
      <Route
        path={ROUTE_FILE_BROWSER_EDIT_TEXT_FILE}
        render={() => renderWithSuspense(<EditTextFilePage />)}
      />
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
      <Route
        path={ROUTE_EMAIL_CONFIG}
        render={() => renderWithSuspense(<EmailConfigPage />)}
      />
      {/* other */}
      <Route
        path={ROUTE_USER_PROFILE}
        render={() => renderWithSuspense(<EditUserProfilePage />)}
      />
      <Route
        exact
        path={ROUTE_PLUGINS}
        render={() => renderWithSuspense(<PluginsPageContainer />)}
      />
      <Route
        path={ROUTE_PLUGIN_CONFIG_PAGE}
        render={() => renderWithSuspense(<PluginConfigPageContainer />)}
      />
      <Route path={ROUTE_DATA_TYPE_ATTRIBUTE_ADD} component={AddDataTypeAttributePage} />
      <Route path={ROUTE_DATA_TYPE_ATTRIBUTE_EDIT} component={EditDataTypeAttributePage} />
      <Route path={ROUTE_PROFILE_TYPE_ATTRIBUTE_ADD} component={AddProfileTypeAttributePage} />
      <Route path={ROUTE_PROFILE_TYPE_ATTRIBUTE_EDIT} component={EditProfileTypeAttributePage} />
      <Route path={ROUTE_ATTRIBUTE_MONOLIST_ADD} component={MonolistPageContainer} />
      <Route path={ROUTE_ATTRIBUTE_MONOLIST_PROFILE_ADD} component={MonolistProfilePageContainer} />
      <Route exact path={ROUTE_RELOAD_CONFIG} component={ReloadConfigPage} />
      <Route path={ROUTE_RELOAD_CONFIRM} component={ReloadConfirmPage} />
      { /* static routes */}
      <Route path={ROUTE_ABOUT} render={() => renderWithSuspense(<AboutPage />)} />
      <Route path={ROUTE_LICENSE} render={() => renderWithSuspense(<LicensePage />)} />
      { /* app routes */}
      {appsRoutes}
      {/* 404 */}
      <Route render={() => renderWithSuspense(<PageNotFoundContainer />)} />
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
      loggedUserPrefloading,
    } = this.props;
    if (!username && currentRoute !== ROUTE_HOME) {
      return <Redirect to={{ pathname: ROUTE_HOME, search: `?redirect_uri=${currentRoute}` }} />;
    }

    if (!loggedUserPrefloading) {
      return <div className="shell-preload"><RowSpinner loading /></div>;
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
  loggedUserPrefloading: PropTypes.bool,
};

App.defaultProps = {
  username: null,
  auth: { enabled: false },
  fetchPlugins: () => {},
  fetchUserPreferences: () => {},
  isReady: false,
  loggedUserPrefloading: false,
};

export default withAuth(App);
