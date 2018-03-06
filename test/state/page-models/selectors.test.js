
import { getPageModels } from 'state/page-models/selectors';
import { GET_LIST_RESPONSE } from 'test/mocks/pageModels';

const PAGE_MODELS = GET_LIST_RESPONSE.payload;

const STATE = {
  pageModels: PAGE_MODELS,
};


describe('state/page-models/selectors', () => {
  describe('getPageModels', () => {
    it('returns the errors state', () => {
      expect(getPageModels(STATE)).toEqual(PAGE_MODELS);
    });
  });
});
