import store from 'state/store';
import { routerConfig } from 'frontend-common-components';


routerConfig(
  store,
  {
    mode: 'browser',
    routes: [
      { name: 'home', path: '/' },
      { name: 'dashboard', path: '/dashboard' },
      { name: 'userprofile', path: '/userprofile/:username' },
      { name: 'page', path: '/page/:page' },
      { name: 'content', path: '/content/:content/frame/:frame' },
      { name: 'widget', path: '/widget/:widget' },
    ],
    notFoundRoute: { name: 'notFound', path: '/route-not-found' },
  },
);
