export const PROFILE_TYPES_OK =
{
  payload: [{
    name: 'Default User Profile',
    code: 'PFL',
    status: 'ok',
  },
  {
    name: 'Supervisor User Profile',
    code: 'SUP',
    status: 'ko',
  }],
  errors: [],
  metaData: {
    page: 1,
    pageSize: 2,
    lastPage: 2,
  },
};

export const PROFILE_TYPES_OK_PAGE_1 = {
  payload: [{
    name: 'Default User Profile',
    code: 'PFL',
    status: 'ok',
  },
  {
    name: 'Supervisor User Profile',
    code: 'SUP',
    status: 'ko',
  }],
  errors: [],
  metaData: {
    page: 1,
    pageSize: 2,
    lastPage: 2,
  },
};

export const PROFILE_TYPES_OK_PAGE_2 = {
  payload: [{
    name: 'News Editor User Profile',
    code: 'NED',
    status: 'ok',
  },
  {
    name: 'Event Editor User Profile',
    code: 'EED',
    status: 'ko',
  }],
  errors: [],
  metaData: {
    page: 1,
    pageSize: 2,
    lastPage: 2,
  },
};

export const PROFILE_TYPES_NORMALIZED = {
  profileTypes: {
    list: ['PFL', 'SUP'],
    map: {
      PFL: {
        name: 'Default User Profile',
        code: 'PFL',
        status: 'ok',
      },
      SUP: {
        name: 'Supervisor User Profile',
        code: 'SUP',
        status: 'ko',
      },
    },
  },
  pagination: PROFILE_TYPES_OK_PAGE_1.metaData,
};

export const PROFILE_TYPES_OPTIONS = [
  {
    text: 'Default User Profile',
    value: 'PFL',
  },
  {
    text: 'Supervisor User Profile',
    value: 'SUP',
  },
];

export const ERROR = {
  payload: [
  ],
  errors: [
    {
      code: 1,
      message: 'what went wrong',
    },
  ],
  metaData: {
    page: 1,
    pageSize: 100,
  },
};
