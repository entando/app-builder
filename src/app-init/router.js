import { routerConfig } from '@entando/router';

import store from 'state/store';

export const ROUTE_HOME = 'home';
export const ROUTE_DASHBOARD = 'dashboard';
export const ROUTE_USER_PROFILE = 'userprofile';
export const ROUTE_PAGE = 'page';
export const ROUTE_PAGE_ADD = 'pageAdd';
export const ROUTE_PAGE_EDIT = 'pageEdit';
export const ROUTE_PAGE_CLONE = 'pageClone';
export const ROUTE_PAGE_TREE = 'pageTree';
export const ROUTE_PAGE_DETAIL = 'pageDetail';
export const ROUTE_PAGE_SETTINGS = 'pageSettings';
export const ROUTE_PAGE_CONFIG = 'pageConfiguration';
export const ROUTE_PAGE_MODEL_LIST = 'pageModelList';
export const ROUTE_PAGE_MODEL_ADD = 'pageModelAdd';
export const ROUTE_PAGE_MODEL_EDIT = 'pageModelEdit';
export const ROUTE_PAGE_MODEL_DETAIL = 'pageModelDetail';
export const ROUTE_CONTENT = 'content';
export const ROUTE_WIDGET = 'widget';
export const ROUTE_WIDGET_LIST = 'widgetList';
export const ROUTE_WIDGET_ADD = 'widgetForm';
export const ROUTE_WIDGET_EDIT = 'widgetEdit';
export const ROUTE_WIDGET_CONFIG = 'widgetConfig';
export const ROUTE_FRAGMENT_LIST = 'fragmentList';
export const ROUTE_FRAGMENT_ADD = 'fragmentAdd';
export const ROUTE_FRAGMENT_EDIT = 'fragmentEdit';
export const ROUTE_FRAGMENT_DETAIL = 'fragmentDetail';
export const ROUTE_DATA_MODEL_ADD = 'dataModelsAdd';
export const ROUTE_DATA_MODEL_LIST = 'dataModelsList';
export const ROUTE_DATA_TYPE_LIST = 'dataTypeList';
export const ROUTE_DATA_TYPE_EDIT = 'dataTypeEdit';
export const ROUTE_DATA_TYPE_ADD = 'dataTypeAdd';
export const ROUTE_PROFILE_TYPE_LIST = 'profileTypeList';
export const ROUTE_PROFILE_TYPE_EDIT = 'profileTypeEdit';
export const ROUTE_PROFILE_TYPE_ADD = 'profileTypeAdd';
export const ROUTE_USER_LIST = 'userList';
export const ROUTE_USER_ADD = 'userAdd';
export const ROUTE_USER_EDIT = 'userEdit';
export const ROUTE_USER_DETAIL = 'userDetail';
export const ROUTE_USER_RESTRICTIONS = 'userRestrictions';
export const ROUTE_USER_MY_PROFILE = 'myProfile';
export const ROUTE_GROUP_LIST = 'groupList';
export const ROUTE_GROUP_ADD = 'groupAdd';
export const ROUTE_GROUP_EDIT = 'groupEdit';
export const ROUTE_GROUP_DETAIL = 'groupDetail';
export const ROUTE_USER_AUTHORITY = 'authorityPage';
export const ROUTE_LABELS_ADD = 'labelsAdd';
export const ROUTE_LABELS_AND_LANGUAGES = 'labelsAndLanguages';
export const ROUTE_LABEL_ADD = 'labelAdd';
export const ROUTE_LABEL_EDIT = 'labelEdit';
export const ROUTE_CATEGORY_LIST = 'categoryList';
export const ROUTE_CATEGORY_ADD = 'categoryAdd';
export const ROUTE_DATA_TYPE_ATTRIBUTE_ADD = 'attributeAdd';
export const ROUTE_DATA_TYPE_ATTRIBUTE_EDIT = 'attributeEdit';
export const ROUTE_PROFILE_TYPE_ATTRIBUTE_ADD = 'attributeProfileAdd';
export const ROUTE_PROFILE_TYPE_ATTRIBUTE_EDIT = 'attributeProfileEdit';
export const ROUTE_ATTRIBUTE_MONOLIST_ADD = 'attributeAddMonolist';
export const ROUTE_ATTRIBUTE_MONOLIST_PROFILE_ADD = 'attributeProfileAddMonolist';
export const ROUTE_CATEGORY_EDIT = 'categoryEdit';
export const ROUTE_CATEGORY_DETAIL = 'categoryDetail';
export const ROUTE_ROLE_LIST = 'roleList';
export const ROUTE_ROLE_ADD = 'roleAdd';
export const ROUTE_ROLE_EDIT = 'roleEdit';
export const ROUTE_ROLE_DETAIL = 'roleDetail';
export const ROUTE_RELOAD_CONFIG = 'reloadConfig';
export const ROUTE_RELOAD_CONFIRM = 'reloadConfirm';
export const ROUTE_DATABASE_LIST = 'databaseList';
export const ROUTE_DATABASE_ADD = 'databaseAdd';
export const ROUTE_DATABASE_REPORT = 'databaseReport';
export const ROUTE_DATABASE_DUMP_TABLE = 'databaseDumpTable';
export const ROUTE_PLUGIN_CONFIG_PAGE = 'pluginConfigPage';
export const ROUTE_FILE_BROWSER = 'fileBrowserPage';
export const ROUTE_FILE_BROWSER_UPLOAD = 'fileUploadBrowserPage';
export const ROUTE_FILE_BROWSER_CREATE_FOLDER = 'fileBrowserPageCreateFolder';
export const ROUTE_FILE_BROWSER_CREATE_TEXT_FILE = 'fileBrowserPageCreateFile';

routerConfig(
  store,
  {
    mode: 'browser',
    routes: [
      { name: ROUTE_HOME, path: `${process.env.PUBLIC_URL}/` },
      { name: ROUTE_DASHBOARD, path: `${process.env.PUBLIC_URL}/dashboard` },
      { name: ROUTE_USER_PROFILE, path: `${process.env.PUBLIC_URL}/userprofile/:username` },
      { name: ROUTE_PAGE_TREE, path: `${process.env.PUBLIC_URL}/page` },
      { name: ROUTE_PAGE_ADD, path: `${process.env.PUBLIC_URL}/page/add` },
      { name: ROUTE_PAGE_CLONE, path: `${process.env.PUBLIC_URL}/page/clone` },
      { name: ROUTE_PAGE_DETAIL, path: `${process.env.PUBLIC_URL}/page/detail/:pageCode` },
      { name: ROUTE_PAGE, path: `${process.env.PUBLIC_URL}/page/view/:page` },
      { name: ROUTE_PAGE_EDIT, path: `${process.env.PUBLIC_URL}/page/edit/:pageCode` },
      { name: ROUTE_PAGE_SETTINGS, path: `${process.env.PUBLIC_URL}/page/settings` },
      { name: ROUTE_PAGE_CONFIG, path: `${process.env.PUBLIC_URL}/page/configuration/:pageCode` },
      { name: ROUTE_PAGE_MODEL_LIST, path: `${process.env.PUBLIC_URL}/page-model` },
      { name: ROUTE_PAGE_MODEL_ADD, path: `${process.env.PUBLIC_URL}/page-model/add` },
      { name: ROUTE_PAGE_MODEL_EDIT, path: `${process.env.PUBLIC_URL}/page-model/edit/:pageModelCode` },
      { name: ROUTE_PAGE_MODEL_DETAIL, path: `${process.env.PUBLIC_URL}/page-model/view/:pageModelCode` },
      { name: ROUTE_WIDGET_LIST, path: `${process.env.PUBLIC_URL}/widget` },
      { name: ROUTE_WIDGET_ADD, path: `${process.env.PUBLIC_URL}/widget/add` },
      { name: ROUTE_WIDGET_EDIT, path: `${process.env.PUBLIC_URL}/widget/edit/:widgetCode` },
      { name: ROUTE_WIDGET, path: `${process.env.PUBLIC_URL}/widget/view/:widget` },
      { name: ROUTE_WIDGET_CONFIG, path: `${process.env.PUBLIC_URL}/widget/config/:widgetCode/page/:pageCode/frame/:framePos` },
      { name: ROUTE_FRAGMENT_LIST, path: `${process.env.PUBLIC_URL}/fragment` },
      { name: ROUTE_FRAGMENT_ADD, path: `${process.env.PUBLIC_URL}/fragment/add` },
      { name: ROUTE_FRAGMENT_EDIT, path: `${process.env.PUBLIC_URL}/fragment/edit/:fragmentCode` },
      { name: ROUTE_FRAGMENT_DETAIL, path: `${process.env.PUBLIC_URL}/fragment/view/:fragmentCode` },
      { name: ROUTE_DATA_MODEL_LIST, path: `${process.env.PUBLIC_URL}/datamodels` },
      { name: ROUTE_DATA_MODEL_ADD, path: `${process.env.PUBLIC_URL}/datamodels/add` },
      { name: ROUTE_DATA_TYPE_LIST, path: `${process.env.PUBLIC_URL}/datatype` },
      { name: ROUTE_DATA_TYPE_ADD, path: `${process.env.PUBLIC_URL}/datatype/add` },
      { name: ROUTE_DATA_TYPE_EDIT, path: `${process.env.PUBLIC_URL}/datatype/edit/:datatypeCode` },
      { name: ROUTE_DATA_TYPE_ATTRIBUTE_ADD, path: `${process.env.PUBLIC_URL}/datatype/attribute/:entityCode/add` },
      { name: ROUTE_DATA_TYPE_ATTRIBUTE_EDIT, path: `${process.env.PUBLIC_URL}/datatype/attribute/:entityCode/edit/:attributeCode` },
      { name: ROUTE_ATTRIBUTE_MONOLIST_ADD, path: `${process.env.PUBLIC_URL}/datatype/attribute/:entityCode/MonolistAdd/:attributeCode` },
      { name: ROUTE_PROFILE_TYPE_LIST, path: `${process.env.PUBLIC_URL}/profiletype` },
      { name: ROUTE_PROFILE_TYPE_ADD, path: `${process.env.PUBLIC_URL}/profiletype/add` },
      { name: ROUTE_PROFILE_TYPE_EDIT, path: `${process.env.PUBLIC_URL}/profiletype/edit/:profiletypeCode` },
      { name: ROUTE_PROFILE_TYPE_ATTRIBUTE_ADD, path: `${process.env.PUBLIC_URL}/profiletype/attribute/:entityCode/add` },
      { name: ROUTE_PROFILE_TYPE_ATTRIBUTE_EDIT, path: `${process.env.PUBLIC_URL}/profiletype/attribute/:entityCode/edit/:attributeCode` },
      { name: ROUTE_ATTRIBUTE_MONOLIST_PROFILE_ADD, path: `${process.env.PUBLIC_URL}/profiletype/attribute/:entityCode/MonolistAdd/:attributeCode` },
      { name: ROUTE_USER_LIST, path: `${process.env.PUBLIC_URL}/user` },
      { name: ROUTE_USER_ADD, path: `${process.env.PUBLIC_URL}/user/add` },
      { name: ROUTE_USER_EDIT, path: `${process.env.PUBLIC_URL}/user/edit/:username` },
      { name: ROUTE_USER_DETAIL, path: `${process.env.PUBLIC_URL}/user/view/:username` },
      { name: ROUTE_USER_RESTRICTIONS, path: `${process.env.PUBLIC_URL}/user/restrictions` },
      { name: ROUTE_USER_MY_PROFILE, path: `${process.env.PUBLIC_URL}/myProfile` },
      { name: ROUTE_GROUP_LIST, path: `${process.env.PUBLIC_URL}/group` },
      { name: ROUTE_GROUP_ADD, path: `${process.env.PUBLIC_URL}/group/add` },
      { name: ROUTE_GROUP_DETAIL, path: `${process.env.PUBLIC_URL}/group/view/:groupname` },
      { name: ROUTE_GROUP_EDIT, path: `${process.env.PUBLIC_URL}/group/edit/:groupCode` },
      { name: ROUTE_USER_AUTHORITY, path: `${process.env.PUBLIC_URL}/authority/:username` },
      { name: ROUTE_LABELS_ADD, path: `${process.env.PUBLIC_URL}/labels/add` },
      { name: ROUTE_LABELS_AND_LANGUAGES, path: `${process.env.PUBLIC_URL}/labels-languages` },
      { name: ROUTE_LABEL_ADD, path: `${process.env.PUBLIC_URL}/labels-languages/add` },
      { name: ROUTE_LABEL_EDIT, path: `${process.env.PUBLIC_URL}/labels-languages/edit/:labelCode` },
      { name: ROUTE_CATEGORY_LIST, path: `${process.env.PUBLIC_URL}/category` },
      { name: ROUTE_CATEGORY_ADD, path: `${process.env.PUBLIC_URL}/category/add` },
      { name: ROUTE_CATEGORY_EDIT, path: `${process.env.PUBLIC_URL}/category/edit/:categoryCode` },
      { name: ROUTE_CATEGORY_DETAIL, path: `${process.env.PUBLIC_URL}/category/detail/:categoryCode` },
      { name: ROUTE_ROLE_LIST, path: `${process.env.PUBLIC_URL}/role` },
      { name: ROUTE_ROLE_ADD, path: `${process.env.PUBLIC_URL}/role/add/` },
      { name: ROUTE_ROLE_EDIT, path: `${process.env.PUBLIC_URL}/role/edit/:roleCode` },
      { name: ROUTE_ROLE_DETAIL, path: `${process.env.PUBLIC_URL}/role/view/:roleCode` },
      { name: ROUTE_RELOAD_CONFIG, path: `${process.env.PUBLIC_URL}/reloadConfiguration` },
      { name: ROUTE_RELOAD_CONFIRM, path: `${process.env.PUBLIC_URL}/reloadConfiguration/confirm` },
      { name: ROUTE_PLUGIN_CONFIG_PAGE, path: `${process.env.PUBLIC_URL}/plugin/:pluginId/config` },
      { name: ROUTE_DATABASE_LIST, path: `${process.env.PUBLIC_URL}/database` },
      { name: ROUTE_DATABASE_ADD, path: `${process.env.PUBLIC_URL}/database/add` },
      { name: ROUTE_DATABASE_REPORT, path: `${process.env.PUBLIC_URL}/database/report/:dumpCode` },
      { name: ROUTE_DATABASE_DUMP_TABLE, path: `${process.env.PUBLIC_URL}/database/report/dumpTable/:dumpCode` },
      { name: ROUTE_FILE_BROWSER, path: `${process.env.PUBLIC_URL}/file-browser` },
      { name: ROUTE_FILE_BROWSER_UPLOAD, path: `${process.env.PUBLIC_URL}/file-browser/upload` },
      { name: ROUTE_FILE_BROWSER_CREATE_FOLDER, path: `${process.env.PUBLIC_URL}/file-browser/create-folder` },
      { name: ROUTE_FILE_BROWSER_CREATE_TEXT_FILE, path: `${process.env.PUBLIC_URL}/file-browser/create-text-file` },
    ],
    notFoundRoute: { name: 'notFound', path: `${process.env.PUBLIC_URL}/route-not-found` },
  },
);
