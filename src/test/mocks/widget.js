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
    group: 'group',
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
