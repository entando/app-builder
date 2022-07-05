export const LIST_MFE_RESPONSE_OK = [
  {
    id: '1a793414-d773-42ef-922e-00acafa43aa9',
    bundleId: '64c57c33',
    bundleCode: 'layout-core-bundle-id',
    bundleGroup: 'layout-core-bundle',
    widgetName: 'app-builder-header',
    widgetCode: '5dd5d520-f796-11ec-b939-0242ac120002',
    assets: ['main.js', 'main.css'],
    customElement: 'app-builder-header',
    descriptorExt: {
      slot: 'primary-header',
      nav: [],
      paths: ['route1', '/route2'],
    },
    systemParams: {
      api: {
        'ext-api': {
          url: '/service-id/simple-ms',
        },
      },
    },
  },
  {
    id: '9e343527-37bf-472e-aadc-a780613ceb88',
    bundleId: '64c57c33',
    bundleCode: 'layout-core-bundle-id',
    bundleGroup: 'layout-core-bundle',
    widgetName: 'app-builder-menu',
    widgetCode: '6e3e752a-f796-11ec-b939-0242ac120002',
    assets: ['main.js', 'main.css'],
    customElement: 'app-builder-menu',
    descriptorExt: {
      slot: 'primary-menu',
      nav: [],
      paths: [],
    },
    systemParams: {
      api: {
        'ext-api': {
          url: '/service-id/simple-ms',
        },
      },
    },
  },
  {
    id: '9f8b891d-fb54-4c37-87eb-0c48301afa16',
    bundleId: '64c57c33',
    bundleCode: 'strapi-content-template',
    bundleGroup: 'layout-core-bundle',
    widgetName: 'strapi-content-template',
    widgetCode: '769eb766-f796-11ec-b939-0242ac120002',
    assets: ['main.js', 'main.css'],
    customElement: 'strapi-content-template',
    descriptorExt: {
      slot: 'content',
      nav: [],
      paths: ['/'],
    },
    systemParams: {
      api: {
        'ext-api': {
          url: '/service-id/simple-ms',
        },
      },
    },
  },
  {
    widgetCode: 'example-mfe-widget-code',
    id: 'example-mfe',
    bundleGroup: 'example-mfe',
    bundleCode: 'example-mfe',
    bundleId: 'example-mfe-bundle-id',
    widgetName: 'example-mfe-name',
    descriptorExt: { slot: 'example-mfe-slot', paths: ['/'] },
    assets: ['main.js', 'main.css'],
    customElement: 'example-mfe',
    systemParams: {
      api: {
        'ext-api': {
          url: '/service-id/simple-ms',
        },
      },
    },
  },
  {
    widgetCode: 'example-mfe-2-widget-code',
    id: 'example   mfe    2 with spaces',
    bundleGroup: 'example-mfe-2',
    bundleCode: 'example-mfe-2',
    bundleId: 'example-mfe-2-bundle-id',
    widgetName: 'example-mfe-name-2',
    descriptorExt: { slot: 'example-mfe-slot-2', paths: ['/'] },
    assets: ['main.js', 'main.css'],
    customElement: 'example-mfe-2',
    systemParams: {
      api: {
        'ext-api': {
          url: '/service-id/simple-ms',
        },
      },
    },
  },
  {
    widgetCode: 'example-mfe-3-widget-code',
    id: 'example-mfe-3',
    bundleGroup: 'example-mfe-3',
    bundleCode: 'example-mfe-3',
    bundleId: 'example-mfe-3-bundle-id',
    widgetName: 'example-mfe-name-3',
    descriptorExt: { slot: 'example-mfe-slot-3' },
    assets: ['main.js', 'main.css'],
    customElement: 'example-mfe-3',
    systemParams: {
      api: {
        'ext-api': {
          url: '/service-id/simple-ms',
        },
      },
    },
  },
  {
    widgetCode: 'example-mfe-4-widget-code',
    bundleGroup: 'example-mfe-4-group',
    bundleCode: 'example-mfe-4-code',
    bundleId: 'example-mfe-4-bundle-id',
    widgetName: 'example-mfe-name-4',
    descriptorExt: { slot: 'example-mfe-slot-4', paths: ['/'] },
    assets: ['main.js', 'main.css'],
    customElement: 'example-mfe-4',
    systemParams: {
      api: {
        'ext-api': {
          url: '/service-id/simple-ms',
        },
      },
    },
  },
];

export const ADD_MFE_OK = {
  bundleGroup: 'entando-ab-core',
  bundleCode: 'entando-ab-core-navigation',
  bundleId: 'entando-ab-core-navigation-id',
  widgetCode: 'layout-core-bundle-widget-code',
  id: 'layout-core-bundle:app-builder-menu',
  widgetName: 'app-builder-menu',
  descriptorExt: { slot: 'primary-menu' },
  assets: ['main.js', 'main.css'],
  customElement: 'app-builder-menu',
  systemParams: {
    api: {
      'ext-api': {
        url: '/service-id/simple-ms',
      },
    },
  },
};

export const UPDATE_MFE_OK = {
  widgetCode: 'entando-ab-core-widget-code',
  bundleGroup: 'entando-ab-core',
  bundleCode: 'entando-ab-core-navigation',
  bundleId: 'entando-ab-core-navigation-id',
  id: 'layout-core-bundle:app-builder-menu',
  widgetName: 'app-builder-menu',
  descriptorExt: { slot: 'primary-menu' },
  assets: ['main.js', 'main.css'],
  customElement: 'app-builder-menu',
  systemParams: {
    api: {
      'ext-api': {
        url: '/service-id/simple-ms',
      },
    },
  },
};
