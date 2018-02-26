
import { setWidget, fetchWidget } from 'state/widget-form/actions';
import { SET_WIDGET } from 'state/widget-form/types';

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

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

const WIDGET_CODE = 'test_widget';

const SET_WIDGET_MOCK_INITIAL_STATE = {
  type: SET_WIDGET,
  payload: {
    widgetValues: {},
  },
};

it('test setWidget action sets the correct type', () => {
  const action = setWidget(WIDGET_MOCK);
  expect(action.type).toEqual(SET_WIDGET);
});

describe('test fetchWidget', () => {
  const store = mockStore(SET_WIDGET_MOCK_INITIAL_STATE);
  it('fetchWidget calls setWidget action', (done) => {
    store.dispatch(fetchWidget(WIDGET_CODE)).then(() => {
      const actions = store.getActions();
      expect(actions[0].type).toEqual(SET_WIDGET);
      done();
    });
  });
  it('widgetValues is defined and properly valued', (done) => {
    store.dispatch(fetchWidget(WIDGET_CODE)).then(() => {
      const actions = store.getActions();
      expect(actions[0].payload.widgetValues).toBeDefined();
      expect(actions[0].payload.widgetValues).toEqual(WIDGET_MOCK);
      done();
    });
  });
});
