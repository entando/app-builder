export const BODY_OK =
{
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
export const WIDGET = {
  code: 'WDG',
  used: 0,
  titles: {
    it: 'Mio Titolo',
    en: 'My Title',
  },
  typology: 'typologyCode',
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
  payload: [WIDGET],
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

export const WIDGET_POST_PUT = {
  code: 'WDG',
  titles: {
    it: 'Mio Titolo',
    en: 'My Title',
  },
  group: 'group',
  customUi: '<div></div>',
};
