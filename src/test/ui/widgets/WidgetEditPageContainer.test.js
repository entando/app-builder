import 'test/enzyme-init';

import { mapStateToProps, mapDispatchToProps } from 'ui/widgets/WidgetEditPageContainer';

const TEST_STATE = {
  router: {
    params: {
      widgetCode: 'code',
    },
  },
  mode: 'edit',
  widgetForm: {
    widgetValues: {
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
  },
};

const dispatchMock = jest.fn();


it('maps widgetCode and widgetName property state in WidgetEditPage', () => {
  expect(mapStateToProps(TEST_STATE)).toEqual({ widgetCode: 'code', widgetName: 'Test Widget' });
});


it('verify that onWillMount and toBeDefined is defined by mapDispatchToProps', () => {
  const result = mapDispatchToProps(dispatchMock);
  expect(result.onWillMount).toBeDefined();
  result.onWillMount({ widgetCode: 'code' });
  expect(dispatchMock).toHaveBeenCalled();
});
