import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { api, currentUser } from '@entando/apimanager';
import { messages } from '@entando/messages';

import pluginArray from 'entando-plugins';

import loginForm from 'state/login-form/reducer';
import activityStream from 'state/activity-stream/reducer';
import locale from 'state/locale/reducer';
import widgets from 'state/widgets/reducer';
import pages from 'state/pages/reducer';
import groups from 'state/groups/reducer';
import roles from 'state/roles/reducer';
import pagination from 'state/pagination/reducer';
import fragments from 'state/fragments/reducer';
import pageModels from 'state/page-models/reducer';
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
import fileBrowser from 'state/file-browser/reducer';
import userSettings from 'state/user-settings/reducer';
import userProfile from 'state/user-profile/reducer';
import digitalExchangeComponents from 'state/digital-exchange/components/reducer';
import digitalExchanges from 'state/digital-exchange/digital-exchanges/reducer';
import digitalExchangeCategories from 'state/digital-exchange/categories/reducer';
import digitalExchangeExtraFilters from 'state/digital-exchange/extra-filters/reducer';

const reducerDef = {
  activityStream,
  api,
  categories,
  configuration,
  currentUser,
  dashboard,
  database,
  dataModels,
  dataTypes,
  digitalExchangeCategories,
  digitalExchangeComponents,
  digitalExchangeExtraFilters,
  digitalExchanges,
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
  pageModels,
  permissions,
  profileTypes,
  roles,
  users,
  widgets,
  userSettings,
  userProfile,
};

if (pluginArray.length) {
  // builds a plugins reducer
  const pluginsReducerObj = {};
  pluginArray.forEach((plugin) => {
    if (plugin.reducer) {
      pluginsReducerObj[plugin.id] = plugin.reducer;
    }
  });
  reducerDef.plugins = combineReducers(pluginsReducerObj);
}

// app root reducer
const reducer = combineReducers(reducerDef);

export default reducer;
