import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { api, currentUser } from '@entando/apimanager';
import { messages } from '@entando/messages';
import loginForm from 'state/login-form/reducer';
import activityStream from 'state/activity-stream/reducer';
import locale from 'state/locale/reducer';
import widgets from 'state/widgets/reducer';
import pages from 'state/pages/reducer';
import groups from 'state/groups/reducer';
import roles from 'state/roles/reducer';
import pagination from 'state/pagination/reducer';
import fragments from 'state/fragments/reducer';
import pageTemplates from 'state/page-templates/reducer';
import dataTypes from 'state/data-types/reducer';
import profileTypes from 'state/profile-types/reducer';
import pageConfig from 'state/page-config/reducer';
import users from 'state/users/reducer';
import dataModels from 'state/data-models/reducer';
import modal from 'state/modal/reducer';
import languages from 'state/languages/reducer';
import labels from 'state/labels/reducer';
import categories from 'state/categories/reducer';
import loading from 'state/loading/reducer';
import permissions from 'state/permissions/reducer';
import configuration from 'state/reload-configuration/reducer';
import dashboard from 'state/dashboard/reducer';
import database from 'state/database/reducer';
import tableColumnOrder from 'state/table-column-order/reducer';
import fileBrowser from 'state/file-browser/reducer';
import userSettings from 'state/user-settings/reducer';
import userProfile from 'state/user-profile/reducer';
import userPreferences from 'state/user-preferences/reducer';
import componentRepositoryComponents from 'state/component-repository/components/reducer';
import componentRepositories from 'state/component-repository/component-repositories/reducer';
import componentRepositoryCategories from 'state/component-repository/categories/reducer';
import componentRepositoryExtraFilters from 'state/component-repository/extra-filters/reducer';
import appTour from 'state/app-tour/reducer';
import plugins from 'state/plugins/reducer';
import entandoApps from 'entando-apps';

const appsReducers = entandoApps.reduce((obj, { id, state }) => ({ ...obj, [id]: state }), {});

const reducerDef = {
  apps: Object.keys(appsReducers).length ? combineReducers(appsReducers) : {},
  activityStream,
  api,
  categories,
  configuration,
  currentUser,
  dashboard,
  database,
  dataModels,
  dataTypes,
  componentRepositoryCategories,
  componentRepositoryComponents,
  componentRepositoryExtraFilters,
  componentRepositories,
  fileBrowser,
  form,
  fragments,
  groups,
  labels,
  languages,
  loading,
  locale,
  loginForm,
  messages,
  modal,
  pages,
  pagination,
  pageConfig,
  pageTemplates,
  permissions,
  plugins,
  profileTypes,
  roles,
  tableColumnOrder,
  users,
  widgets,
  userSettings,
  userProfile,
  appTour,
  userPreferences,
};

// app root reducer
const reducer = combineReducers(reducerDef);

export default reducer;
