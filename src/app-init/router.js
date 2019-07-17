import { routerConfig } from '@entando/router';

import store from 'state/store';

export const ROUTE_HOME = 'home';
export const ROUTE_DASHBOARD = 'dashboard';
export const ROUTE_CMS = 'cms';
export const ROUTE_CMS_CONTENT_LIST = 'cmsContentList';
export const ROUTE_CMS_CONTENT_TYPES = 'cmsContentTypes';
export const ROUTE_CMS_CONTENT_MODELS = 'cmsContentModels';
export const ROUTE_CMS_CONTENT_SETTINGS = 'cmsContentSettings';
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
export const ROUTE_PLUGINS = 'plugins';

const publicUrl = process.env.PUBLIC_URL;

routerConfig(
  store,
  {
    mode: 'browser',
    routes: [
      { name: ROUTE_HOME, path: `${publicUrl}/` },
      { name: ROUTE_DASHBOARD, path: `${publicUrl}/dashboard` },
      { name: ROUTE_USER_PROFILE, path: `${publicUrl}/userprofile/:username` },
      { name: ROUTE_CMS, path: `${publicUrl}/cms` },
      { name: ROUTE_CMS_CONTENT_LIST, path: `${publicUrl}/cms/content` },
      { name: ROUTE_CMS_CONTENT_TYPES, path: `${publicUrl}/cms/content-type` },
      { name: ROUTE_CMS_CONTENT_MODELS, path: `${publicUrl}/cms/content-model` },
      { name: ROUTE_CMS_CONTENT_SETTINGS, path: `${publicUrl}/cms/content-settings` },
      { name: ROUTE_PAGE_TREE, path: `${publicUrl}/page` },
      { name: ROUTE_PAGE_ADD, path: `${publicUrl}/page/add` },
      { name: ROUTE_PAGE_CLONE, path: `${publicUrl}/page/clone` },
      { name: ROUTE_PAGE_DETAIL, path: `${publicUrl}/page/detail/:pageCode` },
      { name: ROUTE_PAGE, path: `${publicUrl}/page/view/:page` },
      { name: ROUTE_PAGE_EDIT, path: `${publicUrl}/page/edit/:pageCode` },
      { name: ROUTE_PAGE_SETTINGS, path: `${publicUrl}/page/settings` },
      { name: ROUTE_PAGE_CONFIG, path: `${publicUrl}/page/configuration/:pageCode` },
      { name: ROUTE_PAGE_MODEL_LIST, path: `${publicUrl}/page-model` },
      { name: ROUTE_PAGE_MODEL_ADD, path: `${publicUrl}/page-model/add` },
      { name: ROUTE_PAGE_MODEL_EDIT, path: `${publicUrl}/page-model/edit/:pageModelCode` },
      { name: ROUTE_PAGE_MODEL_DETAIL, path: `${publicUrl}/page-model/view/:pageModelCode` },
      { name: ROUTE_WIDGET_LIST, path: `${publicUrl}/widget` },
      { name: ROUTE_WIDGET_ADD, path: `${publicUrl}/widget/add` },
      { name: ROUTE_WIDGET_EDIT, path: `${publicUrl}/widget/edit/:widgetCode` },
      { name: ROUTE_WIDGET, path: `${publicUrl}/widget/view/:widget` },
      { name: ROUTE_WIDGET_CONFIG, path: `${publicUrl}/widget/config/:widgetCode/page/:pageCode/frame/:framePos` },
      { name: ROUTE_WIDGET_DETAIL, path: `${publicUrl}/widget/detail/:widgetCode` },
      { name: ROUTE_FRAGMENT_LIST, path: `${publicUrl}/fragment` },
      { name: ROUTE_FRAGMENT_ADD, path: `${publicUrl}/fragment/add` },
      { name: ROUTE_FRAGMENT_EDIT, path: `${publicUrl}/fragment/edit/:fragmentCode` },
      { name: ROUTE_FRAGMENT_DETAIL, path: `${publicUrl}/fragment/view/:fragmentCode` },
      { name: ROUTE_DATA_MODEL_LIST, path: `${publicUrl}/datamodels` },
      { name: ROUTE_DATA_MODEL_ADD, path: `${publicUrl}/datamodels/add` },
      { name: ROUTE_DATA_MODEL_EDIT, path: `${publicUrl}/datamodels/edit/:dataModelId` },
      { name: ROUTE_DATA_TYPE_LIST, path: `${publicUrl}/datatype` },
      { name: ROUTE_DATA_TYPE_ADD, path: `${publicUrl}/datatype/add` },
      { name: ROUTE_DATA_TYPE_EDIT, path: `${publicUrl}/datatype/edit/:datatypeCode` },
      { name: ROUTE_DATA_TYPE_ATTRIBUTE_ADD, path: `${publicUrl}/datatype/attribute/:entityCode/add` },
      { name: ROUTE_DATA_TYPE_ATTRIBUTE_EDIT, path: `${publicUrl}/datatype/attribute/:entityCode/edit/:attributeCode` },
      { name: ROUTE_ATTRIBUTE_MONOLIST_ADD, path: `${publicUrl}/datatype/attribute/:entityCode/MonolistAdd/:attributeCode` },
      { name: ROUTE_PROFILE_TYPE_LIST, path: `${publicUrl}/profiletype` },
      { name: ROUTE_PROFILE_TYPE_ADD, path: `${publicUrl}/profiletype/add` },
      { name: ROUTE_PROFILE_TYPE_EDIT, path: `${publicUrl}/profiletype/edit/:profiletypeCode` },
      { name: ROUTE_PROFILE_TYPE_ATTRIBUTE_ADD, path: `${publicUrl}/profiletype/attribute/:entityCode/add` },
      { name: ROUTE_PROFILE_TYPE_ATTRIBUTE_EDIT, path: `${publicUrl}/profiletype/attribute/:entityCode/edit/:attributeCode` },
      { name: ROUTE_ATTRIBUTE_MONOLIST_PROFILE_ADD, path: `${publicUrl}/profiletype/attribute/:entityCode/MonolistAdd/:attributeCode` },
      { name: ROUTE_USER_LIST, path: `${publicUrl}/user` },
      { name: ROUTE_USER_ADD, path: `${publicUrl}/user/add` },
      { name: ROUTE_USER_EDIT, path: `${publicUrl}/user/edit/:username` },
      { name: ROUTE_USER_DETAIL, path: `${publicUrl}/user/view/:username` },
      { name: ROUTE_USER_RESTRICTIONS, path: `${publicUrl}/user/restrictions` },
      { name: ROUTE_USER_MY_PROFILE, path: `${publicUrl}/myProfile` },
      { name: ROUTE_GROUP_LIST, path: `${publicUrl}/group` },
      { name: ROUTE_GROUP_ADD, path: `${publicUrl}/group/add` },
      { name: ROUTE_GROUP_DETAIL, path: `${publicUrl}/group/view/:groupname` },
      { name: ROUTE_GROUP_EDIT, path: `${publicUrl}/group/edit/:groupCode` },
      { name: ROUTE_USER_AUTHORITY, path: `${publicUrl}/authority/:username` },
      { name: ROUTE_LABELS_ADD, path: `${publicUrl}/labels/add` },
      { name: ROUTE_LABELS_AND_LANGUAGES, path: `${publicUrl}/labels-languages` },
      { name: ROUTE_LABEL_ADD, path: `${publicUrl}/labels-languages/add` },
      { name: ROUTE_LABEL_EDIT, path: `${publicUrl}/labels-languages/edit/:labelCode` },
      { name: ROUTE_CATEGORY_LIST, path: `${publicUrl}/category` },
      { name: ROUTE_CATEGORY_ADD, path: `${publicUrl}/category/add` },
      { name: ROUTE_CATEGORY_EDIT, path: `${publicUrl}/category/edit/:categoryCode` },
      { name: ROUTE_CATEGORY_DETAIL, path: `${publicUrl}/category/detail/:categoryCode` },
      { name: ROUTE_ROLE_LIST, path: `${publicUrl}/role` },
      { name: ROUTE_ROLE_ADD, path: `${publicUrl}/role/add/` },
      { name: ROUTE_ROLE_EDIT, path: `${publicUrl}/role/edit/:roleCode` },
      { name: ROUTE_ROLE_DETAIL, path: `${publicUrl}/role/view/:roleCode` },
      { name: ROUTE_RELOAD_CONFIG, path: `${publicUrl}/reloadConfiguration` },
      { name: ROUTE_RELOAD_CONFIRM, path: `${publicUrl}/reloadConfiguration/confirm` },
      { name: ROUTE_PLUGIN_CONFIG_PAGE, path: `${publicUrl}/plugins/config/:id` },
      { name: ROUTE_DATABASE_LIST, path: `${publicUrl}/database` },
      { name: ROUTE_DATABASE_ADD, path: `${publicUrl}/database/add` },
      { name: ROUTE_DATABASE_REPORT, path: `${publicUrl}/database/report/:dumpCode` },
      { name: ROUTE_DATABASE_DUMP_TABLE, path: `${publicUrl}/database/report/dumpTable/:dumpCode` },
      { name: ROUTE_FILE_BROWSER, path: `${publicUrl}/file-browser` },
      { name: ROUTE_FILE_BROWSER_UPLOAD, path: `${publicUrl}/file-browser/upload` },
      { name: ROUTE_FILE_BROWSER_CREATE_FOLDER, path: `${publicUrl}/file-browser/create-folder` },
      { name: ROUTE_FILE_BROWSER_CREATE_TEXT_FILE, path: `${publicUrl}/file-browser/create-text-file` },
      { name: ROUTE_FILE_BROWSER_EDIT_TEXT_FILE, path: `${publicUrl}/file-browser/edit/:filename` },
      { name: ROUTE_DE_COMPONENT_LIST, path: `${publicUrl}/digital-exchange` },
      { name: ROUTE_DE_CONFIG_LIST, path: `${publicUrl}/digital-exchange/configuration` },
      { name: ROUTE_DE_CONFIG_EDIT, path: `${publicUrl}/digital-exchange/configuration/edit/:server` },
      { name: ROUTE_DE_CONFIG_ADD, path: `${publicUrl}/digital-exchange/configuration/add` },
      { name: ROUTE_PLUGINS, path: `${publicUrl}/plugins` },
    ],
    notFoundRoute: { name: 'notFound', path: `${publicUrl}/route-not-found` },
  },
);
