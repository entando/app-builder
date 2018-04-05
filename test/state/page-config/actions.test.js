import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { initialize } from 'redux-form';

import { mockApi } from 'test/testUtils';

import rootReducer from 'state/rootReducer';
import {
  initConfigPage, setPageWidget, removePageWidgetSync, removePageWidget, fetchPageConfig,
  updatePageWidget, setSelectedPageOnTheFly, restoreSelectedPageConfig, applyDefaultConfig,
  editWidgetConfig, configOrUpdatePageWidget,
} from 'state/page-config/actions';

import { loadSelectedPage } from 'state/pages/actions';

import { ADD_ERRORS } from 'state/errors/types';
import { SET_PAGE_CONFIG, SET_PUBLISHED_PAGE_CONFIG, SET_PAGE_WIDGET, REMOVE_PAGE_WIDGET } from 'state/page-config/types';

import { HOMEPAGE_PAYLOAD, CONTACTS_PAYLOAD } from 'test/mocks/pages';
import { COMPLEX_RESPONSE } from 'test/mocks/pageModels';

// mocked
import { getParams, gotoRoute } from 'frontend-common-components';
import { deletePageWidget, putPageWidget, restorePageConfig, applyDefaultPageConfig, getPageConfig } from 'api/pages';
import { loadSelectedPageModel } from 'state/page-models/actions';
import { getSelectedPageModelMainFrame, getSelectedPageModelDefaultConfig } from 'state/page-models/selectors';
import { getPublishedConfigMap, getSelectedPageConfig } from 'state/page-config/selectors';
import { getWidgetsMap } from 'state/widgets/selectors';
import { validatePageModel } from 'state/page-models/helpers';


jest.mock('api/pages', () => ({
  getPage: jest.fn(),
  getPageConfig: jest.fn(),
  deletePageWidget: jest.fn(),
  putPageWidget: jest.fn(),
  restorePageConfig: jest.fn(),
  applyDefaultPageConfig: jest.fn().mockReturnValue(new Promise(r => r([]))),
}));

jest.mock('api/pageModels', () => ({
  getPageModel: jest.fn(),
}));

jest.mock('state/errors/actions', () => ({
  addErrors: jest.fn().mockImplementation(require.requireActual('state/errors/actions').addErrors),
}));

jest.mock('state/pages/actions', () => ({
  loadSelectedPage: jest.fn(),
}));

jest.mock('state/page-models/actions', () => ({
  setSelectedPageModel: jest.fn()
    .mockImplementation(require.requireActual('state/page-models/actions').setSelectedPageModel),
  loadSelectedPageModel: jest.fn(),
}));

jest.mock('state/page-models/helpers', () => ({
  validatePageModel: jest.fn(),
}));

jest.mock('state/page-models/selectors', () => ({
  getSelectedPageModelMainFrame: jest.fn(),
  getSelectedPageModelCellMap: jest.fn(),
  getSelectedPageModelDefaultConfig: jest.fn(),
}));

jest.mock('state/page-config/selectors', () => ({
  getPublishedConfigMap: jest.fn(),
  getSelectedPageConfig: jest.fn(),
}));

jest.mock('state/widgets/selectors', () => ({
  getWidgetsMap: jest.fn(),
}));


const mockStore = configureStore([thunk]);
const INITIAL_STATE = rootReducer();

const CURRENT_PAGE_CODE = 'homepage';


const resolveRespOk = () => new Promise(r => r({ ok: true }));
const resolveRespNotOk = () => new Promise(r => r({ ok: false }));
getPageConfig.mockImplementation(mockApi({ payload: [] }));


describe('state/page-config/actions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    deletePageWidget.mockImplementation(resolveRespOk);
    putPageWidget.mockImplementation(resolveRespOk);
    restorePageConfig.mockImplementation(resolveRespOk);
    applyDefaultPageConfig.mockImplementation(resolveRespOk);
    getParams.mockReturnValue({ pageCode: CURRENT_PAGE_CODE });
  });

  let store;

  describe('setPageWidget()', () => {
    const WIDGET_ID = 'widget_code';
    const FRAME_ID = 1;
    const OLD_FRAME_ID = 2;
    let action;

    beforeEach(() => {
      action = setPageWidget(CURRENT_PAGE_CODE, WIDGET_ID, OLD_FRAME_ID, FRAME_ID);
    });

    it('returns an action with the correct action type', () => {
      expect(action.type).toBe(SET_PAGE_WIDGET);
    });

    it('returns an action with a well formed payload', () => {
      expect(action.payload).toEqual({
        pageCode: CURRENT_PAGE_CODE,
        widgetId: WIDGET_ID,
        targetFrameId: FRAME_ID,
        sourceFrameId: OLD_FRAME_ID,
      });
    });
  });

  describe('removePageWidgetSync()', () => {
    const FRAME_ID = 1;
    let action;

    beforeEach(() => {
      action = removePageWidgetSync(CURRENT_PAGE_CODE, FRAME_ID);
    });

    it('returns an action with the correct action type', () => {
      expect(action.type).toBe(REMOVE_PAGE_WIDGET);
    });

    it('returns an action with a well formed payload', () => {
      expect(action.payload).toEqual({
        pageCode: CURRENT_PAGE_CODE,
        frameId: FRAME_ID,
      });
    });
  });


  describe('initConfigPage()', () => {
    beforeEach(() => {
      loadSelectedPage.mockImplementation(() => () => new Promise(r => r(HOMEPAGE_PAYLOAD)));
      loadSelectedPageModel.mockImplementation(() => () => new Promise(r => r(COMPLEX_RESPONSE)));
      validatePageModel.mockReturnValue([]);
      store = mockStore(INITIAL_STATE);
    });

    it('if there is no selected page, dispatch nothing', (done) => {
      loadSelectedPage.mockImplementation(() => () => new Promise(r => r(null)));
      store.dispatch(initConfigPage()).then(() => {
        expect(store.getActions()).toHaveLength(0);
        done();
      }).catch(done.fail);
    });

    it('if there is no page model, dispatch nothing', (done) => {
      loadSelectedPageModel.mockImplementation(() => () => new Promise(r => r(null)));
      store.dispatch(initConfigPage()).then(() => {
        expect(store.getActions()).toHaveLength(0);
        done();
      }).catch(done.fail);
    });

    it('when GET /page/<code> returns a non valid page model, it dispatch ADD_ERRORS', (done) => {
      validatePageModel.mockImplementation(() => [{ id: 'message.id' }]);
      store.dispatch(initConfigPage()).then(() => {
        const actionTypes = store.getActions().map(action => action.type);
        expect(actionTypes).toEqual([ADD_ERRORS]);
        done();
      }).catch(done.fail);
    });

    it('when API responses are ok and the page is published', (done) => {
      store.dispatch(initConfigPage()).then(() => {
        expect(loadSelectedPageModel).toHaveBeenCalledWith(HOMEPAGE_PAYLOAD.pageModel);
        const actionTypes = store.getActions().map(action => action.type);
        expect(actionTypes).toEqual([]);
        done();
      }).catch(done.fail);
    });

    it('when one of the awaited promises rejects', (done) => {
      global.console.log = jest.fn();
      loadSelectedPage.mockImplementation(() => () => new Promise((a, r) => r()));
      store.dispatch(initConfigPage()).then(() => {
        expect(global.console.log).toHaveBeenCalled();
        expect(store.getActions()).toEqual([]);
        done();
      }).catch(done.fail);
    });

    it('when API responses are ok and the page is not published', (done) => {
      loadSelectedPage.mockImplementation(() => () => new Promise(r => r(CONTACTS_PAYLOAD)));
      store.dispatch(initConfigPage()).then(() => {
        expect(loadSelectedPageModel).toHaveBeenCalledWith(CONTACTS_PAYLOAD.pageModel);
        const actionTypes = store.getActions().map(action => action.type);
        expect(actionTypes)
          .toEqual([SET_PUBLISHED_PAGE_CONFIG]);
        expect(store.getActions()[0].payload).toEqual({
          pageCode: CURRENT_PAGE_CODE,
          pageConfig: null,
        });
        done();
      }).catch(done.fail);
    });
  });

  describe('fetchPageConfig()', () => {
    beforeEach(() => {
      store = mockStore(INITIAL_STATE);
    });

    it('if fetching draft config and API response is OK', (done) => {
      getPageConfig.mockImplementation(mockApi({ payload: [] }));
      store.dispatch(fetchPageConfig(CURRENT_PAGE_CODE, 'draft')).then(() => {
        expect(getPageConfig).toHaveBeenCalledWith(CURRENT_PAGE_CODE, 'draft');
        const actionTypes = store.getActions().map(action => action.type);
        expect(actionTypes).toEqual([SET_PAGE_CONFIG]);
        done();
      }).catch(done.fail);
    });

    it('if fetching published config and API response is OK', (done) => {
      getPageConfig.mockImplementation(mockApi({ payload: [] }));
      store.dispatch(fetchPageConfig(CURRENT_PAGE_CODE, 'published')).then(() => {
        expect(getPageConfig).toHaveBeenCalledWith(CURRENT_PAGE_CODE, 'published');
        const actionTypes = store.getActions().map(action => action.type);
        expect(actionTypes).toEqual([SET_PUBLISHED_PAGE_CONFIG]);
        done();
      }).catch(done.fail);
    });

    it('if fetching draft config and API response is not OK', (done) => {
      getPageConfig.mockImplementation(mockApi({ errors: true }));
      store.dispatch(fetchPageConfig(CURRENT_PAGE_CODE, 'draft')).then(() => {
        expect(getPageConfig).toHaveBeenCalledWith(CURRENT_PAGE_CODE, 'draft');
        const actionTypes = store.getActions().map(action => action.type);
        expect(actionTypes).toEqual([ADD_ERRORS]);
        done();
      }).catch(done.fail);
    });
  });

  describe('removePageWidget()', () => {
    const FRAME_ID = 3;
    beforeEach(() => {
      store = mockStore(INITIAL_STATE);
    });

    it('calls DELETE page widget API and dispatches REMOVE_PAGE_WIDGET', (done) => {
      store.dispatch(removePageWidget(FRAME_ID)).then(() => {
        const actionTypes = store.getActions().map(action => action.type);
        expect(actionTypes).toEqual([REMOVE_PAGE_WIDGET]);
        expect(deletePageWidget).toHaveBeenCalledWith(CURRENT_PAGE_CODE, FRAME_ID);
        done();
      }).catch(done.fail);
    });
  });

  describe('updatePageWidget()', () => {
    const WIDGET_CODE = 'widget_code';
    const FRAME_ID = 1;
    const OLD_FRAME_ID = 0;
    beforeEach(() => {
      store = mockStore(INITIAL_STATE);
    });

    it('calls PUT page widget API and dispatches SET_PAGE_WIDGET', (done) => {
      putPageWidget.mockImplementation(mockApi({}));
      getSelectedPageConfig.mockReturnValue([{ type: 'some' }, null]);
      store.dispatch(updatePageWidget(WIDGET_CODE, OLD_FRAME_ID, FRAME_ID)).then(() => {
        const actionTypes = store.getActions().map(action => action.type);
        expect(actionTypes).toEqual([SET_PAGE_WIDGET]);
        expect(putPageWidget)
          .toHaveBeenCalledWith(CURRENT_PAGE_CODE, FRAME_ID, { type: WIDGET_CODE });
        done();
      }).catch(done.fail);
    });
  });

  describe('setSelectedPageOnTheFly()', () => {
    beforeEach(() => {
      store = mockStore(INITIAL_STATE);
    });

    it('dispatches REMOVE_PAGE_WIDGET if value = false', (done) => {
      getSelectedPageModelMainFrame.mockReturnValue({ pos: 3 });
      store.dispatch(setSelectedPageOnTheFly(false)).then(() => {
        const actionTypes = store.getActions().map(action => action.type);
        expect(actionTypes).toEqual([REMOVE_PAGE_WIDGET]);
        done();
      }).catch(done.fail);
    });

    it('dispatches SET_PAGE_WIDGET if value = true', (done) => {
      getSelectedPageModelMainFrame.mockReturnValue({ pos: 3 });
      store.dispatch(setSelectedPageOnTheFly(true)).then(() => {
        const actionTypes = store.getActions().map(action => action.type);
        expect(actionTypes).toEqual([SET_PAGE_WIDGET]);
        done();
      }).catch(done.fail);
    });

    it('dispatches nothing if there is no main frame', (done) => {
      getSelectedPageModelMainFrame.mockReturnValue(null);
      store.dispatch(setSelectedPageOnTheFly(true)).then(() => {
        expect(store.getActions()).toHaveLength(0);
        done();
      }).catch(done.fail);
    });
  });

  describe('restoreSelectedPageConfig()', () => {
    beforeEach(() => {
      store = mockStore(INITIAL_STATE);
      getPublishedConfigMap.mockReturnValue({ [CURRENT_PAGE_CODE]: [null, null] });
    });

    it('does not dispatch if the api response is not ok', (done) => {
      restorePageConfig.mockImplementation(() => new Promise(r => r({ ok: false })));
      store.dispatch(restoreSelectedPageConfig()).then(() => {
        expect(restorePageConfig).toHaveBeenCalled();
        expect(store.getActions()).toHaveLength(0);
        done();
      }).catch(done.fail);
    });

    it('dispatches SET_PAGE_CONFIG', (done) => {
      store.dispatch(restoreSelectedPageConfig()).then(() => {
        expect(restorePageConfig).toHaveBeenCalledWith(CURRENT_PAGE_CODE);
        const actionTypes = store.getActions().map(action => action.type);
        expect(actionTypes).toEqual([SET_PAGE_CONFIG]);
        done();
      }).catch(done.fail);
    });

    it('does nothing if there is no pageCode parameter', (done) => {
      getParams.mockReturnValue({});
      store.dispatch(restoreSelectedPageConfig()).then(() => {
        expect(restorePageConfig).not.toHaveBeenCalled();
        expect(store.getActions()).toHaveLength(0);
        done();
      }).catch(done.fail);
    });

    it('does nothing if there is no config for the current page', (done) => {
      getPublishedConfigMap.mockReturnValue({});
      store.dispatch(restoreSelectedPageConfig()).then(() => {
        expect(restorePageConfig).not.toHaveBeenCalled();
        expect(store.getActions()).toHaveLength(0);
        done();
      }).catch(done.fail);
    });
  });

  describe('applyDefaultConfig()', () => {
    beforeEach(() => {
      store = mockStore(INITIAL_STATE);
      getSelectedPageModelDefaultConfig.mockReturnValue([null, null]);
    });

    it('dispatches SET_PAGE_CONFIG', (done) => {
      store.dispatch(applyDefaultConfig()).then(() => {
        expect(applyDefaultPageConfig).toHaveBeenCalledWith(CURRENT_PAGE_CODE);
        const actionTypes = store.getActions().map(action => action.type);
        expect(actionTypes).toEqual([SET_PAGE_CONFIG]);
        done();
      }).catch(done.fail);
    });

    it('does nothing if there is no pageCode parameter', (done) => {
      getParams.mockReturnValue({});
      store.dispatch(applyDefaultConfig()).then(() => {
        expect(applyDefaultPageConfig).not.toHaveBeenCalled();
        expect(store.getActions()).toHaveLength(0);
        done();
      }).catch(done.fail);
    });

    it('does not dispatch if response is not ok', (done) => {
      applyDefaultPageConfig.mockImplementation(resolveRespNotOk);
      store.dispatch(applyDefaultConfig()).then(() => {
        expect(applyDefaultPageConfig).toHaveBeenCalled();
        expect(store.getActions()).toHaveLength(0);
        done();
      }).catch(done.fail);
    });
  });

  describe('editWidgetConfig(frameId)', () => {
    beforeEach(() => {
      getSelectedPageConfig.mockReturnValue([
        null,
        { type: 'widget_code', config: {} },
      ]);
      store = mockStore(INITIAL_STATE);
    });

    it('if there is no selected page config, dispatch nothing', () => {
      getSelectedPageConfig.mockReturnValue(null);
      store.dispatch(editWidgetConfig(0));
      expect(getSelectedPageConfig).toHaveBeenCalled();
      expect(store.getActions()).toHaveLength(0);
    });

    it('if there is selected page config but the frame has no config, dispatch nothing', () => {
      store.dispatch(editWidgetConfig(0));
      expect(getSelectedPageConfig).toHaveBeenCalled();
      expect(store.getActions()).toHaveLength(0);
    });

    it('if there is selected page config and the frame has config, dispatch initialize', () => {
      store.dispatch(editWidgetConfig(1));
      expect(initialize).toHaveBeenCalled();
      expect(store.getActions()).toHaveLength(1);
    });
  });

  describe('configOrUpdatePageWidget()', () => {
    beforeEach(() => {
      getWidgetsMap.mockReturnValue({
        WIDGET_NO_CONFIG: { code: 'WIDGET_NO_CONFIG', hasConfig: false },
        WIDGET_WITH_CONFIG: { type: 'WIDGET_WITH_CONFIG', hasConfig: true },
      });
      getSelectedPageConfig.mockReturnValue([
        null,
        { type: 'WIDGET_NO_CONFIG' },
        { type: 'WIDGET_WITH_CONFIG', config: { key: 'value' } },
      ]);
      store = mockStore(INITIAL_STATE);
    });

    it('if the widget needs no config, should update the widget state', (done) => {
      store.dispatch(configOrUpdatePageWidget('WIDGET_NO_CONFIG', 0, 0)).then(() => {
        expect(getSelectedPageConfig).toHaveBeenCalled();
        expect(getWidgetsMap).toHaveBeenCalled();
        expect(store.getActions()).toHaveLength(1);
        expect(store.getActions()[0]).toHaveProperty('type', SET_PAGE_WIDGET);
        done();
      }).catch(done.fail);
    });

    it('if the widget is already configured, should update the widget state', (done) => {
      store.dispatch(configOrUpdatePageWidget('WIDGET_WITH_CONFIG', 2, 0)).then(() => {
        expect(getSelectedPageConfig).toHaveBeenCalled();
        expect(getWidgetsMap).toHaveBeenCalled();
        expect(store.getActions()).toHaveLength(1);
        expect(store.getActions()[0]).toHaveProperty('type', SET_PAGE_WIDGET);
        done();
      }).catch(done.fail);
    });

    it('if the widget needs config, should go to the widget config route', (done) => {
      store.dispatch(configOrUpdatePageWidget('WIDGET_WITH_CONFIG', 0, 0)).then(() => {
        expect(getSelectedPageConfig).toHaveBeenCalled();
        expect(getWidgetsMap).toHaveBeenCalled();
        expect(store.getActions()).toHaveLength(0);
        expect(gotoRoute).toHaveBeenCalled();
        done();
      }).catch(done.fail);
    });
  });
});
