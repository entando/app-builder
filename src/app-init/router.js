import { routerConfig } from 'frontend-common-components';

import store from 'state/store';

export const ROUTE_HOME = 'home';
export const ROUTE_DASHBOARD = 'dashboard';
export const ROUTE_USER_PROFILE = 'userprofile';
export const ROUTE_PAGE = 'page';
export const ROUTE_PAGE_ADD = 'pageAdd';
export const ROUTE_PAGE_EDIT = 'pageEdit';
export const ROUTE_PAGE_TREE = 'pageTree';
export const ROUTE_PAGE_SETTINGS = 'pageSettings';
export const ROUTE_PAGE_CONFIG = 'pageConfiguration';
export const ROUTE_CONTENT = 'content';
export const ROUTE_WIDGET = 'widget';
export const ROUTE_WIDGET_LIST = 'widgetList';
export const ROUTE_WIDGET_ADD = 'widgetForm';
export const ROUTE_WIDGET_EDIT = 'widgetEdit';
export const ROUTE_FRAGMENT_LIST = 'fragmentList';
export const ROUTE_FRAGMENT_ADD = 'fragmentAdd';
export const ROUTE_FRAGMENT_EDIT = 'fragmentEdit';
export const ROUTE_FRAGMENT_DETAIL = 'fragmentDetail';
export const ROUTE_DATA_MODEL_ADD = 'dataModelAdd';
export const ROUTE_DATA_TYPE_LIST = 'dataTypeList';
export const ROUTE_DATA_TYPE_EDIT = 'dataTypeEdit';


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
      { name: ROUTE_PAGE, path: '/page/view/:page' },
      { name: ROUTE_PAGE_EDIT, path: '/page/edit/:pageCode' },
      { name: ROUTE_PAGE_SETTINGS, path: '/page/settings' },
      { name: ROUTE_PAGE_CONFIG, path: '/page/configuration/:pageCode' },
      { name: ROUTE_WIDGET_LIST, path: '/widget' },
      { name: ROUTE_WIDGET_ADD, path: '/widget/add' },
      { name: ROUTE_WIDGET_EDIT, path: '/widget/edit/:widgetCode' },
      { name: ROUTE_WIDGET, path: '/widget/view/:widget' },
      { name: ROUTE_FRAGMENT_LIST, path: '/fragment' },
      { name: ROUTE_FRAGMENT_ADD, path: '/fragment/add' },
      { name: ROUTE_FRAGMENT_EDIT, path: '/fragment/edit/:fragmentCode' },
      { name: ROUTE_FRAGMENT_DETAIL, path: '/fragment/view/:fragmentCode' },
      { name: ROUTE_DATA_MODEL_ADD, path: '/datamodel/add' },
      { name: ROUTE_DATA_TYPE_LIST, path: '/datatype' },
      // use when edit route when component will be available
      { name: ROUTE_DATA_TYPE_EDIT, path: '/datatype/edit/:datatypeCode' },
    ],
    notFoundRoute: { name: 'notFound', path: '/route-not-found' },
  },
);
