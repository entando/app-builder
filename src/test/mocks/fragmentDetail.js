export const FRAGMENT_DETAIL = {
  payload: {
    code: 'myCode',
    isLocked: false,
    widgetType: {
      code: 'widgetcode',
      title: 'Widget Title',
    },
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
export default FRAGMENT_DETAIL;
