// status property added, waiting for confirmation from BE
export const ERROR = {
  payload: [],
  errors: [
    {
      code: 1,
      message: 'what went wrong',
    },
  ],
  metaData: {
    page: 1,
    pageSize: 100,
    lastPage: 10,
  },
};

export const USER = {
  username: 'login',
  registration: '2018-01-08 00:00:00',
  lastLogin: '2018-01-08 00:00:00',
  lastPasswordChange: '2018-01-08 00:00:00',
  status: 'active',
  passwordChangeRequired: true,
  profileAttributes: {
    fullName: '',
    email: '',
  },
  accountNotExpired: true,
  credentialsNotExpired: true,
};

export const USERS = [
  {
    username: 'admin',
    registration: '2018-01-08 00:00:00',
    lastLogin: '2018-01-08 00:00:00',
    lastPasswordChange: '2018-01-08 00:00:00',
    status: 'active',
    passwordChangeRequired: true,
    profileAttributes: {
      fullName: 'admin',
      email: 'admin@entando.com',
    },
    accountNotExpired: true,
    credentialsNotExpired: true,
  },
  {
    username: 'user1',
    registration: '2018-01-08 00:00:00',
    lastLogin: '2018-01-08 00:00:00',
    lastPasswordChange: '2018-01-08 00:00:00',
    status: 'disabled',
    passwordChangeRequired: true,
    profileAttributes: {
      fullName: 'User Name',
      email: 'user1@entando.com',
    },
    accountNotExpired: true,
    credentialsNotExpired: true,
  },
  {
    username: 'user2',
    registration: '2018-01-08 00:00:00',
    lastLogin: '2018-01-08 00:00:00',
    lastPasswordChange: '2018-01-08 00:00:00',
    status: 'active',
    passwordChangeRequired: true,
    profileAttributes: {
      fullName: 'User Name2',
      email: 'user2@entando.com',
    },
    accountNotExpired: true,
    credentialsNotExpired: true,
  },
  {
    username: 'user3',
    registration: '2018-01-08 00:00:00',
    lastLogin: '2018-01-08 00:00:00',
    lastPasswordChange: '2018-01-08 00:00:00',
    status: 'active',
    passwordChangeRequired: true,
    profileAttributes: {
      fullName: 'User Name3',
      email: 'user3@entando.com',
    },
    accountNotExpired: true,
    credentialsNotExpired: true,
  },
  {
    username: 'user4',
    registration: '2018-01-08 00:00:00',
    lastLogin: '2018-01-08 00:00:00',
    lastPasswordChange: '2018-01-08 00:00:00',
    status: 'active',
    passwordChangeRequired: true,
    profileAttributes: {
      fullName: 'User Name4',
      email: 'user4@entando.com',
    },
    accountNotExpired: false,
    credentialsNotExpired: true,
  },
  {
    username: 'user5',
    registration: '2018-01-08 00:00:00',
    lastLogin: '2018-01-08 00:00:00',
    lastPasswordChange: '2018-01-08 00:00:00',
    status: 'active',
    passwordChangeRequired: true,
    profileAttributes: {
      fullName: 'User Name5',
      email: 'user5@entando.com',
    },
    accountNotExpired: true,
    credentialsNotExpired: false,
  },
];

export const USERS_NORMALIZED = {
  list: ['admin', 'user1', 'user2', 'user3', 'user4', 'user5'],
  map: {
    admin: {
      username: 'admin',
      registration: '2018-01-08 00:00:00',
      lastLogin: '2018-01-08 00:00:00',
      lastPasswordChange: '2018-01-08 00:00:00',
      status: 'active',
      passwordChangeRequired: true,
      profileAttributes: {
        fullName: 'admin',
        email: 'admin@entando.com',
      },
      accountNotExpired: true,
      credentialsNotExpired: true,
    },
    user1: {
      username: 'user1',
      registration: '2018-01-08 00:00:00',
      lastLogin: '2018-01-08 00:00:00',
      lastPasswordChange: '2018-01-08 00:00:00',
      status: 'disabled',
      passwordChangeRequired: true,
      profileAttributes: {
        fullName: 'User Name',
        email: 'user1@entando.com',
      },
      accountNotExpired: true,
      credentialsNotExpired: true,
    },

    user2: {
      username: 'user2',
      registration: '2018-01-08 00:00:00',
      lastLogin: '2018-01-08 00:00:00',
      lastPasswordChange: '2018-01-08 00:00:00',
      status: 'active',
      passwordChangeRequired: true,
      profileAttributes: {
        fullName: 'User Name2',
        email: 'user2@entando.com',
      },
      accountNotExpired: true,
      credentialsNotExpired: true,
    },
    user3: {
      username: 'user3',
      registration: '2018-01-08 00:00:00',
      lastLogin: '2018-01-08 00:00:00',
      lastPasswordChange: '2018-01-08 00:00:00',
      status: 'active',
      passwordChangeRequired: true,
      profileAttributes: {
        fullName: 'User Name3',
        email: 'user3@entando.com',
      },
      accountNotExpired: true,
      credentialsNotExpired: true,
    },
    user4: {
      username: 'user4',
      registration: '2018-01-08 00:00:00',
      lastLogin: '2018-01-08 00:00:00',
      lastPasswordChange: '2018-01-08 00:00:00',
      status: 'active',
      passwordChangeRequired: true,
      profileAttributes: {
        fullName: 'User Name4',
        email: 'user4@entando.com',
      },
      accountNotExpired: false,
      credentialsNotExpired: true,
    },
    user5: {
      username: 'user5',
      registration: '2018-01-08 00:00:00',
      lastLogin: '2018-01-08 00:00:00',
      lastPasswordChange: '2018-01-08 00:00:00',
      status: 'active',
      passwordChangeRequired: true,
      profileAttributes: {
        fullName: 'User Name5',
        email: 'user5@entando.com',
      },
      accountNotExpired: true,
      credentialsNotExpired: false,
    },
  },
};
export const AUTHORITIES = [{
  group: 'free',
  role: 'editor',
},
{
  group: 'accounting',
  role: 'supervisor',
},
];
