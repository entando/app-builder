import { isFSA } from 'flux-standard-action';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { initialize } from 'redux-form';
import { gotoRoute } from 'frontend-common-components';


import { mockApi } from 'test/testUtils';

import { SET_WIDGET_LIST, SET_SELECTED_WIDGET, REMOVE_WIDGET } from 'state/widgets/types';
import { ADD_ERRORS } from 'state/errors/types';
import {
  getWidgetList,
  fetchWidgetList,
  fetchWidget,
  sendPostWidgets,
  sendPutWidgets,
  sendDeleteWidgets,
  loadSelectedWidget,
  setSelectedWidget,
  removeWidget,
}
  from 'state/widgets/actions';
import { getSelectedWidget } from 'state/widgets/selectors';
import { TOGGLE_LOADING } from 'state/loading/types';
import { ROUTE_WIDGET_LIST } from 'app-init/router';

import { SET_PAGE } from 'state/pagination/types';
import {
  getWidget,
  getWidgets,
  postWidgets,
  putWidgets,
  deleteWidgets,
} from 'api/widgets';
import { WIDGET, WIDGET_LIST } from 'test/mocks/widgets';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const WIDGET_CODE = 'WDG';

jest.mock('state/widgets/selectors', () => ({
  getSelectedWidget: jest.fn(),
}));


describe('state/widgets/actions', () => {
  let store;
  let action;
  beforeEach(() => {
    jest.clearAllMocks();
    store = mockStore({});
  });

  describe('getWidgetList', () => {
    beforeEach(() => {
      action = getWidgetList(WIDGET_LIST);
    });

    it('is FSA compliant', () => {
      expect(isFSA(action)).toBe(true);
    });

    it('actions is correct setup ', () => {
      expect(action).toHaveProperty('type', SET_WIDGET_LIST);
      expect(action).toHaveProperty('payload.widgetList', WIDGET_LIST);
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
          expect(store.getActions()).toHaveLength(1);
          done();
        }).catch(done.fail);
      });

      it('if there is no widget selected, fetch and select the new widget', (done) => {
        getSelectedWidget.mockReturnValue(null);
        store.dispatch(loadSelectedWidget(WIDGET.code)).then(() => {
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

    describe('fetchWidget', () => {
      it('if API response is ok, initializes the form with widget information', (done) => {
        getWidget.mockImplementation(mockApi({ payload: WIDGET }));
        store.dispatch(fetchWidget()).then(() => {
          const actions = store.getActions();
          expect(actions).toHaveLength(2);
          expect(initialize).toHaveBeenCalled();
          expect(actions[1]).toHaveProperty('type', SET_SELECTED_WIDGET);
          expect(actions[1]).toHaveProperty('payload');
          expect(actions[1].payload).toMatchObject({ widget: WIDGET });
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

    describe('fetchWidgetList', () => {
      it('calls setWidgetList and setPage action', (done) => {
        getWidgets.mockImplementation(mockApi({ payload: WIDGET_LIST }));
        store.dispatch(fetchWidgetList()).then(() => {
          expect(getWidgets).toHaveBeenCalled();
          const actions = store.getActions();
          expect(actions).toHaveLength(4);
          expect(actions[0]).toHaveProperty('type', TOGGLE_LOADING);
          expect(actions[1]).toHaveProperty('type', SET_WIDGET_LIST);
          expect(actions[1]).toHaveProperty('payload');
          expect(actions[2].type).toEqual(SET_PAGE);
          expect(actions[3].type).toEqual(TOGGLE_LOADING);
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
          expect(actions).toHaveLength(3);
          expect(actions[0]).toHaveProperty('type', TOGGLE_LOADING);
          expect(actions[1]).toHaveProperty('type', ADD_ERRORS);
          expect(actions[2]).toHaveProperty('type', TOGGLE_LOADING);
          done();
        }).catch(done.fail);
      });
    });

    describe('sendPostWidgets', () => {
      it('calls gotoRoute', (done) => {
        store.dispatch(sendPostWidgets()).then(() => {
          expect(postWidgets).toHaveBeenCalled();
          expect(gotoRoute).toHaveBeenCalledWith(ROUTE_WIDGET_LIST);
          done();
        }).catch(done.fail);
      });

      it('if API response is not ok, dispatch ADD_ERRORS', (done) => {
        postWidgets.mockImplementation(mockApi({ errors: true }));
        store.dispatch(sendPostWidgets()).then(() => {
          expect(postWidgets).toHaveBeenCalled();
          const actions = store.getActions();
          expect(actions).toHaveLength(1);
          expect(actions[0]).toHaveProperty('type', ADD_ERRORS);
          done();
        }).catch(done.fail);
      });
    });

    describe('sendPutWidgets', () => {
      it('calls gotoRoute', (done) => {
        store.dispatch(sendPutWidgets('WDG', WIDGET)).then(() => {
          expect(putWidgets).toHaveBeenCalled();
          expect(gotoRoute).toHaveBeenCalledWith(ROUTE_WIDGET_LIST);
          done();
        }).catch(done.fail);
      });

      it('if API response is not ok, dispatch ADD_ERRORS', (done) => {
        putWidgets.mockImplementation(mockApi({ errors: true }));
        store.dispatch(sendPutWidgets()).then(() => {
          expect(putWidgets).toHaveBeenCalled();
          const actions = store.getActions();
          expect(actions).toHaveLength(1);
          expect(actions[0]).toHaveProperty('type', ADD_ERRORS);
          done();
        }).catch(done.fail);
      });
    });
    describe('sendDeleteWidgets', () => {
      it('calls removeWidgets and gotoRoute', (done) => {
        store.dispatch(sendDeleteWidgets('WDG')).then(() => {
          expect(deleteWidgets).toHaveBeenCalled();
          const actions = store.getActions();
          expect(actions).toHaveLength(1);
          expect(actions[0]).toHaveProperty('type', REMOVE_WIDGET);
          expect(gotoRoute).toHaveBeenCalledWith(ROUTE_WIDGET_LIST);
          done();
        }).catch(done.fail);
      });

      it('if API response is not ok, dispatch ADD_ERRORS', (done) => {
        deleteWidgets.mockImplementation(mockApi({ errors: true }));
        store.dispatch(sendDeleteWidgets()).then(() => {
          expect(deleteWidgets).toHaveBeenCalled();
          const actions = store.getActions();
          expect(actions).toHaveLength(1);
          expect(actions[0]).toHaveProperty('type', ADD_ERRORS);
          done();
        }).catch(done.fail);
      });
    });
  });
});
