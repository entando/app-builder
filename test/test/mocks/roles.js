export const LIST_ROLES_OK = [
  {
    name: 'content Editing',
    code: 'contentEditing',
  },
  {
    name: 'access To Admin',
    code: 'accessToAdmin',
  },
  {
    name: 'rating Editing',
    code: 'ratingEditing',
  },
  {
    name: 'manage Web Dynamic Forms',
    code: 'manageWebDynamicForms',
  },
  {
    name: 'operations On Resources',
    code: 'operationsOnResources',
  },
  {
    name: 'content Editing1',
    code: 'contentEditing1',
  },
  {
    name: 'access To Admin1',
    code: 'accessToAdmin1',
  },
  {
    name: 'rating Editing1',
    code: 'ratingEditing1',
  },
  {
    name: 'manage Web Dynamic Forms1',
    code: 'manageWebDynamicForms1',
  },
  {
    name: 'operations On Resources1',
    code: 'operationsOnResources1',
  },
];

export const GET_ROLE_PAYLOAD = {
  name: 'roleName',
  code: 'code',
  permissions: {
    contentEditing: true,
    accessToAdmin: false,
    ratingEditing: true,
    manageWebDynamicForms: true,
    operationsOnResources: true,
    viewUsersAndProfiles: false,
    userProfileEditing: true,
    commentEditing: true,
    newsletterConfig: false,
    operationsONCategories: false,
    userEditing: true,
    moderateComments: true,
    newsletterManagement: true,
    operationsOnPages: true,
    supervisionOfContent: true,
  },
};

export const BODY_OK = {
  name: 'New role',
  code: 'new_role',
};

export const ROLES_NORMALIZED = {
  roles: {
    list: [
      'contentEditing',
      'accessToAdmin',
      'ratingEditing',
      'manageWebDynamicForms',
      'operationsOnResources',
      'contentEditing1',
      'accessToAdmin1',
      'ratingEditing1',
      'manageWebDynamicForms1',
      'operationsOnResources1',

    ],
    map: {
      contentEditing: {
        name: 'content Editing',
        code: 'contentEditing',
      },
      accessToAdmin: {
        name: 'access To Admin',
        code: 'accessToAdmin',
      },
      ratingEditing: {
        name: 'rating Editing',
        code: 'ratingEditing',
      },
      manageWebDynamicForms: {
        name: 'manage Web Dynamic Forms',
        code: 'manageWebDynamicForms',
      },
      operationsOnResources: {
        name: 'operations On Resources',
        code: 'operationsOnResources',
      },
      contentEditing1: {
        name: 'content Editing1',
        code: 'contentEditing1',
      },
      accessToAdmin1: {
        name: 'access To Admin1',
        code: 'accessToAdmin1',
      },
      ratingEditing1: {
        name: 'rating Editing1',
        code: 'ratingEditing1',
      },
      manageWebDynamicForms1: {
        name: 'manage Web Dynamic Forms1',
        code: 'manageWebDynamicForms1',
      },
      operationsOnResources1: {
        name: 'operations On Resources1',
        code: 'operationsOnResources1',
      },
    },
  },
  pagination: {
    page: 2,
    pageSize: 5,
    lastPage: 2,
    totalItems: 10,
  },
};

export const BODY_ERROR =
{
  payload: {},
  errors: [
    {
      code: 1,
      message: 'what went wrong',
    },
  ],
  metaData: {},
};
