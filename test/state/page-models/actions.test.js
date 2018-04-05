import { isFSA } from 'flux-standard-action';

import { mockApi } from 'test/testUtils';
import { setPageModels, setSelectedPageModel, fetchPageModels, removePageModel, loadSelectedPageModel } from 'state/page-models/actions';
import { getSelectedPageModel } from 'state/page-models/selectors';
import { SET_PAGE_MODELS, SET_SELECTED_PAGE_MODEL, REMOVE_PAGE_MODEL } from 'state/page-models/types';
import { SET_PAGE } from 'state/pagination/types';
import { ADD_ERRORS } from 'state/errors/types';
import { TOGGLE_LOADING } from 'state/loading/types';
import { PAGE_MODELS_LIST } from 'test/mocks/pageModels';
import { getPageModels, getPageModel, deletePageModel } from 'api/pageModels';

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';


const PAGE_MODELS = PAGE_MODELS_LIST;
const PAGE_MODEL = PAGE_MODELS[0];
const mockStore = configureMockStore([thunk]);
const store = mockStore({});


jest.mock('state/page-models/selectors', () => ({
  getSelectedPageModel: jest.fn(),
}));


beforeEach(() => {
  jest.clearAllMocks();
  store.clearActions();
});

describe('state/page-models/actions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    getPageModels.mockImplementation(mockApi({ payload: [] }));
  });

  describe('setPageModels', () => {
    let action;
    beforeEach(() => {
      action = setPageModels(PAGE_MODELS_LIST);
    });

    it('is FSA compliant', () => {
      expect(isFSA(action)).toBe(true);
    });

    it('is of type SET_PAGE_MODELS', () => {
      expect(action.type).toBe(SET_PAGE_MODELS);
    });

    it('defines the "pageModels" property', () => {
      expect(action.payload.pageModels).toEqual(PAGE_MODELS_LIST);
    });
  });

  describe('setSelectedPageModel', () => {
    let action;
    beforeEach(() => {
      action = setSelectedPageModel(PAGE_MODEL);
    });

    it('is FSA compliant', () => {
      expect(isFSA(action)).toBe(true);
    });

    it('is of type SET_SELECTED_PAGE_MODEL', () => {
      expect(action.type).toBe(SET_SELECTED_PAGE_MODEL);
    });

    it('defines the "pageModel" property', () => {
      expect(action.payload.pageModel).toEqual(PAGE_MODEL);
    });
  });

  describe('fetchPageModels', () => {
    it('if API response is ok, calls the right action sequence', (done) => {
      store.dispatch(fetchPageModels()).then(() => {
        const actions = store.getActions();
        expect(actions).toHaveLength(4);
        expect(actions[0]).toHaveProperty('type', TOGGLE_LOADING);
        expect(actions[1]).toHaveProperty('type', SET_PAGE_MODELS);
        expect(actions[2]).toHaveProperty('type', TOGGLE_LOADING);
        expect(actions[3]).toHaveProperty('type', SET_PAGE);
        done();
      }).catch(done.fail);
    });

    it('if getPageModels API returns ok, set page models', (done) => {
      getPageModels.mockImplementation(mockApi({ payload: PAGE_MODELS_LIST }));
      store.dispatch(fetchPageModels()).then(() => {
        expect(getPageModels).toHaveBeenCalled();
        const actions = store.getActions();
        expect(actions).toHaveLength(4);
        expect(actions[0]).toHaveProperty('type', TOGGLE_LOADING);
        expect(actions[1]).toHaveProperty('type', SET_PAGE_MODELS);
        expect(actions[2]).toHaveProperty('type', TOGGLE_LOADING);
        expect(actions[3]).toHaveProperty('type', SET_PAGE);
        done();
      }).catch(done.fail);
    });

    it('if API response is not ok, calls ADD_ERRORS', (done) => {
      getPageModels.mockImplementation(mockApi({ errors: true }));
      store.dispatch(fetchPageModels()).then(() => {
        const actions = store.getActions();
        expect(actions).toHaveLength(3);
        expect(actions[0]).toHaveProperty('type', TOGGLE_LOADING);
        expect(actions[1]).toHaveProperty('type', ADD_ERRORS);
        expect(actions[2]).toHaveProperty('type', TOGGLE_LOADING);
        done();
      }).catch(done.fail);
    });

    it('if getPageModels API returns error, do not set page models', (done) => {
      getPageModels.mockImplementation(mockApi({ errors: true }));
      store.dispatch(fetchPageModels()).then(() => {
        expect(getPageModels).toHaveBeenCalled();
        expect(store.getActions().find(act => act.type === SET_PAGE_MODELS)).toBeFalsy();
        done();
      }).catch(done.fail);
    });
  });

  describe('removePageModel', () => {
    it('if API response is ok, calls the right action sequence', (done) => {
      store.dispatch(removePageModel(PAGE_MODEL.code)).then(() => {
        const actions = store.getActions();
        expect(actions).toHaveLength(1);
        expect(actions[0]).toHaveProperty('type', REMOVE_PAGE_MODEL);
        done();
      }).catch(done.fail);
    });
  });

  describe('loadSelectedPageModel', () => {
    it('if there is the same page model selected, does nothing', (done) => {
      getSelectedPageModel.mockReturnValue(PAGE_MODEL);
      store.dispatch(loadSelectedPageModel(PAGE_MODEL.code)).then(() => {
        expect(getPageModel).not.toHaveBeenCalled();
        expect(store.getActions()).toHaveLength(0);
        done();
      }).catch(done.fail);
    });

    it('if there is another the page model selected, fetch the new one', (done) => {
      getSelectedPageModel.mockReturnValue(PAGE_MODEL);
      getPageModel.mockImplementation(mockApi({ payload: PAGE_MODEL }));
      store.dispatch(loadSelectedPageModel('some_random_code')).then(() => {
        expect(getPageModel).toHaveBeenCalled();
        expect(store.getActions()).toHaveLength(1);
        expect(store.getActions()[0].type).toBe(SET_SELECTED_PAGE_MODEL);
        done();
      }).catch(done.fail);
    });

    it('if there is no page model selected, fetch the new one', (done) => {
      getSelectedPageModel.mockReturnValue(null);
      getPageModel.mockImplementation(mockApi({ payload: PAGE_MODEL }));
      store.dispatch(loadSelectedPageModel('some_random_code')).then(() => {
        expect(getPageModel).toHaveBeenCalled();
        expect(store.getActions()).toHaveLength(1);
        expect(store.getActions()[0].type).toBe(SET_SELECTED_PAGE_MODEL);
        done();
      }).catch(done.fail);
    });

    it('if API response is not ok, calls ADD_ERRORS', (done) => {
      deletePageModel.mockImplementation(mockApi({ errors: true }));
      store.dispatch(removePageModel(PAGE_MODEL.code)).then(() => {
        const actions = store.getActions();
        expect(actions).toHaveLength(1);
        expect(actions[0]).toHaveProperty('type', ADD_ERRORS);
        done();
      }).catch(done.fail);
    });
  });
});
