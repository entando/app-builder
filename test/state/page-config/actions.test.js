import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import rootReducer from 'state/rootReducer';
import {
  initConfigPage, setPageWidget, removePageWidgetSync, removePageWidget,
  updatePageWidget, setSelectedPageOnTheFly, restoreSelectedPageConfig, applyDefaultConfig,
} from 'state/page-config/actions';

import { ADD_ERRORS } from 'state/errors/types';
import { SET_SELECTED_PAGE_MODEL } from 'state/page-models/types';
import { SET_SELECTED_PAGE } from 'state/pages/types';
import { SET_PAGE_CONFIG, SET_PUBLISHED_PAGE_CONFIG, SET_PAGE_WIDGET, REMOVE_PAGE_WIDGET } from 'state/page-config/types';

import { HOMEPAGE_RESPONSE, CONTACTS_RESPONSE, ERROR } from 'test/mocks/pages';
import { COMPLEX_RESPONSE } from 'test/mocks/pageModels';

// mocked
import { getParams } from 'frontend-common-components';
import { fetchPage, deletePageWidget, putPageWidget, restorePageConfig, applyDefaultPageConfig } from 'api/pages';
import { getPageModel } from 'api/pageModels';
import { addErrors } from 'state/errors/actions';
import { setSelectedPageModel } from 'state/page-models/actions';
import { getSelectedPageModelMainFrame, getSelectedPageModelDefaultConfig } from 'state/page-models/selectors';
import { getPublishedConfigMap } from 'state/page-config/selectors';
import { validatePageModel } from 'state/page-models/helpers';


jest.mock('api/pages', () => ({
  fetchPage: jest.fn(),
  getPageConfig: jest.fn().mockReturnValue(new Promise(r => r([]))),
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

jest.mock('state/page-models/actions', () => ({
  setSelectedPageModel: jest.fn()
    .mockImplementation(require.requireActual('state/page-models/actions').setSelectedPageModel),
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
}));

const resolve = arg => new Promise(r => r(arg));

const mockStore = configureStore([thunk]);
const INITIAL_STATE = rootReducer();
const ERROR_MESSAGES = ERROR.errors.map(err => err.message);

const CURRENT_PAGE_CODE = 'homepage';


const resolveRespOk = () => new Promise(r => r({ ok: true }));
const resolveRespNotOk = () => new Promise(r => r({ ok: false }));


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
      fetchPage.mockReturnValue(resolve(HOMEPAGE_RESPONSE));
      getPageModel.mockReturnValue(resolve(COMPLEX_RESPONSE));
      validatePageModel.mockReturnValue([]);
      store = mockStore(INITIAL_STATE);
    });

    it('when GET /page/<code> returns errors, it will dispatch ADD_ERRORS', (done) => {
      fetchPage.mockReturnValue(resolve(ERROR));
      store.dispatch(initConfigPage()).then(() => {
        const actionTypes = store.getActions().map(action => action.type);
        expect(actionTypes).toEqual([ADD_ERRORS]);
        expect(addErrors).toHaveBeenCalledWith(ERROR_MESSAGES);
        done();
      }).catch(done.fail);
    });

    it('when GET /pagemodels/<code> returns errors, it will dispatch ADD_ERRORS', (done) => {
      getPageModel.mockReturnValue(resolve(ERROR));
      store.dispatch(initConfigPage()).then(() => {
        expect(getPageModel).toHaveBeenCalledWith(HOMEPAGE_RESPONSE.payload.pageModel);
        const actionTypes = store.getActions().map(action => action.type);
        expect(actionTypes).toEqual([SET_SELECTED_PAGE, ADD_ERRORS]);
        expect(addErrors).toHaveBeenCalledWith(ERROR_MESSAGES);
        done();
      }).catch(done.fail);
    });

    it('when GET /page/<code> returns a non valid page model, it dispatch ADD_ERRORS', (done) => {
      validatePageModel.mockImplementation(() => [{ id: 'message.id' }]);
      store.dispatch(initConfigPage()).then(() => {
        const actionTypes = store.getActions().map(action => action.type);
        expect(actionTypes).toEqual([SET_SELECTED_PAGE, ADD_ERRORS]);
        done();
      }).catch(done.fail);
    });

    it('when API responses are ok and the page is published', (done) => {
      store.dispatch(initConfigPage()).then(() => {
        expect(getPageModel).toHaveBeenCalledWith(HOMEPAGE_RESPONSE.payload.pageModel);
        const actionTypes = store.getActions().map(action => action.type);
        expect(actionTypes)
          .toEqual([SET_SELECTED_PAGE, SET_SELECTED_PAGE_MODEL, SET_PAGE_CONFIG,
            SET_PUBLISHED_PAGE_CONFIG]);
        expect(setSelectedPageModel).toHaveBeenCalledWith(COMPLEX_RESPONSE.payload);
        done();
      }).catch(done.fail);
    });

    it('when API responses are ok and the page is not published', (done) => {
      fetchPage.mockReturnValue(resolve(CONTACTS_RESPONSE));
      store.dispatch(initConfigPage()).then(() => {
        expect(getPageModel).toHaveBeenCalledWith(CONTACTS_RESPONSE.payload.pageModel);
        const actionTypes = store.getActions().map(action => action.type);
        expect(actionTypes)
          .toEqual([SET_SELECTED_PAGE, SET_SELECTED_PAGE_MODEL, SET_PAGE_CONFIG,
            SET_PUBLISHED_PAGE_CONFIG]);
        expect(store.getActions()[2].payload).toEqual({
          pageCode: CURRENT_PAGE_CODE,
          pageConfig: null,
        });
        expect(setSelectedPageModel).toHaveBeenCalledWith(COMPLEX_RESPONSE.payload);
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
    const WIDGET = {};
    const FRAME_ID = 1;
    const OLD_FRAME_ID = 2;
    beforeEach(() => {
      store = mockStore(INITIAL_STATE);
    });

    it('calls PUT page widget API and dispatches SET_PAGE_WIDGET', (done) => {
      store.dispatch(updatePageWidget(WIDGET, OLD_FRAME_ID, FRAME_ID)).then(() => {
        const actionTypes = store.getActions().map(action => action.type);
        expect(actionTypes).toEqual([SET_PAGE_WIDGET]);
        expect(putPageWidget).toHaveBeenCalledWith(CURRENT_PAGE_CODE, FRAME_ID, WIDGET);
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
        expect(store.getActions().length).toBe(0);
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
        expect(store.getActions().length).toBe(0);
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
        expect(store.getActions().length).toBe(0);
        done();
      }).catch(done.fail);
    });

    it('does nothing if there is no config for the current page', (done) => {
      getPublishedConfigMap.mockReturnValue({});
      store.dispatch(restoreSelectedPageConfig()).then(() => {
        expect(restorePageConfig).not.toHaveBeenCalled();
        expect(store.getActions().length).toBe(0);
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
        expect(store.getActions().length).toBe(0);
        done();
      }).catch(done.fail);
    });

    it('does not dispatch if response is not ok', (done) => {
      applyDefaultPageConfig.mockImplementation(resolveRespNotOk);
      store.dispatch(applyDefaultConfig()).then(() => {
        expect(applyDefaultPageConfig).toHaveBeenCalled();
        expect(store.getActions().length).toBe(0);
        done();
      }).catch(done.fail);
    });
  });
});
