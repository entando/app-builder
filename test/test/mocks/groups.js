export const LIST_GROUPS_OK = [
  {
    name: 'Account Executive',
    code: 'account_executive',
  },
  {
    name: 'Administrators',
    code: 'administrators',
  },
  {
    name: 'Bpm Admin',
    code: 'bpm_admin',
  },
  {
    name: 'Bpm Appraiser',
    code: 'bpm_appraiser',
  },
  {
    name: 'Bpm Broker',
    code: 'bpm_broker',
  },
  {
    name: 'Bpm Manager',
    code: 'bpm_manager',
  },
  {
    name: 'Client Onboarding Manager',
    code: 'client_manager',
  },
  {
    name: 'Customers',
    code: 'customers',
  },
  {
    name: 'Free Access',
    code: 'free',
  },
  {
    name: 'KYC Analyst',
    code: 'knowledge_worker',
  },
];

export const BODY_OK = {
  name: 'New Group',
  code: 'new_group',
};

export const GROUPS_NORMALIZED = {
  groups: {
    list: [
      'account_executive',
      'administrators',
      'bpm_admin',
      'bpm_appraiser',
      'bpm_broker',
      'bpm_manager',
      'client_manager',
      'customers',
      'free',
      'knowledge_worker',
    ],
    map: {
      account_executive: {
        name: 'Account Executive',
        code: 'account_executive',
      },
      administrators: {
        name: 'Administrators',
        code: 'administrators',
      },
      bpm_admin: {
        name: 'Bpm Admin',
        code: 'bpm_admin',
      },
      bpm_appraiser: {
        name: 'Bpm Appraiser',
        code: 'bpm_appraiser',
      },
      bpm_broker: {
        name: 'Bpm Broker',
        code: 'bpm_broker',
      },
      bpm_manager: {
        name: 'Bpm Manager',
        code: 'bpm_manager',
      },
      client_manager: {
        name: 'Client Onboarding Manager',
        code: 'client_manager',
      },
      customers: {
        name: 'Customers',
        code: 'customers',
      },
      free: {
        name: 'Free Access',
        code: 'free',
      },
      knowledge_worker: {
        name: 'KYC Analyst',
        code: 'knowledge_worker',
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

export const PAGE_REFERENCES = {
  administrators: {
    list: [
      {
        code: 'homepage',
        name: 'Home page',
      },
      {
        code: 'dashboard',
        name: 'Dashboard',
      },

    ],
    pagination: {
      page: 1,
      pageSize: 5,
      lastPage: 1,
      totalItems: 3,
    },
  },
};


export const USER_REFERENCES = {
  administrators: {
    list: [
      {
        username: 'admin',
        fullName: 'Administrators',
        lastLogin: '2018-01-08 00:00:00',
        status: 'active',
      },
    ],
    pagination: {
      page: 1,
      pageSize: 5,
      lastPage: 1,
      totalItems: 1,
    },
  },
};

export const WIDGETTYPE_REFERENCES = {
  administrators: {
    list: [
      {
        code: 'banner-content-left',
        title: 'Banner content left',
      },
    ],
    pagination: {
      page: 1,
      pageSize: 5,
      lastPage: 1,
      totalItems: 3,
    },
  },
};

export const GROUP_CONTENT_REFERENCES = {
  administrators: {
    list: [
      {
        code: 'CNG2',
        name: 'Banner content left',
        type: 'Generic Content',
        lastEdit: '2017-01-08 00:00:00',
      },
    ],
    pagination: {
      page: 1,
      pageSize: 5,
      lastPage: 1,
      totalItems: 3,
    },
  },
};

export const RESOURCE_REFERENCES = {
  administrators: {
    list: [
      {
        code: 'sample-image-1',
        name: 'Sample image 1',
        type: 'Image',
      },
    ],
    pagination: {
      page: 1,
      pageSize: 5,
      lastPage: 1,
      totalItems: 3,
    },
  },
};
