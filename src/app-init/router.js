import store from 'state/store';
import { config as configRouter } from 'frontend-common-components/dist/router';


configRouter(
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
