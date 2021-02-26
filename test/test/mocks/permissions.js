export const LIST_PERMISSIONS_OK = [
  {
    code: 'editContents',
    descr: 'content Editing',
  },
  {
    code: 'enterBackend',
    descr: 'access To Admin',
  },
  {
    code: 'manageCategories',
    descr: 'manage Categories',
  },
  {
    code: 'managePages',
    descr: 'manage Pages',
  },
  {
    code: 'manageResources',
    descr: 'operations On Resources',
  },
  {
    code: 'superuser',
    descr: 'All permissions',
  },
  {
    code: 'validateContents',
    descr: 'validate Contents',
  },
];

export const PERMISSIONS_NORMALIZED = {
  permissions: {
    list: [
      'editContents',
      'enterBackend',
      'manageCategories',
      'managePages',
      'manageResources',
      'superuser',
      'validateContents',
    ],
    map: {
      editContents: {
        descr: 'content Editing',
        code: 'editContents',
      },
      enterBackend: {
        descr: 'access To Admin',
        code: 'enterBackend',
      },
      manageCategories: {
        descr: 'manage Categories',
        code: 'manageCategories',
      },
      managePages: {
        descr: 'manage Pages',
        code: 'managePages',
      },
      manageResources: {
        descr: 'operations On Resources',
        code: 'manageResources',
      },
      superuser: {
        descr: 'All permissions',
        code: 'superuser',
      },
      validateContents: {
        descr: 'validate Contents',
        code: 'validateContents',
      },
    },
    pagination: {
      page: 2,
      pageSize: 5,
      lastPage: 2,
      totalItems: 7,
    },
  },
  loading: { permissions: false },
};

export const BODY_ERROR =
{
  payload: [],
  errors: [
    {
      code: 1,
      message: 'what went wrong',
    },
  ],
  metaData: {},
};

export const MYPERMISSIONS_STATE = {
  permissions: {
    loggedUser: ['role2', 'role1'],
  },
};

export const LIST_MY_GROUP_PERMISSIONS_OK = [
  {
    group: 'administrators',
    permissions: ['superuser'],
  },
  {
    group: 'account_executive',
    permissions: ['managePages'],
  },
  {
    group: 'bpm_admin',
    permissions: ['editContents'],
  },
];
