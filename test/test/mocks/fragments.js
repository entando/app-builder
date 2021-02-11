export const GET_FRAGMENT_OK =
{
  code: 'myCode',
  isLocked: false,
  widgetType: null,
  plugin: {
    code: 'pluginCode',
    title: 'pluginTitlte',
  },
  fragments: [{
    code: 'fragmentCode',
  }],
  pageTemplates: [{
    code: 'pageTemplateCode',
    name: 'My Page Model',
  }],
  defaultGuiCode: '<div></div>',
  guiCode: '<div></div>',

};

export const LIST_FRAGMENTS_OK = [
  {
    code: 'myCode',
    isLocked: false,
    widgetType: {
      code: 'widgetcode',
      title: 'Widget Title',
    },
    pluginCode: 'pluginCode',
  },
  {
    code: 'myCode2',
    isLocked: false,
    widgetType: {
      code: 'widgetcode',
      title: 'Widget Title',
    },
    pluginCode: 'pluginCode',
  },
  {
    code: 'myCode3',
    isLocked: false,
    widgetType: {
      code: 'widgetcode',
      title: 'Widget Title',
    },
    pluginCode: 'pluginCode',
  },
  {
    code: 'myCode4',
    isLocked: false,
    widgetType: {
      code: 'widgetcode',
      title: 'Widget Title',
    },
    pluginCode: 'pluginCode',
  },
  {
    code: 'myCode5',
    isLocked: false,
    widgetType: {
      code: 'widgetcode',
      title: 'Widget Title',
    },
    pluginCode: 'pluginCode',
  },
  {
    code: 'myCode6',
    isLocked: false,
    widgetType: {
      code: 'widgetcode',
      title: 'Widget Title',
    },
    pluginCode: 'pluginCode',
  },
  {
    code: 'myCode7',
    isLocked: false,
    widgetType: {
      code: 'widgetcode',
      title: 'Widget Title',
    },
    pluginCode: 'pluginCode',
  },
];

export const PLUGINS_OK = {
  payload: [
    {
      code: 'jacms',
      title: 'CMS',
    },
  ],
  errors: [],
  metaData: {},
};

export const FILTERS_OK = '?sort=code&direction=ASC&filters[0].attribute=code&filters[0].operator=like&filters[0].value=jacms';

export const PLUGINS_OPTIONS = [{ code: 'jacms', title: 'CMS' }];

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

export const FRAGMENT_SETTING = {
  enableEditingWhenEmptyDefaultGui: false,
};
