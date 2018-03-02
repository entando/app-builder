export const BODY_OK =
{
  payload: {
    isLocked: false,
    code: 'code',
    widgetType: { code: 'widgetcode', title: 'Widget Title' },
    pluginCode: 'pluginCode',
    fragments: [
      { code: 'fragmentCode' },
    ],
    pageModels: [
      { code: 'pageModelCode', name: 'My Page Model' }],
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
