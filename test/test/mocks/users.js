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

export const USERS_OK_PAGE_1 =
{
  payload: [
    {
      username: 'admin',
      registration: '2018-01-08 00:00:00',
      lastLogin: '2018-01-08 00:00:00',
      lastPasswordChange: '2018-01-08 00:00:00',
      status: 'active',
      passwordChangeRequired: true,
    },
    {
      username: 'user1',
      registration: '2018-01-08 00:00:00',
      lastLogin: '2018-01-08 00:00:00',
      lastPasswordChange: '2018-01-08 00:00:00',
      status: 'disabled',
      passwordChangeRequired: true,
    },
  ],
  errors: [],
  metaData: {
    page: 1,
    pageSize: 2,
    lastPage: 2,
  },
};

export const USERS_OK_PAGE_2 =
{
  payload: [
    {
      username: 'user2',
      registration: '2018-01-08 00:00:00',
      lastLogin: '2018-01-08 00:00:00',
      lastPasswordChange: '2018-01-08 00:00:00',
      status: 'active',
      passwordChangeRequired: true,
    },
    {
      username: 'user3',
      registration: '2018-01-08 00:00:00',
      lastLogin: '2018-01-08 00:00:00',
      lastPasswordChange: '2018-01-08 00:00:00',
      status: 'active',
      passwordChangeRequired: true,
    },
  ],
  errors: [],
  metaData: {
    page: 2,
    pageSize: 2,
    lastPage: 2,
  },
};

export const USER_PROFILE_MOCK = {
  admin: {
    fullName: 'Mario Rossi',
    email: 'mario.rossi@test.it',
  },
  user1: {
    fullName: 'Gianni Moi',
    email: 'gianni.moi@test.it',
  },
  user2: {
    fullName: 'Utente test 2',
    email: 'user2@test.it',
  },
  user3: {
    fullName: 'Utente test 3',
    email: 'user3@test.it',
  },
};
