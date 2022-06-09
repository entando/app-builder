export const LIST_MFE_RESPONSE_OK = [
  {
    pbcName: 'entando-ab-core',
    bundleName: 'entando-ab-core-navigation',
    id: 'layout-core-bundle:app-builder-header',
    name: 'app-builder-header',
    slot: 'primary-header',
    assets: ['main.js', 'main.css'],
    customElement: 'app-builder-header',
    config: {
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
  },
  {
    id: 'app-builder-menu',
    slot: 'primary-menu',
    name: 'app-builder-menu',
    assets: ['http://localhost:4173/app-builder-menu.umd.js'],
    customElement: 'app-builder-menu',
    config: {
      api: {
        url: 'http://localhost:8080/menu-be-api',
      },
    },
  },
  {
    pbcName: 'entando-ab-core',
    bundleName: 'entando-ab-core-navigation',
    id: 'layout-core-bundle:app-builder-menu',
    name: 'app-builder-menu',
    slot: 'primary-menu',
    assets: ['main.js', 'main.css'],
    customElement: 'app-builder-menu',
    config: {
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
  },
  {
    pbcName: 'strapi',
    bundleName: 'strapi-bundle',
    name: 'strapi-content-template',
    slot: 'content',
    assets: ['main.js', 'main.css'],
    customElement: 'app-builder-menu',
    paths: ['/'],
    config: {
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
  },
  {
    id: 'example-mfe',
    pbcName: 'example-mfe',
    bundleName: 'example-mfe',
    name: 'example-mfe-name',
    slot: 'example-mfe-slot',
    assets: ['main.js', 'main.css'],
    customElement: 'example-mfe',
    paths: ['/'],
    config: {
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
  },
];

export const ADD_MFE_OK = {
  pbcName: 'entando-ab-core',
  bundleName: 'entando-ab-core-navigation',
  id: 'layout-core-bundle:app-builder-menu',
  name: 'app-builder-menu',
  slot: 'primary-menu',
  assets: ['main.js', 'main.css'],
  customElement: 'app-builder-menu',
  config: {
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
};

export const UPDATE_MFE_OK = {
  pbcName: 'entando-ab-core',
  bundleName: 'entando-ab-core-navigation',
  id: 'layout-core-bundle:app-builder-menu',
  name: 'app-builder-menu',
  slot: 'primary-menu',
  assets: ['main.js', 'main.css'],
  customElement: 'app-builder-menu',
  config: {
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
};
