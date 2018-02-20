import store from 'state/store';
import { routerConfig } from 'frontend-common-components';


routerConfig(
  store,
  {
    mode: 'browser',
    routes: [
      { name: 'home', path: '/' },
      { name: 'dashboard', path: '/dashboard' },
      { name: 'widgetForm', path: '/widget/form' },
    ],
    notFoundRoute: { name: 'notFound', path: '/route-not-found' },
  },
);
