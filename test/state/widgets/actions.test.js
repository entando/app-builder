import { isFSA } from 'flux-standard-action';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { initialize } from 'redux-form';
import { ADD_TOAST, ADD_ERRORS } from '@entando/messages';

import { mockApi } from 'test/testUtils';

import {
  SET_WIDGET_LIST,
  SET_SELECTED_WIDGET,
  REMOVE_WIDGET,
  SET_WIDGETS_TOTAL,
  SET_WIDGET_INFO,
} from 'state/widgets/types';
import {
  setWidgetList,
  fetchWidgetList,
  setWidgetsTotal,
  fetchWidgetsTotal,
  fetchWidget,
  sendPostWidgets,
  sendPutWidgets,
  sendDeleteWidgets,
  loadSelectedWidget,
  setSelectedWidget,
  removeWidget,
  setWidgetInfo,
  fetchWidgetInfo,
  FREE_ACCESS_GROUP_VALUE,
} from 'state/widgets/actions';
import { getSelectedWidget } from 'state/widgets/selectors';
import { TOGGLE_LOADING } from 'state/loading/types';
import { history, ROUTE_WIDGET_LIST } from 'app-init/router';

import {
  getWidget,
  getWidgets,
  postWidgets,
  putWidgets,
  deleteWidgets,
  getWidgetInfo,
} from 'api/widgets';
import { WIDGET, WIDGET_LIST, WIDGET_INFO, WIDGET_NULL_GROUP } from 'test/mocks/widgets';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const WIDGET_CODE = 'WDG';

jest.mock('state/widgets/selectors', () => ({
  getSelectedWidget: jest.fn(),
}));

jest.mock('app-init/router', () => ({
  history: {
    push: jest.fn(),
  },
}));

describe('state/widgets/actions', () => {
  let store;
  let action;
  beforeEach(() => {
    jest.clearAllMocks();
    store = mockStore({});
  });

  describe('setWidgetList', () => {
    beforeEach(() => {
      action = setWidgetList(WIDGET_LIST);
    });

    it('is FSA compliant', () => {
      expect(isFSA(action)).toBe(true);
    });

    it('actions is correct setup ', () => {
      expect(action).toHaveProperty('type', SET_WIDGET_LIST);
      expect(action).toHaveProperty('payload.widgetList', WIDGET_LIST);
    });
  });

  describe('setWidgetsTotal', () => {
    beforeEach(() => {
      action = setWidgetsTotal(12);
    });

    it('is FSA compliant', () => {
      expect(isFSA(action)).toBe(true);
    });

    it('actions is correctly setup', () => {
      expect(action).toHaveProperty('type', SET_WIDGETS_TOTAL);
      expect(action).toHaveProperty('payload.widgetsTotal', 12);
    });
  });

  describe('setSelectedWidget', () => {
    beforeEach(() => {
      action = setSelectedWidget(WIDGET);
    });

    it('is FSA compliant', () => {
      expect(isFSA(action)).toBe(true);
    });

    it('actions is correct setup ', () => {
      expect(action).toHaveProperty('type', SET_SELECTED_WIDGET);
      expect(action).toHaveProperty('payload.widget', WIDGET);
    });
  });

  describe('removeWidget', () => {
    beforeEach(() => {
      action = removeWidget('CODE');
    });

    it('is FSA compliant', () => {
      expect(isFSA(action)).toBe(true);
    });

    it('actions is correct setup ', () => {
      expect(action).toHaveProperty('type', REMOVE_WIDGET);
      expect(action).toHaveProperty('payload.widgetCode', 'CODE');
    });
  });

  describe('setWidgetInfo', () => {
    beforeEach(() => {
      action = setWidgetInfo(WIDGET_INFO);
    });

    it('is FSA compliant', () => {
      expect(isFSA(action)).toBe(true);
    });

    it('actions is correct setup ', () => {
      expect(action).toHaveProperty('type', SET_WIDGET_INFO);
      expect(action).toHaveProperty('payload.widgetInfo', WIDGET_INFO);
    });
  });


  describe('thunk', () => {
    describe('loadSelectedWidget', () => {
      it('if the widget is already selected, do nothing', (done) => {
        getSelectedWidget.mockReturnValue(WIDGET);
        store.dispatch(loadSelectedWidget(WIDGET.code)).then(() => {
          expect(getWidget).not.toHaveBeenCalled();
          expect(store.getActions()).toHaveLength(0);
          done();
        }).catch(done.fail);
      });

      it('if there is another widget selected, fetch and select the new widget', (done) => {
        store.dispatch(loadSelectedWidget('some_other_widget')).then(() => {
          expect(getWidget).toHaveBeenCalled();
          const actions = store.getActions();
          expect(actions).toHaveLength(1);
          expect(actions[0]).toHaveProperty('type', SET_SELECTED_WIDGET);
          done();
        }).catch(done.fail);
      });

      it('if there is no widget selected, fetch and select the new widget', (done) => {
        getSelectedWidget.mockReturnValue(null);
        store.dispatch(loadSelectedWidget(WIDGET.code)).then(() => {
          expect(getWidget).toHaveBeenCalled();
          const actions = store.getActions();
          expect(actions).toHaveLength(1);
          expect(actions[0]).toHaveProperty('type', SET_SELECTED_WIDGET);

          done();
        }).catch(done.fail);
      });

      it('if the response is not ok, dispatch add errors', (done) => {
        getWidget.mockImplementation(mockApi({ errors: true }));
        store.dispatch(loadSelectedWidget('some_other_widget')).then(() => {
          expect(getWidget).toHaveBeenCalled();
          expect(store.getActions()).toHaveLength(2);
          expect(store.getActions()[0]).toHaveProperty('type', ADD_ERRORS);
          expect(store.getActions()[1]).toHaveProperty('type', ADD_TOAST);
          done();
        }).catch(done.fail);
      });
    });

    describe('fetchWidget', () => {
      it('if API response is ok, initializes the form with widget information', (done) => {
        getWidget.mockImplementationOnce(mockApi({ payload: WIDGET }));
        store.dispatch(fetchWidget()).then(() => {
          const actions = store.getActions();
          expect(actions).toHaveLength(2);
          expect(initialize).toHaveBeenCalled();
          const initializeAction = actions[0];
          expect(initializeAction).toHaveProperty('type', '@@redux-form/INITIALIZE');
          expect(initializeAction).toHaveProperty('payload');
          expect(initializeAction.payload).toEqual({
            code: WIDGET.code,
            titles: WIDGET.titles,
            group: WIDGET.group,
            configUi: '',
            customUi: WIDGET.guiFragments[0].customUi,
          });
          done();
        }).catch(done.fail);
      });

      it('if API response is ok but widget group value is null, initializes the form with widget information and - free - as group value', (done) => {
        getWidget.mockImplementationOnce(mockApi({ payload: WIDGET_NULL_GROUP }));
        store.dispatch(fetchWidget()).then(() => {
          const actions = store.getActions();
          expect(actions).toHaveLength(2);
          expect(initialize).toHaveBeenCalled();
          const initializeAction = actions[0];
          expect(initializeAction).toHaveProperty('type', '@@redux-form/INITIALIZE');
          expect(initializeAction).toHaveProperty('payload');
          expect(initializeAction.payload).toEqual({
            code: WIDGET_NULL_GROUP.code,
            titles: WIDGET_NULL_GROUP.titles,
            group: FREE_ACCESS_GROUP_VALUE,
            configUi: '',
            customUi: WIDGET_NULL_GROUP.guiFragments[0].customUi,
          });
          done();
        }).catch(done.fail);
      });

      it('if API response is ok, initializes the form with widget information 2', (done) => {
        getWidget.mockImplementationOnce(mockApi({ payload: WIDGET }));
        store.dispatch(fetchWidget()).then(() => {
          const actions = store.getActions();
          expect(actions).toHaveLength(2);
          const selectWidgetAction = actions[1];
          expect(selectWidgetAction).toHaveProperty('type', SET_SELECTED_WIDGET);
          expect(selectWidgetAction).toHaveProperty('payload');
          expect(selectWidgetAction.payload).toMatchObject({ widget: WIDGET });
          done();
        }).catch(done.fail);
      });

      it('if API response is not ok, dispatch ADD_ERRORS', (done) => {
        getWidget.mockImplementationOnce(mockApi({ errors: true }));
        store.dispatch(fetchWidget(WIDGET_CODE)).then(() => {
          expect(store.getActions()).toHaveLength(2);
          expect(store.getActions()[0]).toHaveProperty('type', ADD_ERRORS);
          expect(store.getActions()[1]).toHaveProperty('type', ADD_TOAST);
          done();
        }).catch(done.fail);
      });
    });

    describe('fetchWidgetInfo', () => {
      it('if API response is ok, set widget information', (done) => {
        getWidgetInfo.mockImplementationOnce(mockApi({ payload: WIDGET_INFO }));
        store.dispatch(fetchWidgetInfo()).then(() => {
          const actions = store.getActions();
          expect(actions).toHaveLength(1);
          expect(getWidgetInfo).toHaveBeenCalled();
          expect(actions[0]).toHaveProperty('type', SET_WIDGET_INFO);
          expect(actions[0]).toHaveProperty('payload', { widgetInfo: WIDGET_INFO });
          done();
        }).catch(done.fail);
      });

      it('if API response is not ok, dispatch ADD_ERRORS', (done) => {
        getWidgetInfo.mockImplementationOnce(mockApi({ errors: true }));
        store.dispatch(fetchWidgetInfo(WIDGET_LIST)).then(() => {
          expect(store.getActions()).toHaveLength(2);
          expect(store.getActions()[0]).toHaveProperty('type', ADD_ERRORS);
          expect(store.getActions()[1]).toHaveProperty('type', ADD_TOAST);
          done();
        }).catch(done.fail);
      });
    });

    describe('fetchWidgetsTotal', () => {
      it('checks that the widgets total is set', (done) => {
        store.dispatch(fetchWidgetsTotal()).then(() => {
          const actions = store.getActions();
          expect(actions).toHaveLength(1);
          expect(actions[0]).toHaveProperty('type', SET_WIDGETS_TOTAL);
          done();
        }).catch(done.fail);
      });

      it('if API response is not ok, dispatch ADD_ERRORS', (done) => {
        getWidgets.mockImplementationOnce(mockApi({ errors: true }));
        store.dispatch(fetchWidgetsTotal()).then(() => {
          expect(store.getActions()).toHaveLength(2);
          expect(store.getActions()[0]).toHaveProperty('type', ADD_ERRORS);
          expect(store.getActions()[1]).toHaveProperty('type', ADD_TOAST);
          done();
        }).catch(done.fail);
      });
    });

    describe('fetchWidgetList', () => {
      it('calls setWidgetList and setPage action', (done) => {
        getWidgets.mockImplementation(mockApi({ payload: WIDGET_LIST }));
        store.dispatch(fetchWidgetList()).then(() => {
          expect(getWidgets).toHaveBeenCalled();
          const actions = store.getActions();
          expect(actions).toHaveLength(3);
          expect(actions[0]).toHaveProperty('type', TOGGLE_LOADING);
          expect(actions[1]).toHaveProperty('type', SET_WIDGET_LIST);
          expect(actions[1]).toHaveProperty('payload');
          expect(actions[2]).toHaveProperty('type', TOGGLE_LOADING);
          const actionPayload = actions[1].payload;
          expect(actionPayload).toHaveProperty('widgetList');
          expect(actionPayload.widgetList).toMatchObject(WIDGET_LIST);
          done();
        }).catch(done.fail);
      });

      it('if API response is not ok, dispatch ADD_ERRORS', (done) => {
        getWidgets.mockImplementation(mockApi({ errors: true }));
        store.dispatch(fetchWidgetList()).then(() => {
          expect(getWidgets).toHaveBeenCalled();
          const actions = store.getActions();
          expect(actions).toHaveLength(4);
          expect(actions[0]).toHaveProperty('type', TOGGLE_LOADING);
          expect(actions[1]).toHaveProperty('type', ADD_ERRORS);
          expect(actions[2]).toHaveProperty('type', ADD_TOAST);
          expect(actions[3]).toHaveProperty('type', TOGGLE_LOADING);
          done();
        }).catch(done.fail);
      });
    });

    describe('sendPostWidgets', () => {
      it('calls router', (done) => {
        store.dispatch(sendPostWidgets({ code: 'test' })).then(() => {
          expect(postWidgets).toHaveBeenCalled();
          const actions = store.getActions();
          expect(actions).toHaveLength(1);
          expect(actions[0]).toHaveProperty('type', ADD_TOAST);
          expect(history.push).toHaveBeenCalledWith(ROUTE_WIDGET_LIST);
          done();
        }).catch(done.fail);
      });

      it('if API response is not ok, dispatch ADD_ERRORS', (done) => {
        postWidgets.mockImplementation(mockApi({ errors: true }));
        store.dispatch(sendPostWidgets()).then(() => {
          expect(postWidgets).toHaveBeenCalled();
          const actions = store.getActions();
          expect(actions).toHaveLength(2);
          expect(actions[0]).toHaveProperty('type', ADD_ERRORS);
          expect(actions[1]).toHaveProperty('type', ADD_TOAST);
          done();
        }).catch(done.fail);
      });
    });

    describe('sendPutWidgets', () => {
      it('calls router', (done) => {
        store.dispatch(sendPutWidgets(WIDGET)).then(() => {
          expect(putWidgets).toHaveBeenCalled();
          const actions = store.getActions();
          expect(actions).toHaveLength(1);
          expect(actions[0]).toHaveProperty('type', ADD_TOAST);
          expect(history.push).toHaveBeenCalledWith(ROUTE_WIDGET_LIST);
          done();
        }).catch(done.fail);
      });

      it('if API response is not ok, dispatch ADD_ERRORS', (done) => {
        putWidgets.mockImplementation(mockApi({ errors: true }));
        store.dispatch(sendPutWidgets()).then(() => {
          expect(putWidgets).toHaveBeenCalled();
          const actions = store.getActions();
          expect(actions).toHaveLength(2);
          expect(actions[0]).toHaveProperty('type', ADD_ERRORS);
          expect(actions[1]).toHaveProperty('type', ADD_TOAST);
          done();
        }).catch(done.fail);
      });
    });
    describe('sendDeleteWidgets', () => {
      it('calls removeWidgets and router', (done) => {
        store.dispatch(sendDeleteWidgets('WDG')).then(() => {
          expect(deleteWidgets).toHaveBeenCalled();
          const actions = store.getActions();
          expect(actions).toHaveLength(2);
          expect(actions[0]).toHaveProperty('type', REMOVE_WIDGET);
          expect(actions[1]).toHaveProperty('type', ADD_TOAST);
          expect(history.push).toHaveBeenCalledWith(ROUTE_WIDGET_LIST);
          done();
        }).catch(done.fail);
      });

      it('if API response is not ok, dispatch ADD_ERRORS', (done) => {
        deleteWidgets.mockImplementation(mockApi({ errors: true }));
        store.dispatch(sendDeleteWidgets()).then(() => {
          expect(deleteWidgets).toHaveBeenCalled();
          const actions = store.getActions();
          expect(actions).toHaveLength(2);
          expect(actions[0]).toHaveProperty('type', ADD_ERRORS);
          expect(actions[1]).toHaveProperty('type', ADD_TOAST);
          done();
        }).catch(done.fail);
      });
    });
  });
});
