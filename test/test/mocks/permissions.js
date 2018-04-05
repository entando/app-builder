export const LIST_PERMISSIONS_OK = [
  {
    code: 'editContents',
    descr: 'Redazione di Contenuti',
  },
  {
    code: 'enterBackend',
    descr: "Accesso all'Area di Amministrazione",
  },
  {
    code: 'manageCategories',
    descr: 'Operazioni su Categorie',
  },
  {
    code: 'managePages',
    descr: 'Operazioni su Pagine',
  },
  {
    code: 'manageResources',
    descr: 'Operazioni su Risorse',
  },
  {
    code: 'superuser',
    descr: 'Tutte le funzioni',
  },
  {
    code: 'validateContents',
    descr: 'Supervisione di Contenuti',
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
        name: 'content Editing',
        code: 'editContents',
      },
      enterBackend: {
        name: 'access To Admin',
        code: 'enterBackend',
      },
      manageCategories: {
        name: 'rating Editing',
        code: 'manageCategories',
      },
      managePages: {
        name: 'manage Web Dynamic Forms',
        code: 'managePages',
      },
      manageResources: {
        name: 'operations On Resources',
        code: 'manageResources',
      },
      superuser: {
        name: 'content Editing1',
        code: 'superuser',
      },
      validateContents: {
        name: 'access To Admin1',
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
