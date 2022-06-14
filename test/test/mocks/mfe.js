export const LIST_MFE_RESPONSE_OK = [
  {
    id: 'layout-core-bundle:app-builder-header',
    name: 'app-builder-header',
    slot: 'primary-header',
    assets: ['main.js'],
    customElement: 'app-builder-header',
    api: [
      {
        name: 'ms1',
        baseUrl: 'http://localhost:8080',
      },
      {
        name: 'ms2',
        baseUrl: 'http://localhost:8090',
      },
    ],
  },
  {
    id: 'app-builder-menu',
    slot: 'primary-menu',
    name: 'app-builder-menu',
    assets: ['http://localhost:4173/app-builder-menu.umd.js'],
    customElement: 'app-builder-menu',
    api: {
      url: 'http://localhost:8080/menu-be-api',
    },
  },
  {
    id: 'example-mfe',
    name: 'content',
    slot: 'content',
    assets: ['mocks/example-mfe/main.js'],
    customElement: 'example-mfe',
    paths: ['/example-mfe'],
    api: [
      {
        name: 'ms/app-builder-header-ms',
        baseUrl: 'http://localhost:8080',
      },
      {
        name: 'ms2',
        baseUrl: 'http://localhost:8090',
      },
    ],
  },
];

export const ADD_MFE_OK = {
  id: 'app-builder-header',
  slot: 'primary-header',
  name: 'app-builder-header',
  assets: ['main.js'],
  customElement: 'app-builder-header',
  api: {
    name: 'ms1',
    baseUrl: 'http://localhost:8080',
  },
};

export const UPDATE_MFE_OK = {
  id: 'app-builder-header',
  slot: 'primary-header',
  name: 'app-builder-header',
  assets: ['main.js'],
  customElement: 'app-builder-header',
  api: {
    name: 'ms1',
    baseUrl: 'http://localhost:8080',
  },
};
