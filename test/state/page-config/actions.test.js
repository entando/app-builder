import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { initialize } from 'redux-form';
import { ADD_ERRORS, ADD_TOAST } from '@entando/messages';

import { mockApi } from 'test/testUtils';

import rootReducer from 'state/rootReducer';
import {
  initConfigPage, setPageWidget, removePageWidgetSync, removePageWidget, fetchPageConfig,
  updatePageWidget, setSelectedPageOnTheFly, restoreSelectedPageConfig, applyDefaultConfig,
  editWidgetConfig, configOrUpdatePageWidget,
} from 'state/page-config/actions';

import { loadSelectedPage } from 'state/pages/actions';

import { SET_PAGE_CONFIG, SET_PUBLISHED_PAGE_CONFIG, SET_PAGE_WIDGET, REMOVE_PAGE_WIDGET } from 'state/page-config/types';
import { SET_SELECTED_PAGE } from 'state/pages/types';
import { PAGE_STATUS_DRAFT, HOMEPAGE_CODE } from 'state/pages/const';
import { TOGGLE_LOADING } from 'state/loading/types';

import { HOMEPAGE_PAYLOAD, CONTACTS_PAYLOAD } from 'test/mocks/pages';
import { COMPLEX_RESPONSE } from 'test/mocks/pageTemplates';

// mocked
import { deletePageWidget, putPageWidget, restorePageConfig, applyDefaultPageConfig, getPageConfig } from 'api/pages';
import { loadSelectedPageTemplate } from 'state/page-templates/actions';
import { getSelectedPageTemplateMainFrame, getSelectedPageTemplateDefaultConfig } from 'state/page-templates/selectors';
import { getPublishedConfigMap, makeGetSelectedPageConfig } from 'state/page-config/selectors';
import { getWidgetsMap } from 'state/widgets/selectors';
import { getSelectedPage, getSelectedPageIsPublished } from 'state/pages/selectors';
import { validatePageTemplate } from 'state/page-templates/helpers';
import { history } from 'app-init/router';

jest.mock('api/pages', () => ({
  getPage: jest.fn(),
  getPageConfig: jest.fn(),
  deletePageWidget: jest.fn(),
  putPageWidget: jest.fn(),
  restorePageConfig: jest.fn(),
  applyDefaultPageConfig: jest.fn().mockReturnValue(new Promise(r => r([]))),
}));

jest.mock('api/pageTemplates', () => ({
  getPageTemplate: jest.fn(),
}));

jest.mock('state/pages/actions', () => ({
  loadSelectedPage: jest.fn(),
  setSelectedPage: jest.fn()
    .mockImplementation(require.requireActual('state/pages/actions').setSelectedPage),
}));

jest.mock('state/page-templates/actions', () => ({
  setSelectedPageTemplate: jest.fn()
    .mockImplementation(require.requireActual('state/page-templates/actions').setSelectedPageTemplate),
  loadSelectedPageTemplate: jest.fn(),
}));

jest.mock('state/page-templates/helpers', () => ({
  validatePageTemplate: jest.fn(),
}));

jest.mock('state/page-templates/selectors', () => ({
  getSelectedPageTemplateMainFrame: jest.fn(),
  getSelectedPageTemplateCellMap: jest.fn(),
  getSelectedPageTemplateDefaultConfig: jest.fn(),
}));

jest.mock('state/page-config/selectors', () => ({
  getPublishedConfigMap: jest.fn(),
  makeGetSelectedPageConfig: jest.fn(() => jest.fn()),
}));

jest.mock('state/widgets/selectors', () => ({
  getWidgetsMap: jest.fn(),
}));

jest.mock('state/pages/selectors', () => ({
  getSelectedPage: jest.fn(),
  getSelectedPageIsPublished: jest.fn(),
}));

history.push = jest.fn();

const mockStore = configureStore([thunk]);
const INITIAL_STATE = rootReducer();

const CURRENT_PAGE_CODE = HOMEPAGE_CODE;


const resolveRespOk = () => new Promise(r => r({ ok: true }));
const resolveRespNotOk = () => new Promise(r => r({ ok: false }));
getPageConfig.mockImplementation(mockApi({ payload: [] }));


describe('state/page-config/actions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    deletePageWidget.mockImplementation(mockApi({}));
    putPageWidget.mockImplementation(resolveRespOk);
    restorePageConfig.mockImplementation(resolveRespOk);
    applyDefaultPageConfig.mockImplementation(resolveRespOk);
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
      loadSelectedPageTemplate.mockImplementation(() => () => new Promise(r => r(COMPLEX_RESPONSE)));
      validatePageTemplate.mockReturnValue([]);
      store = mockStore(INITIAL_STATE);
    });

    it('if there is no selected page, dispatch nothing', (done) => {
      loadSelectedPage.mockImplementation(() => () => new Promise(r => r(null)));
      store.dispatch(initConfigPage(CURRENT_PAGE_CODE)).then(() => {
        expect(store.getActions()).toHaveLength(0);
        done();
      }).catch(done.fail);
    });

    it('if there is no page template, dispatch nothing', (done) => {
      loadSelectedPageTemplate.mockImplementation(() => () => new Promise(r => r(null)));
      store.dispatch(initConfigPage()).then(() => {
        expect(store.getActions()).toHaveLength(0);
        done();
      }).catch(done.fail);
    });

    it('when GET /page/<code> returns a non valid page template, it dispatch ADD_ERRORS', (done) => {
      validatePageTemplate.mockImplementation(() => [{ id: 'message.id' }]);
      store.dispatch(initConfigPage()).then(() => {
        const actionTypes = store.getActions().map(action => action.type);
        expect(actionTypes).toEqual([ADD_ERRORS, ADD_TOAST]);
        done();
      }).catch(done.fail);
    });

    it('when API responses are ok and the page is published', (done) => {
      store.dispatch(initConfigPage(CURRENT_PAGE_CODE)).then(() => {
        expect(loadSelectedPageTemplate).toHaveBeenCalledWith(HOMEPAGE_PAYLOAD.pageModel);
        const actionTypes = store.getActions().map(action => action.type);
        expect(actionTypes.length).toEqual(2);
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
      store.dispatch(initConfigPage(CURRENT_PAGE_CODE)).then(() => {
        expect(loadSelectedPageTemplate).toHaveBeenCalledWith(CONTACTS_PAYLOAD.pageModel);
        const actionTypes = store.getActions().map(action => action.type);
        expect(actionTypes)
          .toEqual([TOGGLE_LOADING, SET_PUBLISHED_PAGE_CONFIG]);
        expect(store.getActions()[0].payload).toEqual({
          id: 'pageConfig',
        });
        expect(store.getActions()[1].payload).toEqual({
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
        expect(actionTypes).toEqual([TOGGLE_LOADING, TOGGLE_LOADING, SET_PAGE_CONFIG]);
        done();
      }).catch(done.fail);
    });

    it('if fetching published config and API response is OK', (done) => {
      getPageConfig.mockImplementation(mockApi({ payload: [] }));
      store.dispatch(fetchPageConfig(CURRENT_PAGE_CODE, 'published')).then(() => {
        expect(getPageConfig).toHaveBeenCalledWith(CURRENT_PAGE_CODE, 'published');
        const actionTypes = store.getActions().map(action => action.type);
        expect(actionTypes).toEqual([TOGGLE_LOADING, TOGGLE_LOADING, SET_PUBLISHED_PAGE_CONFIG]);
        done();
      }).catch(done.fail);
    });

    it('if fetching draft config and API response is not OK', (done) => {
      getPageConfig.mockImplementation(mockApi({ errors: true }));
      store.dispatch(fetchPageConfig(CURRENT_PAGE_CODE, 'draft')).then(() => {
        expect(getPageConfig).toHaveBeenCalledWith(CURRENT_PAGE_CODE, 'draft');
        const actionTypes = store.getActions().map(action => action.type);
        expect(actionTypes).toEqual([TOGGLE_LOADING, TOGGLE_LOADING, ADD_ERRORS, ADD_TOAST]);
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
      store.dispatch(removePageWidget(FRAME_ID, CURRENT_PAGE_CODE)).then(() => {
        const actionTypes = store.getActions().map(action => action.type);
        expect(actionTypes).toEqual([REMOVE_PAGE_WIDGET]);
        expect(deletePageWidget).toHaveBeenCalledWith(CURRENT_PAGE_CODE, FRAME_ID);
        done();
      }).catch(done.fail);
    });

    it('dispatches SET_SELECTED_PAGE with draft status when page status is published', (done) => {
      getSelectedPage.mockReturnValue(HOMEPAGE_PAYLOAD);
      getSelectedPageIsPublished.mockReturnValue(true);
      store.dispatch(removePageWidget(FRAME_ID, CURRENT_PAGE_CODE)).then(() => {
        const actions = store.getActions();
        const actionTypes = actions.map(action => action.type);
        const actionPayloads = actions.map(action => action.payload);
        expect(actionTypes[1]).toEqual(SET_SELECTED_PAGE);
        expect(actionPayloads[1].page.status).toEqual(PAGE_STATUS_DRAFT);
        done();
      }).catch(done.fail);
    });
  });

  describe('updatePageWidget()', () => {
    const WIDGET_CODE = 'widget_code';
    const FRAME_ID = 1;
    const OLD_FRAME_ID = 0;
    beforeEach(() => {
      putPageWidget.mockImplementation(mockApi({}));
      deletePageWidget.mockImplementation(mockApi({}));
      makeGetSelectedPageConfig.mockImplementation(() => () => [{ type: 'some' }, null]);
      store = mockStore(INITIAL_STATE);
    });

    describe('if source frame id is defined (dragging a widget from another frame)', () => {
      it('calls DELETE page widget API to empty the source frame', (done) => {
        store.dispatch(updatePageWidget(
          WIDGET_CODE,
          OLD_FRAME_ID,
          FRAME_ID,
          CURRENT_PAGE_CODE,
        )).then(() => {
          expect(deletePageWidget)
            .toHaveBeenCalledWith(CURRENT_PAGE_CODE, OLD_FRAME_ID);
          done();
        }).catch(done.fail);
      });

      it('calls PUT page widget API to put the widget to the target frame', (done) => {
        store.dispatch(updatePageWidget(
          WIDGET_CODE,
          OLD_FRAME_ID,
          FRAME_ID,
          CURRENT_PAGE_CODE,
        )).then(() => {
          expect(putPageWidget)
            .toHaveBeenCalledWith(CURRENT_PAGE_CODE, FRAME_ID, { code: WIDGET_CODE });
          done();
        }).catch(done.fail);
      });

      it('dispatches SET_PAGE_WIDGET to update the state', (done) => {
        store.dispatch(updatePageWidget(
          WIDGET_CODE,
          OLD_FRAME_ID,
          FRAME_ID,
          CURRENT_PAGE_CODE,
        )).then(() => {
          const actionTypes = store.getActions().map(action => action.type);
          expect(actionTypes).toContain(SET_PAGE_WIDGET);
          done();
        }).catch(done.fail);
      });
    });

    describe('if source frame id is null or undefined (dragging a new widget)', () => {
      it('it does not call DELETE page widget API to empty the source frame', (done) => {
        store.dispatch(updatePageWidget(
          WIDGET_CODE,
          null,
          FRAME_ID,
          CURRENT_PAGE_CODE,
        )).then(() => {
          expect(deletePageWidget).not.toHaveBeenCalled();
          done();
        }).catch(done.fail);
      });

      it('calls PUT page widget API to put the widget to the target frame', (done) => {
        store.dispatch(updatePageWidget(
          WIDGET_CODE,
          null,
          FRAME_ID,
          CURRENT_PAGE_CODE,
        )).then(() => {
          expect(putPageWidget)
            .toHaveBeenCalledWith(CURRENT_PAGE_CODE, FRAME_ID, { code: WIDGET_CODE });
          done();
        }).catch(done.fail);
      });

      it('dispatches SET_PAGE_WIDGET to update the state', (done) => {
        store.dispatch(updatePageWidget(
          WIDGET_CODE,
          null,
          FRAME_ID,
          CURRENT_PAGE_CODE,
        )).then(() => {
          const actionTypes = store.getActions().map(action => action.type);
          expect(actionTypes).toContain(SET_PAGE_WIDGET);
          done();
        }).catch(done.fail);
      });
    });

    it('it does not call DELETE page widget if source frameId is null or undefined', (done) => {
      putPageWidget.mockImplementation(mockApi({}));
      deletePageWidget.mockImplementation(mockApi({}));
      makeGetSelectedPageConfig.mockImplementation(() => () => [{ type: 'some' }, null]);
      store.dispatch(updatePageWidget(
        WIDGET_CODE,
        undefined,
        FRAME_ID,
        CURRENT_PAGE_CODE,
      )).then(() => {
        const actionTypes = store.getActions().map(action => action.type);
        expect(actionTypes).toContain(SET_PAGE_WIDGET);
        expect(deletePageWidget).not.toHaveBeenCalled();
        expect(putPageWidget)
          .toHaveBeenCalledWith(CURRENT_PAGE_CODE, FRAME_ID, { code: WIDGET_CODE });
        done();
      }).catch(done.fail);
    });

    it('dispatches SET_SELECTED_PAGE with draft status when page status is published', (done) => {
      getSelectedPage.mockReturnValue(HOMEPAGE_PAYLOAD);
      getSelectedPageIsPublished.mockReturnValue(true);
      store.dispatch(updatePageWidget(
        WIDGET_CODE,
        OLD_FRAME_ID,
        FRAME_ID,
        CURRENT_PAGE_CODE,
      )).then(() => {
        const actions = store.getActions();
        const actionTypes = actions.map(action => action.type);
        const actionPayloads = actions.map(action => action.payload);
        expect(actionTypes[1]).toEqual(SET_SELECTED_PAGE);
        expect(actionPayloads[1].page.status).toEqual(PAGE_STATUS_DRAFT);
        done();
      }).catch(done.fail);
    });
  });

  describe('setSelectedPageOnTheFly()', () => {
    beforeEach(() => {
      store = mockStore(INITIAL_STATE);
    });

    it('dispatches REMOVE_PAGE_WIDGET if value = false', (done) => {
      getSelectedPageTemplateMainFrame.mockReturnValue({ pos: 3 });
      store.dispatch(setSelectedPageOnTheFly(false, CURRENT_PAGE_CODE)).then(() => {
        const actionTypes = store.getActions().map(action => action.type);
        expect(actionTypes).toContain(REMOVE_PAGE_WIDGET);
        done();
      }).catch(done.fail);
    });

    it('dispatches SET_PAGE_WIDGET if value = true', (done) => {
      getSelectedPageTemplateMainFrame.mockReturnValue({ pos: 3 });
      store.dispatch(setSelectedPageOnTheFly(true, CURRENT_PAGE_CODE)).then(() => {
        const actionTypes = store.getActions().map(action => action.type);
        expect(actionTypes).toContain(SET_PAGE_WIDGET);
        done();
      }).catch(done.fail);
    });

    it('dispatches nothing if there is no main frame', (done) => {
      getSelectedPageTemplateMainFrame.mockReturnValue(null);
      store.dispatch(setSelectedPageOnTheFly(true, CURRENT_PAGE_CODE)).then(() => {
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
      store.dispatch(restoreSelectedPageConfig(CURRENT_PAGE_CODE)).then(() => {
        expect(restorePageConfig).toHaveBeenCalled();
        expect(store.getActions()).toHaveLength(0);
        done();
      }).catch(done.fail);
    });

    it('dispatches SET_PAGE_CONFIG', (done) => {
      store.dispatch(restoreSelectedPageConfig(CURRENT_PAGE_CODE)).then(() => {
        expect(restorePageConfig).toHaveBeenCalledWith(CURRENT_PAGE_CODE);
        const actionTypes = store.getActions().map(action => action.type);
        expect(actionTypes).toEqual([SET_PAGE_CONFIG]);
        done();
      }).catch(done.fail);
    });

    it('does nothing if there is no pageCode parameter', (done) => {
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
      getSelectedPageTemplateDefaultConfig.mockReturnValue([null, null]);
    });

    it('dispatches SET_PAGE_CONFIG', (done) => {
      store.dispatch(applyDefaultConfig(CURRENT_PAGE_CODE)).then(() => {
        expect(applyDefaultPageConfig).toHaveBeenCalledWith(CURRENT_PAGE_CODE);
        const actionTypes = store.getActions().map(action => action.type);
        expect(actionTypes).toEqual([SET_PAGE_CONFIG]);
        done();
      }).catch(done.fail);
    });

    it('does nothing if there is no pageCode parameter', (done) => {
      store.dispatch(applyDefaultConfig()).then(() => {
        expect(applyDefaultPageConfig).not.toHaveBeenCalled();
        expect(store.getActions()).toHaveLength(0);
        done();
      }).catch(done.fail);
    });

    it('does not dispatch if response is not ok', (done) => {
      applyDefaultPageConfig.mockImplementation(resolveRespNotOk);
      store.dispatch(applyDefaultConfig(CURRENT_PAGE_CODE)).then(() => {
        expect(applyDefaultPageConfig).toHaveBeenCalled();
        expect(store.getActions()).toHaveLength(0);
        done();
      }).catch(done.fail);
    });
  });

  describe('editWidgetConfig', () => {
    beforeEach(() => {
      getWidgetsMap.mockReturnValue({
        WIDGET_NO_CONFIG: { code: 'WIDGET_NO_CONFIG' },
        WIDGET_WITH_CONFIG: { type: 'WIDGET_WITH_CONFIG', config: { field: 'fieldValue' }, hasConfig: true },
      });
      makeGetSelectedPageConfig.mockImplementation(() => () => [
        null,
        { type: 'WIDGET_WITH_CONFIG', config: {} },
      ]);
      store = mockStore(INITIAL_STATE);
    });

    it('if there is no selected page config, dispatch nothing', () => {
      makeGetSelectedPageConfig.mockImplementation(() => () => null);
      store.dispatch(editWidgetConfig(0));
      expect(makeGetSelectedPageConfig).toHaveBeenCalled();
      expect(store.getActions()).toHaveLength(0);
    });

    it('if there is selected page config but the frame has no config, dispatch nothing', () => {
      store.dispatch(editWidgetConfig(0, CURRENT_PAGE_CODE));
      expect(makeGetSelectedPageConfig).toHaveBeenCalled();
      expect(store.getActions()).toHaveLength(0);
    });

    it('if there is selected page config and the frame has config, dispatch initialize', () => {
      store.dispatch(editWidgetConfig(1, CURRENT_PAGE_CODE));
      expect(initialize).toHaveBeenCalled();
      expect(getWidgetsMap).toHaveBeenCalled();
      expect(store.getActions()).toHaveLength(1);
    });
  });

  describe('configOrUpdatePageWidget()', () => {
    beforeEach(() => {
      getWidgetsMap.mockReturnValue({
        WIDGET_NO_CONFIG: { code: 'WIDGET_NO_CONFIG' },
        WIDGET_WITH_CONFIG: { type: 'WIDGET_WITH_CONFIG', config: { field: 'fieldValue' }, hasConfig: true },
      });
      makeGetSelectedPageConfig.mockImplementation(() => () => [
        null,
        { type: 'WIDGET_NO_CONFIG' },
        { type: 'WIDGET_WITH_CONFIG', config: { key: 'value' } },
      ]);
      getSelectedPageIsPublished.mockReturnValue(false);
      store = mockStore(INITIAL_STATE);
    });

    it('if the widget needs no config, should update the widget state', (done) => {
      store.dispatch(configOrUpdatePageWidget('WIDGET_NO_CONFIG', 0, 0)).then(() => {
        expect(makeGetSelectedPageConfig).toHaveBeenCalled();
        expect(getWidgetsMap).toHaveBeenCalled();
        expect(store.getActions()).toHaveLength(1);
        expect(store.getActions()[0]).toHaveProperty('type', SET_PAGE_WIDGET);
        done();
      }).catch(done.fail);
    });

    it('if the widget is already configured, should update the widget state', (done) => {
      store.dispatch(configOrUpdatePageWidget('WIDGET_WITH_CONFIG', 2, 0)).then(() => {
        expect(makeGetSelectedPageConfig).toHaveBeenCalled();
        expect(getWidgetsMap).toHaveBeenCalled();
        expect(store.getActions()).toHaveLength(1);
        expect(store.getActions()[0]).toHaveProperty('type', SET_PAGE_WIDGET);
        done();
      }).catch(done.fail);
    });

    it('if the widget needs config, should go to the widget config route', (done) => {
      store.dispatch(configOrUpdatePageWidget('WIDGET_WITH_CONFIG', 0, 0)).then(() => {
        expect(makeGetSelectedPageConfig).toHaveBeenCalled();
        expect(getWidgetsMap).toHaveBeenCalled();
        expect(store.getActions()).toHaveLength(0);
        expect(history.push).toHaveBeenCalled();
        done();
      }).catch(done.fail);
    });
  });
});
