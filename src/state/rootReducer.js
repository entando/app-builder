import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { routerReducer as router } from 'frontend-common-components';

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
import errors from 'state/errors/reducer';
import dataTypes from 'state/data-types/reducer';
import api from 'state/api/reducer';
import pageConfig from 'state/page-config/reducer';
import users from 'state/users/reducer';
import profileTypes from 'state/profile-types/reducer';
import currentUser from 'state/current-user/reducer';
import dataModels from 'state/data-models/reducer';
import modal from 'state/modal/reducer';
import languages from 'state/languages/reducer';
import labels from 'state/labels/reducer';
import categories from 'state/categories/reducer';
import loading from 'state/loading/reducer';
import permissions from 'state/permissions/reducer';
import alerts from 'state/alerts/reducer';

const reducerDef = {
  api,
  currentUser,
  router,
  form,
  loginForm,
  locale,
  activityStream,
  pages,
  groups,
  roles,
  pagination,
  widgets,
  fragments,
  pageModels,
  errors,
  dataModels,
  dataTypes,
  pageConfig,
  users,
  profileTypes,
  modal,
  languages,
  labels,
  categories,
  loading,
  permissions,
  alerts,
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
