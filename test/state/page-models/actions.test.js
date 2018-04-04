import { isFSA } from 'flux-standard-action';

import { mockApi } from 'test/testUtils';
import { setPageModels, setSelectedPageModel, fetchPageModels } from 'state/page-models/actions';
import { SET_PAGE_MODELS, SET_SELECTED_PAGE_MODEL } from 'state/page-models/types';
import { SET_PAGE } from 'state/pagination/types';
import { ADD_ERRORS } from 'state/errors/types';
import { TOGGLE_LOADING } from 'state/loading/types';
import { PAGE_MODELS_LIST } from 'test/mocks/pageModels';
import { getPageModels } from 'api/pageModels';

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const PAGE_MODELS = PAGE_MODELS_LIST;
const PAGE_MODEL = PAGE_MODELS[0];

const mockStore = configureMockStore([thunk]);
const store = mockStore({});
beforeEach(() => {
  jest.clearAllMocks();
  store.clearActions();
});

describe('state/page-models/actions', () => {
  describe('setPageModels', () => {
    let action;
    beforeEach(() => {
      action = setPageModels(PAGE_MODELS);
    });

    it('is FSA compliant', () => {
      expect(isFSA(action)).toBe(true);
    });

    it('is of type SET_PAGE_MODELS', () => {
      expect(action.type).toBe(SET_PAGE_MODELS);
    });

    it('defines the "pageModels" property', () => {
      expect(action.payload.pageModels).toEqual(PAGE_MODELS);
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
  });
});
