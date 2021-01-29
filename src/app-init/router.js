import { createBrowserHistory } from 'history';

export const history = createBrowserHistory({
  basename: process.env.PUBLIC_URL,
});

export const ROUTE_HOME = '/';
export const ROUTE_DASHBOARD = '/dashboard';
// page
export const ROUTE_PAGE_ADD = '/page/add';
export const ROUTE_PAGE_EDIT = '/page/edit/:pageCode';
export const ROUTE_PAGE_TREE = '/page';
export const ROUTE_PAGE_CLONE = '/page/clone';
export const ROUTE_PAGE_DETAIL = '/page/detail/:pageCode';
export const ROUTE_PAGE_SETTINGS = '/page/settings';
export const ROUTE_PAGE_CONFIG = '/page/configuration/:pageCode';
export const ROUTE_CLONE_WIDGET = '/page/:pageCode/clone/:frameId/widget/:parentCode/:widgetAction';
// page template
export const ROUTE_PAGE_TEMPLATE_LIST = '/page-template';
export const ROUTE_PAGE_TEMPLATE_ADD = '/page-template/add';
export const ROUTE_PAGE_TEMPLATE_EDIT = '/page-template/edit/:pageTemplateCode';
export const ROUTE_PAGE_TEMPLATE_CLONE = '/page-template/clone/:pageTemplateCode';
export const ROUTE_PAGE_TEMPLATE_DETAIL = '/page-template/view/:pageTemplateCode';
// widgets
export const ROUTE_WIDGET_LIST = '/widget';
export const ROUTE_WIDGET_ADD = '/widget/add';
export const ROUTE_WIDGET_EDIT = '/widget/edit/:widgetCode';
export const ROUTE_WIDGET_NEW_USERWIDGET = '/widget/new-user-widget/:widgetCode';
export const ROUTE_WIDGET_DETAIL = '/widget/detail/:widgetCode';
export const ROUTE_WIDGET_CONFIG = '/widget/config/:widgetCode/page/:pageCode/frame/:framePos';
// fragments
export const ROUTE_FRAGMENT_LIST = '/fragment';
export const ROUTE_FRAGMENT_ADD = '/fragment/add';
export const ROUTE_FRAGMENT_EDIT = '/fragment/edit/:fragmentCode';
export const ROUTE_FRAGMENT_DETAIL = '/fragment/view/:fragmentCode';
// data model
export const ROUTE_DATA_MODEL_LIST = '/datamodels';
export const ROUTE_DATA_MODEL_ADD = '/datamodels/add';
export const ROUTE_DATA_MODEL_EDIT = '/datamodels/edit/:dataModelId';
// data type
export const ROUTE_DATA_TYPE_LIST = '/datatype';
export const ROUTE_DATA_TYPE_ADD = '/dataTypeAdd';
export const ROUTE_DATA_TYPE_EDIT = '/datatype/edit/:datatypeCode';
// user
export const ROUTE_USER_LIST = '/user';
export const ROUTE_USER_ADD = '/user/add';
export const ROUTE_USER_EDIT = '/user/edit/:username';
export const ROUTE_USER_DETAIL = '/user/view/:username';
export const ROUTE_USER_RESTRICTIONS = '/user/restrictions';
export const ROUTE_USER_MY_PROFILE = '/myProfile';
// profiles
export const ROUTE_PROFILE_TYPE_LIST = '/profiletype';
export const ROUTE_PROFILE_TYPE_ADD = '/profiletype/add';
export const ROUTE_PROFILE_TYPE_EDIT = '/profiletype/edit/:profiletypeCode';
export const ROUTE_USER_AUTHORITY = '/authority/:username';
// groups
export const ROUTE_GROUP_LIST = '/group';
export const ROUTE_GROUP_ADD = '/group/add';
export const ROUTE_GROUP_EDIT = '/group/edit/:groupCode';
export const ROUTE_GROUP_DETAIL = '/group/view/:groupname';
// labels
export const ROUTE_LABELS_AND_LANGUAGES = '/labels-languages';
export const ROUTE_LABEL_ADD = '/labels-languages/add';
export const ROUTE_LABEL_EDIT = '/labels-languages/edit/:labelCode';
// categories
export const ROUTE_CATEGORY_LIST = '/category';
export const ROUTE_CATEGORY_ADD = '/category/add';
export const ROUTE_CATEGORY_EDIT = '/category/edit/:categoryCode';
export const ROUTE_CATEGORY_DETAIL = '/category/detail/:categoryCode';
// roles
export const ROUTE_ROLE_LIST = '/role';
export const ROUTE_ROLE_ADD = '/role/add';
export const ROUTE_ROLE_EDIT = '/role/edit/:roleCode';
export const ROUTE_ROLE_DETAIL = '/role/view/:roleCode';
// database
export const ROUTE_DATABASE_LIST = '/database';
export const ROUTE_DATABASE_ADD = '/database/add';
export const ROUTE_DATABASE_REPORT = '/database/report/:dumpCode';
export const ROUTE_DATABASE_DUMP_TABLE = '/database/report/dumpTable/:dumpCode/:datasource/:tableName';
// files
export const ROUTE_FILE_BROWSER = '/file-browser';
export const ROUTE_FILE_BROWSER_UPLOAD = '/file-browser/upload';
export const ROUTE_FILE_BROWSER_CREATE_FOLDER = '/file-browser/create-folder';
export const ROUTE_FILE_BROWSER_CREATE_TEXT_FILE = '/file-browser/create-text-file';
export const ROUTE_FILE_BROWSER_EDIT_TEXT_FILE = '/file-browser/edit/:filename';
// component repository
export const ROUTE_ECR_COMPONENT_LIST = '/component-repository';
export const ROUTE_ECR_CONFIG_LIST = '/component-repository/configuration';
export const ROUTE_ECR_CONFIG_EDIT = '/component-repository/configuration/edit/:server';
export const ROUTE_ECR_CONFIG_ADD = '/component-repository/configuration/add';
// plugins
export const ROUTE_PLUGIN_CONFIG_PAGE = '/plugins/config/:id';
export const ROUTE_PLUGINS = '/plugins';

// other
export const ROUTE_USER_PROFILE = '/userprofile/:username';
export const ROUTE_DATA_TYPE_ATTRIBUTE_ADD = '/datatype/attribute/:entityCode/add';
export const ROUTE_DATA_TYPE_ATTRIBUTE_EDIT = '/datatype/attribute/:entityCode/edit/:attributeCode';
export const ROUTE_PROFILE_TYPE_ATTRIBUTE_ADD = '/profiletype/attribute/:entityCode/add';
export const ROUTE_PROFILE_TYPE_ATTRIBUTE_EDIT = '/profiletype/attribute/:entityCode/edit/:attributeCode';
export const ROUTE_ATTRIBUTE_MONOLIST_ADD = '/datatype/attribute/:entityCode/MonolistAdd/:attributeCode';
export const ROUTE_ATTRIBUTE_MONOLIST_PROFILE_ADD = '/profiletype/attribute/:entityCode/MonolistAdd/:attributeCode';
export const ROUTE_RELOAD_CONFIG = '/reloadConfiguration';
export const ROUTE_RELOAD_CONFIRM = '/reloadConfiguration/confirm';

// cms versioning
export const ROUTE_CMS_VERSIONING = '/cms/versioning';
export const ROUTE_CMS_EDIT_CONTENT = '/cms/content/edit/:id';
export const ROUTE_CMS_DIGITAL_ASSETS = '/cms/assets';

// static pages
export const ROUTE_ABOUT = '/about';
export const ROUTE_LICENSE = '/license';
