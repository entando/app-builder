export const WIDGET = {
  code: 'login_form',
  used: 2,
  titles: {
    it: 'Mio Titolo',
    en: 'My Title',
  },
  typology: 'User Widget',
  guiFragments: [
    {
      code: 'fragCode',
      customUi: '<div></div>',
      defaultUi: '<div></div>',
    },
  ],
  pluginCode: 'plugin_code',
  group: 'group',
  hasConfig: true,
};


export const WIDGET_LIST = {
  payload: [
    WIDGET,
    {
      ...WIDGET, code: 'search_form', titles: { it: 'Form di ricerca', en: 'Search Form' }, used: 3,
    },
    {
      ...WIDGET, code: 'single_content', titles: { it: 'Singolo Contenuto', en: 'Single Content' }, used: 4,
    },
    {
      ...WIDGET, code: 'content_viewer', titles: { it: 'Contenuti', en: 'Contents' }, used: 2,
    },
    {
      ...WIDGET, code: 'formAction', titles: { it: 'InternalServlet', en: 'InternalServlet' }, used: 1,
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
  'User Widget': [WIDGET],
};

export const WIDGET_POST_PUT = {
  code: 'WDG',
  titles: {
    it: 'Mio Titolo',
    en: 'My Title',
  },
  group: 'group',
  customUi: '<div></div>',
};
