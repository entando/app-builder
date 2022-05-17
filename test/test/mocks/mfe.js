export const LIST_MFE_RESPONSE_OK = [
  {
    id: 'app-builder-header',
    target: 'primary-header',
    name: 'app-builder-header',
    assets: ['mocks/app-builder-header/main.js', 'mocks/app-builder-header/main.css'],
    customElement: 'app-builder-header',
    params: {
      api: {
        headerMS: 'ms/app-builder-header-ms',
      },
    },
  },
  {
    id: 'app-builder-menu',
    target: 'primary-menu',
    name: 'app-builder-menu',
    assets: ['mocks/app-builder-menu/main.js', 'mocks/app-builder-menu/main.css'],
    customElement: 'app-builder-menu',
    params: {
      api: {
        headerMS: 'ms/app-builder-header-ms',
      },
    },
  },
  {
    id: 'example-mfe',
    target: 'content',
    name: 'content',
    assets: ['mocks/example-mfe/main.js', 'mocks/example-mfe/main.css'],
    customElement: 'example-mfe',
    params: {
      api: {
        headerMS: 'ms/app-builder-header-ms',
      },
    },
    activeRoutes: ['/example-mfe'],
  },
];

export const ADD_MFE_OK = {
  id: 'app-builder-header',
  target: 'primary-header',
  name: 'app-builder-header',
  assets: ['main.js', 'main.css'],
  customElement: 'app-builder-header',
  params: {
    api: {
      headerMS: 'ms/app-builder-header-ms',
    },
  },
};

export const UPDATE_MFE_OK = {
  id: 'app-builder-header',
  target: 'primary-header',
  name: 'app-builder-header',
  assets: ['main.js', 'main.css'],
  customElement: 'app-builder-header',
  params: {
    api: {
      headerMS: 'ms/app-builder-header-ms',
    },
  },
};
