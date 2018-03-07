import { isFSA } from 'flux-standard-action';
import { setPageModels, fetchPageModels } from 'state/page-models/actions';
import { SET_PAGE_MODELS } from 'state/page-models/types';
import { GET_LIST_RESPONSE } from 'test/mocks/pageModels';

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const PAGE_MODELS = GET_LIST_RESPONSE.payload;

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
