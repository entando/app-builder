export const BODY_OK =
{
  payload: {
    code: 'fragment_code',
    isLocked: false,
    widgetType: {
      code: 'widgetcode',
      title: 'Widget Title',
    },
    pluginCode: 'pluginCode',
    fragments: [{
      code: 'fragmentCode',
    }],
    pageModels: [{
      code: 'pageModelCode',
      name: 'My Page Model',
    }],
    defaultGuiCode: '<div></div>',
    guiCode: '<div></div>',
  },

  errors: [],
  metaData: {},
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

export const WIDGET_TYPES_PAYLOAD = [
  {
    widgetType: {
      en: 'CMS',
      it: 'CMS',
    },
    widgetList: [
      {
        code: 'row_content_viewer_list',
        titles: {
          en: 'Contents - Publish Contents',
          it: 'Contenuti - Pubblica contenuti',
        },
      },
      {
        code: 'content_viewer',
        titles: {
          en: 'Contents - Publish a Content',
          it: 'Contenuti - Pubblica un contenuto',
        },
      },
      {
        code: 'content_viewer_list',
        titles: {
          en: 'Contents - Publish a List of Contents',
          it: 'Contenuti - Pubblica una lista di contenuti',
        },
      },
      {
        code: 'search_result',
        titles: {
          en: 'Search - Search Result',
          it: 'Ricerca - risultati della ricerca',
        },
      },
    ],
  },
  {
    widgetType: {
      en: 'User widgets',
      it: 'User widgets',
    },
    widgetList: [
      {
        code: 'user_widget_test',
        titles: {
          en: 'Test Widget',
          it: 'Widget di test',
        },
      },
    ],
  },
];

export const PLUGINS_PAYLOAD = [
  {
    code: 'jacms',
    titles: {
      en: 'CMS',
      it: 'CMS',
    },
  },
];
