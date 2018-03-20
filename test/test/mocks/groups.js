export const GROUPS = {
  payload: [
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
    {
      name: 'Compliance manager',
      code: 'legal_worker',
    },
  ],
  errors: [],
  metaData: {
    page: 1,
    pageSize: 10,
    lastPage: 10,
  },
};
export default GROUPS;

export const GROUPS_OK_PAGE_1 = {
  payload: [
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
  ],
  errors: [],
  metaData: {
    page: 1,
    pageSize: 5,
    lastPage: 2,
  },
};

export const GROUPS_OK_PAGE_2 = {
  payload: [
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
  ],
  errors: [],
  metaData: {
    page: 2,
    pageSize: 5,
    lastPage: 2,
  },
};

export const GROUPS_NORMALIZED = {
  groups: {
    list: [
      'account_executive',
      'administrators',
      'bpm_admin',
      'bpm_appraiser',
      'bpm_broker',
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
    },
  },
  pagination: {
    page: 2,
    pageSize: 5,
    lastPage: 2,
  },
};
