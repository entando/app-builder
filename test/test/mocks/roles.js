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
    editContents: true,
    enterBackend: false,
    manageCategories: true,
    managePages: true,
    manageResources: true,
    superuser: false,
    validateContents: true,
  },
};

export const BODY_OK = {
  name: 'New role',
  code: 'new_role',
};

export const ROLE_USER_REFERENCES_PAYLOAD = [{
  username: 'editorCoach',
  registration: '2008-09-25',
  lastLogin: '2009-07-02',
  lastPasswordChange: '2018-04-12',
  status: 'active',
  accountNotExpired: true,
  credentialsNotExpired: true,
  profileAttributes: {
    birthdate: '1945-03-01 00:00:00',
    boolean2: false,
    language: 'it',
    fullname: 'Rick Bobonsky',
    boolean1: false,
    email: 'rick.bobonsky@mailinator.com',
  },
  maxMonthsSinceLastAccess: -1,
  maxMonthsSinceLastPasswordChange: -1,
}];

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
    selected: {
      ...GET_ROLE_PAYLOAD,
      userReferences: ROLE_USER_REFERENCES_PAYLOAD,
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
