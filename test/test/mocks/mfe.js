export const LIST_MFE_RESPONSE_OK = [
  {
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
  },
  {
    id: 'app-builder-menu',
    target: 'primary-menu',
    name: 'app-builder-menu',
    assets: ['main.js', 'main.css'],
    customElement: 'app-builder-menu',
    params: {
      api: {
        headerMS: 'ms/app-builder-header-ms',
      },
    },
  },
  {
    id: 'strapi-content-template',
    target: 'content',
    name: 'content',
    assets: ['main.js', 'main.css'],
    customElement: 'strapi-content',
    params: {
      api: {
        headerMS: 'ms/app-builder-header-ms',
      },
    },
    activeRoutes: ['/strapi-content'],
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
