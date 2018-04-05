import { isFSA } from 'flux-standard-action';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { setPageModels, setSelectedPageModel, fetchPageModels, loadSelectedPageModel } from 'state/page-models/actions';
import { getSelectedPageModel } from 'state/page-models/selectors';
import { SET_PAGE_MODELS, SET_SELECTED_PAGE_MODEL } from 'state/page-models/types';
import { ADD_ERRORS } from 'state/errors/types';
import { getPageModels, getPageModel } from 'api/pageModels';
import { mockApi } from 'test/testUtils';
import { PAGE_MODELS_LIST } from 'test/mocks/pageModels';


const PAGE_MODEL = PAGE_MODELS_LIST[0];
const mockStore = configureMockStore([thunk]);


jest.mock('api/pageModels', () => ({
  getPageModels: jest.fn(),
  getPageModel: jest.fn(),
}));

jest.mock('state/page-models/selectors', () => ({
  getSelectedPageModel: jest.fn(),
}));

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
    let store;
    beforeEach(() => {
      store = mockStore({});
    });

    it('if getPageModels API returns ok, set page models', (done) => {
      getPageModels.mockImplementation(mockApi({ payload: PAGE_MODELS_LIST }));
      store.dispatch(fetchPageModels()).then(() => {
        expect(getPageModels).toHaveBeenCalled();
        expect(store.getActions()).toHaveLength(1);
        expect(store.getActions()[0].type).toBe(SET_PAGE_MODELS);
        done();
      }).catch(done.fail);
    });

    it('if getPageModels API returns error, do not set page models', (done) => {
      getPageModels.mockImplementation(mockApi({ errors: true }));
      store.dispatch(fetchPageModels()).then(() => {
        expect(getPageModels).toHaveBeenCalled();
        expect(store.getActions()).toHaveLength(0);
        done();
      }).catch(done.fail);
    });
  });

  describe('loadSelectedPageModel', () => {
    let store;
    beforeEach(() => {
      store = mockStore({});
    });

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

    it('if the API returns error, dispatch ADD_ERRORS', (done) => {
      getSelectedPageModel.mockReturnValue(null);
      getPageModel.mockImplementation(mockApi({ errors: true }));
      store.dispatch(loadSelectedPageModel('some_random_code')).then(() => {
        expect(getPageModel).toHaveBeenCalled();
        expect(store.getActions()).toHaveLength(1);
        expect(store.getActions()[0].type).toBe(ADD_ERRORS);
        done();
      }).catch(done.fail);
    });
  });
});
