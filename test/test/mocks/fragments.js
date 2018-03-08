export const GET_FRAGMENT_OK =
{
  payload: {
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

export const LIST_FRAGMENTS_OK_PAGE_1 =
{
  payload: [
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
  ],
  errors: [],
  metaData: {
    page: 1,
    pageSize: 2,
    lastPage: 3,
  },
};

export const LIST_FRAGMENTS_OK_PAGE_2 =
{
  payload: [
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
  ],
  errors: [],
  metaData: {
    page: 2,
    pageSize: 2,
    lastPage: 3,
  },
};

export const LIST_FRAGMENTS_OK_PAGE_3 =
{
  payload: [
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
  ],
  errors: [],
  metaData: {
    page: 3,
    pageSize: 2,
    lastPage: 3,
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
