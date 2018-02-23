
import { setWidget } from 'state/widget-form/actions';
import { SET_WIDGET } from 'state/widget-form/types';

const WIDGET_MOCK = {
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
};

const SET_WIDGET_MOCK = {
  type: SET_WIDGET,
  payload: {
    widgetValues: WIDGET_MOCK,
  },
};

it('test setWidget action', () => {
  expect(setWidget(WIDGET_MOCK)).toEqual(SET_WIDGET_MOCK);
});
