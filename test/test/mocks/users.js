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
  },
];

export const USERS_NORMALIZED = {
  list: ['admin', 'user1', 'user2', 'user3'],
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
    },
  },
};
