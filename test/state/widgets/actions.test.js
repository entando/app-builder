import thunk from 'redux-thunk';

import { SET_WIDGET_LIST } from 'state/widgets/types';
import { getWidgetList, fetchWidgetList, fetchWidget } from 'state/widgets/actions';
import configureMockStore from 'redux-mock-store';
import { BODY_OK } from 'test/mocks/widget';


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const WIDGET_MOCK = BODY_OK.payload;

const WIDGET_CODE = 'test_widget';

const FORM_MOCK_INITIAL_STATE = {
  form: {},
};

jest.unmock('api/widgetList');

const STATE_MOCKED = {
  type: SET_WIDGET_LIST,
  payload: {
    widgetList: [],
  },
};

describe('state/widgets/actions', () => {
  it('test SET_STATE_MOCKED for empty object on initial state', () => {
    expect(getWidgetList([])).toEqual(STATE_MOCKED);
  });

  it('checks action type', () => {
    const action = getWidgetList();
    expect(action.type).toBe(SET_WIDGET_LIST);
  });
  it('search for the payload to be defined', () => {
    const action = getWidgetList();
    expect(action.payload).toBeDefined();
  });

  it('action payload contains widget information', (done) => {
    const store = mockStore(FORM_MOCK_INITIAL_STATE);
    store.dispatch(fetchWidget(WIDGET_CODE)).then(() => {
      const actions = store.getActions();
      expect(actions[0].payload).toEqual(WIDGET_MOCK);
      done();
    });
  });

  it('fetchWidgetList calls setWidget action', (done) => {
    const store = mockStore(STATE_MOCKED);
    store.dispatch(fetchWidgetList()).then(() => {
      const actions = store.getActions();
      expect(actions[0].type).toEqual(SET_WIDGET_LIST);
      done();
    });
  });

  it('fetchWidgetLis is defined and properly valued', (done) => {
    const store = mockStore(STATE_MOCKED);
    store.dispatch(fetchWidgetList()).then(() => {
      const actions = store.getActions();
      expect(actions[0].payload.widgetList).toBeDefined();
      done();
    });
  });
});
