import { isFSA } from 'flux-standard-action';
import { setPageModels, setSelectedPageModel, fetchPageModels } from 'state/page-models/actions';
import { SET_PAGE_MODELS, SET_SELECTED_PAGE_MODEL } from 'state/page-models/types';
import { GET_LIST_RESPONSE } from 'test/mocks/pageModels';

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const PAGE_MODELS = GET_LIST_RESPONSE.payload;
const PAGE_MODEL = PAGE_MODELS[0];

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
    const mockStore = configureMockStore([thunk]);
    const store = mockStore({});

    it('calls setPageModels action', (done) => {
      store.dispatch(fetchPageModels()).then(() => {
        const actions = store.getActions();
        expect(actions[0].type).toEqual(SET_PAGE_MODELS);
        done();
      });
    });
  });
});
