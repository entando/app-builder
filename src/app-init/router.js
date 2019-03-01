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
export const ROUTE_WIDGET_DETAIL = 'widgetDetail';
export const ROUTE_FRAGMENT_LIST = 'fragmentList';
export const ROUTE_FRAGMENT_ADD = 'fragmentAdd';
export const ROUTE_FRAGMENT_EDIT = 'fragmentEdit';
export const ROUTE_FRAGMENT_DETAIL = 'fragmentDetail';
export const ROUTE_DATA_MODEL_ADD = 'dataModelsAdd';
export const ROUTE_DATA_MODEL_EDIT = 'dataModelsEdit';
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
export const ROUTE_FILE_BROWSER_EDIT_TEXT_FILE = 'fileBrowserPageEditFile';
export const ROUTE_DE_COMPONENT_LIST = 'digitalExchangeComponentList';
export const ROUTE_DE_CONFIG_LIST = 'digitalExchangeConfigList';
export const ROUTE_DE_CONFIG_EDIT = 'digitalExchangeConfigEdit';
export const ROUTE_DE_CONFIG_ADD = 'digitalExchangeConfigAdd';

routerConfig(
  store,
  {
    mode: 'browser',
    routes: [
      { name: ROUTE_HOME, path: '/' },
      { name: ROUTE_DASHBOARD, path: '/dashboard' },
      { name: ROUTE_USER_PROFILE, path: '/userprofile/:username' },
      { name: ROUTE_PAGE_TREE, path: '/page' },
      { name: ROUTE_PAGE_ADD, path: '/page/add' },
      { name: ROUTE_PAGE_CLONE, path: '/page/clone' },
      { name: ROUTE_PAGE_DETAIL, path: '/page/detail/:pageCode' },
      { name: ROUTE_PAGE, path: '/page/view/:page' },
      { name: ROUTE_PAGE_EDIT, path: '/page/edit/:pageCode' },
      { name: ROUTE_PAGE_SETTINGS, path: '/page/settings' },
      { name: ROUTE_PAGE_CONFIG, path: '/page/configuration/:pageCode' },
      { name: ROUTE_PAGE_MODEL_LIST, path: '/page-model' },
      { name: ROUTE_PAGE_MODEL_ADD, path: '/page-model/add' },
      { name: ROUTE_PAGE_MODEL_EDIT, path: '/page-model/edit/:pageModelCode' },
      { name: ROUTE_PAGE_MODEL_DETAIL, path: '/page-model/view/:pageModelCode' },
      { name: ROUTE_WIDGET_LIST, path: '/widget' },
      { name: ROUTE_WIDGET_ADD, path: '/widget/add' },
      { name: ROUTE_WIDGET_EDIT, path: '/widget/edit/:widgetCode' },
      { name: ROUTE_WIDGET, path: '/widget/view/:widget' },
      { name: ROUTE_WIDGET_CONFIG, path: '/widget/config/:widgetCode/page/:pageCode/frame/:framePos' },
      { name: ROUTE_WIDGET_DETAIL, path: '/widget/detail/:widgetCode' },
      { name: ROUTE_FRAGMENT_LIST, path: '/fragment' },
      { name: ROUTE_FRAGMENT_ADD, path: '/fragment/add' },
      { name: ROUTE_FRAGMENT_EDIT, path: '/fragment/edit/:fragmentCode' },
      { name: ROUTE_FRAGMENT_DETAIL, path: '/fragment/view/:fragmentCode' },
      { name: ROUTE_DATA_MODEL_LIST, path: '/datamodels' },
      { name: ROUTE_DATA_MODEL_ADD, path: '/datamodels/add' },
      { name: ROUTE_DATA_MODEL_EDIT, path: '/datamodels/edit/:dataModelId' },
      { name: ROUTE_DATA_TYPE_LIST, path: '/datatype' },
      { name: ROUTE_DATA_TYPE_ADD, path: '/datatype/add' },
      { name: ROUTE_DATA_TYPE_EDIT, path: '/datatype/edit/:datatypeCode' },
      { name: ROUTE_DATA_TYPE_ATTRIBUTE_ADD, path: '/datatype/attribute/:entityCode/add' },
      { name: ROUTE_DATA_TYPE_ATTRIBUTE_EDIT, path: '/datatype/attribute/:entityCode/edit/:attributeCode' },
      { name: ROUTE_ATTRIBUTE_MONOLIST_ADD, path: '/datatype/attribute/:entityCode/MonolistAdd/:attributeCode' },
      { name: ROUTE_PROFILE_TYPE_LIST, path: '/profiletype' },
      { name: ROUTE_PROFILE_TYPE_ADD, path: '/profiletype/add' },
      { name: ROUTE_PROFILE_TYPE_EDIT, path: '/profiletype/edit/:profiletypeCode' },
      { name: ROUTE_PROFILE_TYPE_ATTRIBUTE_ADD, path: '/profiletype/attribute/:entityCode/add' },
      { name: ROUTE_PROFILE_TYPE_ATTRIBUTE_EDIT, path: '/profiletype/attribute/:entityCode/edit/:attributeCode' },
      { name: ROUTE_ATTRIBUTE_MONOLIST_PROFILE_ADD, path: '/profiletype/attribute/:entityCode/MonolistAdd/:attributeCode' },
      { name: ROUTE_USER_LIST, path: '/user' },
      { name: ROUTE_USER_ADD, path: '/user/add' },
      { name: ROUTE_USER_EDIT, path: '/user/edit/:username' },
      { name: ROUTE_USER_DETAIL, path: '/user/view/:username' },
      { name: ROUTE_USER_RESTRICTIONS, path: '/user/restrictions' },
      { name: ROUTE_USER_MY_PROFILE, path: '/myProfile' },
      { name: ROUTE_GROUP_LIST, path: '/group' },
      { name: ROUTE_GROUP_ADD, path: '/group/add' },
      { name: ROUTE_GROUP_DETAIL, path: '/group/view/:groupname' },
      { name: ROUTE_GROUP_EDIT, path: '/group/edit/:groupCode' },
      { name: ROUTE_USER_AUTHORITY, path: '/authority/:username' },
      { name: ROUTE_LABELS_ADD, path: '/labels/add' },
      { name: ROUTE_LABELS_AND_LANGUAGES, path: '/labels-languages' },
      { name: ROUTE_LABEL_ADD, path: '/labels-languages/add' },
      { name: ROUTE_LABEL_EDIT, path: '/labels-languages/edit/:labelCode' },
      { name: ROUTE_CATEGORY_LIST, path: '/category' },
      { name: ROUTE_CATEGORY_ADD, path: '/category/add' },
      { name: ROUTE_CATEGORY_EDIT, path: '/category/edit/:categoryCode' },
      { name: ROUTE_CATEGORY_DETAIL, path: '/category/detail/:categoryCode' },
      { name: ROUTE_ROLE_LIST, path: '/role' },
      { name: ROUTE_ROLE_ADD, path: '/role/add/' },
      { name: ROUTE_ROLE_EDIT, path: '/role/edit/:roleCode' },
      { name: ROUTE_ROLE_DETAIL, path: '/role/view/:roleCode' },
      { name: ROUTE_RELOAD_CONFIG, path: '/reloadConfiguration' },
      { name: ROUTE_RELOAD_CONFIRM, path: '/reloadConfiguration/confirm' },
      { name: ROUTE_PLUGIN_CONFIG_PAGE, path: '/plugin/:pluginId/config' },
      { name: ROUTE_DATABASE_LIST, path: '/database' },
      { name: ROUTE_DATABASE_ADD, path: '/database/add' },
      { name: ROUTE_DATABASE_REPORT, path: '/database/report/:dumpCode' },
      { name: ROUTE_DATABASE_DUMP_TABLE, path: '/database/report/dumpTable/:dumpCode' },
      { name: ROUTE_FILE_BROWSER, path: '/file-browser' },
      { name: ROUTE_FILE_BROWSER_UPLOAD, path: '/file-browser/upload' },
      { name: ROUTE_FILE_BROWSER_CREATE_FOLDER, path: '/file-browser/create-folder' },
      { name: ROUTE_FILE_BROWSER_CREATE_TEXT_FILE, path: '/file-browser/create-text-file' },
      { name: ROUTE_FILE_BROWSER_EDIT_TEXT_FILE, path: '/file-browser/edit/:filename' },
      { name: ROUTE_DE_COMPONENT_LIST, path: '/digital-exchange' },
      { name: ROUTE_DE_CONFIG_LIST, path: '/digital-exchange/configuration' },
      { name: ROUTE_DE_CONFIG_EDIT, path: '/digital-exchange/configuration/edit/:server' },
      { name: ROUTE_DE_CONFIG_ADD, path: '/digital-exchange/configuration/add' },
    ],
    notFoundRoute: { name: 'notFound', path: '/route-not-found' },
  },
);
