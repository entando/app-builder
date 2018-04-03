export const BODY_OK =
{
  payload: {
    code: 'test_widget',
    name: 'Test Widget',
    used: 0,
    titles: {
      it: 'Widget di Test',
      en: 'Test Widget',
    },
    group: 'administrator',
    customUi: '<p>Custom UI</p>',
    defaultUi: '<p>Default UI</p>',
    createdAt: '2018/02/22',
    updatedAt: '2018/02/22',
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
      message: 'Missing widget code',
    },
  ],
  metaData: {},
};

export const WIDGET_ONE_ELEMENT = {
  widgetCategory: 'User Widget',
  code: 'WTF',
  name: 'My first  Widget',
  used: 0,
  titles: {
    it: 'Mio Widget',
    en: 'My Widget',
  },
};


export const WIDGET_LIST = {
  payload: [
    WIDGET_ONE_ELEMENT,
    {
      widgetCategory: 'User Widget',
      code: 'login_form',
      name: 'LoginForm',
      used: 2,
      titles: {
        it: 'Form di accesso',
        en: 'Login form',
      },
    },
    {
      widgetCategory: 'User Widget',
      code: 'search_form',
      name: 'SearchForm',
      used: 3,
      titles: {
        it: 'Form di ricerca',
        en: 'Search form',
      },
    },
    {
      widgetCategory: 'User Widget',
      code: 'single_content',
      name: 'SingleContent',
      used: 4,
      titles: {
        it: 'Singolo contenuto',
        en: 'Single content',
      },
    },
    {
      widgetCategory: 'User Widget',
      code: 'content_viewer',
      name: 'ContentViewer',
      used: 2,
      titles: {
        it: 'Contenuti - Pubblica un contenuto',
        en: 'Contents - Publish a content',
      },
    },
  ],
  errors: [],
  metaData: {
    page: 1,
    pageSize: 100,
    lastPage: 1,
    sort: 'code',
    direction: 'ASC',
    filters: [
      {
        attribute: 'code',
        operator: 'eq',
        value: '%D%',
      },
    ],
  },
};

export const WIDGETS_MAP = WIDGET_LIST.payload.reduce((acc, widget) => {
  acc[widget.code] = widget;
  return acc;
}, {});

export const WIDGET_ONE_LIST = {
  'User Widget': [
    {
      widgetCategory: 'User Widget',
      code: 'WTF',
      name: 'My first  Widget',
      used: 0,
      titles: {
        it: 'Mio Widget',
        en: 'My Widget',
      },
    },
  ],
};
