import store from 'state/store';
import { routerConfig } from 'frontend-common-components';


routerConfig(
  store,
  {
    mode: 'browser',
    routes: [
      { name: 'homePage', path: '/' },
      { name: 'fake', path: '/fake' },
    ],
    notFoundRoute: { name: 'notFound', path: '/route-not-found' },
  },
);
