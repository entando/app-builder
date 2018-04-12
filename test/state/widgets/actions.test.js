import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';


import { mockApi } from 'test/testUtils';

import { SET_WIDGET_LIST } from 'state/widgets/types';
import { ADD_ERRORS } from 'state/errors/types';
import { getWidgetList, fetchWidgetList, fetchWidget, loadSelectedWidget } from 'state/widgets/actions';
import { getSelectedWidget } from 'state/widgets/selectors';
import { TOGGLE_LOADING } from 'state/loading/types';

import { SET_PAGE } from 'state/pagination/types';
import { getWidget, getWidgets } from 'api/widgets';
import { WIDGET_LIST, BODY_OK } from 'test/mocks/widgets';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const WIDGET_MOCK = BODY_OK;

const WIDGET_CODE = 'test_widget';
const PROMISE_WIDGET = {
  ok: true,
  json: () => new Promise(res => res({ payload: BODY_OK })),
};
const PROMISE_WIDGET_LIST = {
  ok: true,
  json: () => new Promise(res => res({ payload: WIDGET_LIST })),
};


getWidget.mockReturnValue(new Promise(resolve => resolve(PROMISE_WIDGET)));
getWidgets.mockReturnValue(new Promise(resolve => resolve(PROMISE_WIDGET_LIST)));

jest.mock('api/widgets', () => ({
  getWidget: jest.fn(),
  getWidgets: jest.fn(),
}));

jest.mock('state/widgets/selectors', () => ({
  getSelectedWidget: jest.fn(),
}));


describe('state/widgets/actions', () => {
  let store;
  beforeEach(() => {
    jest.clearAllMocks();
    store = mockStore();
  });

  it('checks action type', () => {
    const action = getWidgetList();
    expect(action.type).toBe(SET_WIDGET_LIST);
  });

  it('search for the payload to be defined', () => {
    const action = getWidgetList();
    expect(action.payload).toBeDefined();
  });

  it('fetchWidgetList calls setWidget action', (done) => {
    store.dispatch(fetchWidgetList()).then(() => {
      const actions = store.getActions();
      expect(actions).toHaveLength(4);
      expect(actions[0].type).toEqual(TOGGLE_LOADING);
      expect(actions[1].type).toEqual(SET_WIDGET_LIST);
      expect(actions[2].type).toEqual(TOGGLE_LOADING);
      expect(actions[3].type).toEqual(SET_PAGE);
      done();
    }).catch(done.fail);
  });

  it('fetchWidgetList is defined and properly valued', (done) => {
    store.dispatch(fetchWidgetList()).then(() => {
      const actions = store.getActions();
      expect(actions[1].payload.widgetList).toBeDefined();
      done();
    }).catch(done.fail);
  });

  describe('fetchWidget', () => {
    it('if API response is ok, initializes the form with widget information', (done) => {
      store.dispatch(fetchWidget(WIDGET_CODE)).then(() => {
        expect(initialize).toHaveBeenCalledWith('widget', WIDGET_MOCK);
        done();
      }).catch(done.fail);
    });

    it('if API response is not ok, dispatch ADD_ERRORS', (done) => {
      getWidget.mockImplementation(mockApi({ errors: true }));
      store.dispatch(fetchWidget(WIDGET_CODE)).then(() => {
        expect(store.getActions()).toHaveLength(1);
        expect(store.getActions()[0]).toHaveProperty('type', ADD_ERRORS);
        done();
      }).catch(done.fail);
    });
  });

  describe('loadSelectedWidget', () => {
    it('if the widget is already selected, do nothing', (done) => {
      getSelectedWidget.mockReturnValue(WIDGET_MOCK);
      store.dispatch(loadSelectedWidget(WIDGET_MOCK.code)).then(() => {
        expect(getWidget).not.toHaveBeenCalled();
        expect(store.getActions()).toHaveLength(0);
        done();
      }).catch(done.fail);
    });

    it('if there is another widget selected, fetch and select the new widget', (done) => {
      store.dispatch(loadSelectedWidget('some_other_widget')).then(() => {
        expect(getWidget).toHaveBeenCalled();
        expect(store.getActions()).toHaveLength(1);
        done();
      }).catch(done.fail);
    });

    it('if there is no widget selected, fetch and select the new widget', (done) => {
      getSelectedWidget.mockReturnValue(null);
      store.dispatch(loadSelectedWidget(WIDGET_MOCK.code)).then(() => {
        expect(getWidget).toHaveBeenCalled();
        expect(store.getActions()).toHaveLength(1);
        done();
      }).catch(done.fail);
    });

    it('if the response is not ok, dispatch add errors', (done) => {
      getWidget.mockImplementation(mockApi({ errors: true }));
      store.dispatch(loadSelectedWidget('some_other_widget')).then(() => {
        expect(getWidget).toHaveBeenCalled();
        expect(store.getActions()).toHaveLength(1);
        expect(store.getActions()[0]).toHaveProperty('type', ADD_ERRORS);
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
        expect(actionPayload.widgetList).toMatchObject(WIDGET_LIST);
        done();
      }).catch(done.fail);
    });
  });
});
