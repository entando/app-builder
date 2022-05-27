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
    id: 'example-mfe-menu',
    slot: 'primary-menu',
    name: 'example-mfe-menu',
    assets: ['mocks/example-mfe-menu/main.js'],
    customElement: 'example-mfe-menu',
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
