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
  ],
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
