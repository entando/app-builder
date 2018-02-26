import store from 'state/store';
import { routerConfig } from 'frontend-common-components';

export const ROUTE_HOME = 'home';
export const ROUTE_DASHBOARD = 'dashboard';
export const ROUTE_USER_PROFILE = 'userprofile';
export const ROUTE_PAGE = 'page';
export const ROUTE_CONTENT = 'content';
export const ROUTE_WIDGET = 'widget';
export const ROUTE_WIDGET_FORM = 'widgetForm';
export const ROUTE_WIDGET_EDIT = 'widgetEdit';
export const ROUTE_PAGE_TREE = 'pageTree';
export const ROUTE_FRAGMENT = 'fragment';

routerConfig(
  store,
  {
    mode: 'browser',
    routes: [
      { name: ROUTE_HOME, path: '/' },
      { name: ROUTE_DASHBOARD, path: '/dashboard' },
      { name: ROUTE_USER_PROFILE, path: '/userprofile/:username' },
      { name: ROUTE_PAGE, path: '/page/:page' },
      { name: ROUTE_CONTENT, path: '/content/:content/frame/:frame' },
      { name: ROUTE_WIDGET, path: '/widget/:widget' },
      { name: ROUTE_WIDGET_FORM, path: '/widget/form' },
      { name: ROUTE_WIDGET_EDIT, path: '/widget/edit/:widgetCode' },
      { name: ROUTE_PAGE_TREE, path: '/page-tree' },
      { name: ROUTE_FRAGMENT, path: '/fragment' },
    ],
    notFoundRoute: { name: 'notFound', path: '/route-not-found' },
  },
);
