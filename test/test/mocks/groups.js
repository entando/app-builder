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
