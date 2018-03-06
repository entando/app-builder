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

export const LIST_FRAGMENTS_OK =
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
  ],
  errors: [],
  metaData: {
    page: 1,
    pageSize: 10,
    lastPage: 10,
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
