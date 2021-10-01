export const EDIT_CONTENT_OPENED_OK = {
  ownerGroupDisabled: false,
  currentUser: 'admin',
  workMode: 'work-mode-edit',
  contentId: 1,
  content: {
    contentType: 'NEWS',
    version: '0.0',
  },
  groups: [
    { code: 'adminstrators', name: 'Administrators' },
    { code: 'freeAccess', name: 'Free Access' },
  ],
  selectedCategories: undefined,
  selectedJoinGroups: undefined,
  language: undefined,
  loading: undefined,
  saveType: undefined,
  enableTranslationWarning: true,
};

export const ADD_CONTENT_OPENED_OK = {
  ownerGroupDisabled: false,
  currentUser: 'admin',
  workMode: 'work-mode-add',
  groups: [
    { code: 'adminstrators', name: 'Administrators' },
    { code: 'freeAccess', name: 'Free Access' },
  ],
  contentType: 'ART',
  selectedCategories: undefined,
  language: undefined,
  saveType: undefined,
  selectedJoinGroups: undefined,
  content: {
    contentType: 'NEWS',
    version: '0.0',
  },
  enableTranslationWarning: true,
  initialValues: {
    mainGroup: undefined,
    groups: undefined,
    contentType: undefined,
  },
};

export const GET_CONTENT_RESPONSE_OK = {
  description: 'Article For Demo Purposes',
  lastModified: '2020-10-10 01:01:01',
  lastEditor: 'admin',
  status: 'PUBLIC',
  onLine: true,
  mainGroup: 'free',
  groups: ['customers'],
  version: '0.2',
};

export const GET_CATEGORY_BY_CODE_OK = {
  payload: [],
  errors: [],
  metaData: {
    page: 1,
    pageSize: 10,
    lastPage: 10,
  },
};

export const POST_ADD_CONTENT_OK = {
  payload: [],
  errors: [],
  metaData: {
    page: 1,
    pageSize: 10,
    lastPage: 10,
  },
};

export const POST_CONTENT_ADD_RESPONSE_OK = {
  id: 10013,
  contentType: { typeCode: 'NEWS', typeDescription: 'News' },
};

export const CONTENT_FORM_ATTRIBUTE_VALUES = {
  attributes: [
    {
      code: 'title',
      value: null,
      values: {
        en: 'News here we go',
      },
    },
    {
      code: 'body',
      value: null,
      values: {
        en: 'wolowolo',
      },
    },
    {
      code: 'image',
      value: null,
      values: {
        en: {
          id: 'entandoAtWork',
          type: 'image',
          name: 'Entando at Work',
          group: 'free',
          categories: [],
          versions: [
            {
              dimensions: '90x90 px',
              path: 'entando_at_work_7_d1.jpg',
              size: '0 Kb',
            },
          ],
          metadata: null,
          downloadUrl: 'http://localhost:8090',
        },
      },
      names: {
        en: 'image',
      },
    },
    {
      code: 'Authors',
      value: null,
      values: {},
      elements: [
        {
          code: 'Authors',
          compositeelements: [
            {
              code: 'AuthorName',
              value: null,
              values: {
                en: 'Jenny',
              },
            },
            {
              code: 'AuthorFace',
              value: null,
              values: {
                en: {
                  id: 'entandoAtWork',
                  type: 'image',
                  name: 'Entando at Work',
                  group: 'free',
                  categories: [],
                  versions: [
                    {
                      dimensions: '90x90 px',
                      path: 'entando_at_work_7_d1.jpg',
                      size: '0 Kb',
                    },
                  ],
                  metadata: null,
                  downloadUrl: 'http://localhost:8090',
                },
              },
            },
          ],
        },
      ],
      names: {
        en: 'Authors',
      },
    },
    {
      code: 'Author',
      compositeelements: [
        {
          code: 'AuthorName',
          value: null,
          values: {
            en: 'Jenny',
          },
          elements: [],
          compositeelements: [],
          listelements: {},
        },
        {
          code: 'AuthorFace',
          value: null,
          values: {
            en: {
              id: 'entandoAtWork',
              type: 'image',
              name: 'Entando at Work',
              group: 'free',
              categories: [],
              versions: [
                {
                  dimensions: '90x90 px',
                  path: 'entando_at_work_7_d1.jpg',
                  size: '0 Kb',
                },
              ],
              metadata: null,
              downloadUrl: 'http://localhost:8090',
            },
          },
        },
      ],
    },
    {
      code: 'Emails',
      value: null,
      listelements: {
        en: [
          {
            code: 'Emails',
            value: 'jeff@go.com',
          },
        ],
      },
      names: {
        en: 'Emails',
      },
    },
  ],
};
