export const STANDARD_DEMO_MANAGE_USERS_FIRST = {
  name: 'standard-demo-manage-users-bundle',
  description: 'https://github.com/entando-samples/standard-demo-manage-users-bundle.git',
  gitRepoAddress: 'https://github.com/entando-samples/standard-demo-manage-users-bundle.git',
  dependencies: [
    '',
  ],
  bundleGroups: [],
  bundleId: '41',
};

export const STANDARD_DEMO_MANAGE_USERS_SECOND = {
  name: 'standard-demo-manage-users-bundle',
  description: 'https://github.com/entando-samples/standard-demo-manage-users-bundle.git',
  gitRepoAddress: 'https://github.com/entando-samples/standard-demo-manage-users-bundle.git',
  dependencies: [
    '',
  ],
  bundleGroups: [
    '42',
  ],
  bundleId: '43',
};

export const LIST_BUNDLES_FROM_REGISTRY_OK = [
  STANDARD_DEMO_MANAGE_USERS_FIRST,
  STANDARD_DEMO_MANAGE_USERS_SECOND,
];

export const LIST_REGISTRIES_OK = [
  {
    id: 'id1',
    name: 'Entando Public Hub',
    url: 'https://entando-publc-hub.com/api',
  },
  {
    id: 'id2',
    name: 'ACME Private Hub',
    url: 'https://acme-private-hub.com/api',
  },
];
