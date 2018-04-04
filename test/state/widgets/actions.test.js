import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { SET_WIDGET_LIST } from 'state/widgets/types';
import { TOGGLE_LOADING } from 'state/loading/types';
import { SET_PAGE } from 'state/pagination/types';
import { getWidget, getWidgets } from 'api/widgets';
import { getWidgetList, fetchWidgetList, fetchWidget } from 'state/widgets/actions';
import { BODY_OK, WIDGET_LIST } from 'test/mocks/widgets';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const PROMISE_WIDGET = {
  ok: true,
  json: () => new Promise(res => res({ payload: BODY_OK.payload })),
};
const PROMISE_WIDGET_LIST = {
  ok: true,
  json: () => new Promise(res => res({ payload: WIDGET_LIST.payload })),
};


const STATE_MOCKED = {
  type: SET_WIDGET_LIST,
  payload: {
    widgetList: [],
  },
};

jest.mock('api/widgets', () => ({
  getWidget: jest.fn(),
  getWidgets: jest.fn(),
}));

getWidget.mockReturnValue(new Promise(resolve => resolve(PROMISE_WIDGET)));
getWidgets.mockReturnValue(new Promise(resolve => resolve(PROMISE_WIDGET_LIST)));

const INITIALIZE = '@@redux-form/INITIALIZE';

describe('state/widgets/actions', () => {
  let store;
  beforeEach(() => {
    store = mockStore(STATE_MOCKED);
  });


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

  describe('fetchWidget', () => {
    it('fetchWidget calls initialize action', (done) => {
      store.dispatch(fetchWidget()).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', INITIALIZE);
        expect(actions[0]).toHaveProperty('payload', BODY_OK.payload);
        done();
      }).catch(done.fail);
    });
  });

  describe('fetchWidgetList', () => {
    it('fetchWidgetList calls setWidgetList and setPage action', (done) => {
      store.dispatch(fetchWidgetList()).then(() => {
        const actions = store.getActions();
        expect(actions).toHaveLength(4);
        expect(actions[0]).toHaveProperty('type', TOGGLE_LOADING);
        expect(actions[1]).toHaveProperty('type', SET_WIDGET_LIST);
        expect(actions[1]).toHaveProperty('payload');
        expect(actions[2].type).toEqual(TOGGLE_LOADING);
        expect(actions[3].type).toEqual(SET_PAGE);
        done();
      }).catch(done.fail);
    });

    it('fetchWidgetList is defined and properly valued', (done) => {
      store.dispatch(fetchWidgetList()).then(() => {
        expect(getWidgets).toHaveBeenCalled();
        const actions = store.getActions();
        expect(actions).toHaveLength(4);
        const actionPayload = actions[1].payload;
        expect(actionPayload.widgetList).toBeDefined();
        expect(actionPayload.widgetList).toMatchObject(WIDGET_LIST.payload);
        done();
      }).catch(done.fail);
    });
  });
});
