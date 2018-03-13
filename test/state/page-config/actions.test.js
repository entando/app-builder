import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import rootReducer from 'state/rootReducer';
import {
  initConfigPage, setPageWidget, removePageWidgetSync, removePageWidget,
  updatePageWidget,
} from 'state/page-config/actions';

import { ADD_ERRORS } from 'state/errors/types';
import { SET_SELECTED_PAGE_MODEL } from 'state/page-models/types';
import { SET_PAGE_WIDGETS, SET_PAGE_WIDGET, REMOVE_PAGE_WIDGET } from 'state/page-config/types';

import { HOMEPAGE_RESPONSE, ERROR } from 'test/mocks/pages';
import { COMPLEX_RESPONSE } from 'test/mocks/pageModels';

// mocked
import { getParams } from 'frontend-common-components';
import { fetchPage, deletePageWidget, putPageWidget } from 'api/pages';
import { getPageModel } from 'api/pageModels';
import { addErrors } from 'state/errors/actions';
import { setSelectedPageModel } from 'state/page-models/actions';

jest.mock('api/pages', () => ({
  fetchPage: jest.fn(),
  getPageWidgets: jest.fn().mockReturnValue(new Promise(r => r([]))),
  deletePageWidget: jest.fn().mockReturnValue(new Promise(r => r())),
  putPageWidget: jest.fn().mockReturnValue(new Promise(r => r())),
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


const resolve = arg => new Promise(r => r(arg));

const mockStore = configureStore([thunk]);
const INITIAL_STATE = rootReducer();
const ERROR_MESSAGES = ERROR.errors.map(err => err.message);

const CURRENT_PAGE_CODE = 'homepage';
getParams.mockReturnValue({ pageCode: CURRENT_PAGE_CODE });

describe('state/page-config/actions', () => {
  beforeEach(jest.clearAllMocks);

  let store;

  describe('setPageWidget()', () => {
    const WIDGET = {};
    const FRAME_ID = 1;
    const OLD_FRAME_ID = 2;
    let action;

    beforeEach(() => {
      action = setPageWidget(CURRENT_PAGE_CODE, WIDGET, FRAME_ID, OLD_FRAME_ID);
    });

    it('returns an action with the correct action type', () => {
      expect(action.type).toBe(SET_PAGE_WIDGET);
    });

    it('returns an action with a well formed payload', () => {
      expect(action.payload).toEqual({
        pageCode: CURRENT_PAGE_CODE,
        widget: WIDGET,
        frameId: FRAME_ID,
        oldFrameId: OLD_FRAME_ID,
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
      store = mockStore(INITIAL_STATE);
    });

    it('when GET /page/<code> returns errors, it will dispatch ADD_ERRORS', () => {
      fetchPage.mockReturnValue(resolve(ERROR));
      return store.dispatch(initConfigPage()).then(() => {
        const actionTypes = store.getActions().map(action => action.type);
        expect(actionTypes).toEqual([ADD_ERRORS]);
        expect(addErrors).toHaveBeenCalledWith(ERROR_MESSAGES);
      });
    });

    it('when GET /pagemodels/<code> returns errors, it will dispatch ADD_ERRORS', () => {
      fetchPage.mockReturnValue(resolve(HOMEPAGE_RESPONSE));
      getPageModel.mockReturnValue(resolve(ERROR));
      return store.dispatch(initConfigPage()).then(() => {
        expect(getPageModel).toHaveBeenCalledWith(HOMEPAGE_RESPONSE.payload.pageModel);
        const actionTypes = store.getActions().map(action => action.type);
        expect(actionTypes).toEqual([ADD_ERRORS]);
        expect(addErrors).toHaveBeenCalledWith(ERROR_MESSAGES);
      });
    });

    it('when API responses are ok', () => {
      fetchPage.mockReturnValue(resolve(HOMEPAGE_RESPONSE));
      getPageModel.mockReturnValue(resolve(COMPLEX_RESPONSE));
      return store.dispatch(initConfigPage()).then(() => {
        expect(getPageModel).toHaveBeenCalledWith(HOMEPAGE_RESPONSE.payload.pageModel);
        expect(getPageModel).toHaveBeenCalledWith(HOMEPAGE_RESPONSE.payload.pageModel);
        const actionTypes = store.getActions().map(action => action.type);
        expect(actionTypes).toEqual([SET_SELECTED_PAGE_MODEL, SET_PAGE_WIDGETS]);
        expect(setSelectedPageModel).toHaveBeenCalledWith(COMPLEX_RESPONSE.payload);
      });
    });
  });

  describe('removePageWidget()', () => {
    const FRAME_ID = 3;
    beforeEach(() => {
      store = mockStore(INITIAL_STATE);
    });

    it('calls DELETE page widget API and dispatches REMOVE_PAGE_WIDGET', () => {
      store.dispatch(removePageWidget(FRAME_ID)).then(() => {
        const actionTypes = store.getActions().map(action => action.type);
        expect(actionTypes).toEqual([REMOVE_PAGE_WIDGET]);
        expect(deletePageWidget).toHaveBeenCalledWith(CURRENT_PAGE_CODE, FRAME_ID);
      });
    });
  });

  describe('updatePageWidget()', () => {
    const WIDGET = {};
    const FRAME_ID = 1;
    const OLD_FRAME_ID = 2;
    beforeEach(() => {
      store = mockStore(INITIAL_STATE);
    });

    it('calls PUT page widget API and dispatches SET_PAGE_WIDGET', () => {
      store.dispatch(updatePageWidget(WIDGET, FRAME_ID, OLD_FRAME_ID)).then(() => {
        const actionTypes = store.getActions().map(action => action.type);
        expect(actionTypes).toEqual([SET_PAGE_WIDGET]);
        expect(putPageWidget).toHaveBeenCalledWith(CURRENT_PAGE_CODE, FRAME_ID, WIDGET);
      });
    });
  });
});
