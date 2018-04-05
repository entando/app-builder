import 'test/enzyme-init';
import { getPageModels, getPageModel } from 'api/pageModels';
import { makeRequest, METHODS } from 'api/apiManager';

jest.unmock('api/pageModels');
jest.mock('api/apiManager', () => ({
  makeRequest: jest.fn(() => new Promise(resolve => resolve({}))),
  METHODS: require.requireActual('api/apiManager').METHODS,
}));

const PAGE_MODEL_CODE = 'some_code';


describe('api/pageModels', () => {
  describe('getPageModels()', () => {
    it('returns a promise', () => {
      expect(getPageModels()).toBeInstanceOf(Promise);
    });

    it('makes the correct request', () => {
      getPageModels();
      expect(makeRequest).toHaveBeenCalledWith(expect.objectContaining({
        uri: '/api/pagemodels',
        method: METHODS.GET,
        useAuthentication: true,
      }));
    });
  });

  describe('getPageModel()', () => {
    it('returns a promise', () => {
      expect(getPageModel()).toBeInstanceOf(Promise);
    });

    it('makes the correct request', () => {
      getPageModel(PAGE_MODEL_CODE);
      expect(makeRequest).toHaveBeenCalledWith(expect.objectContaining({
        uri: `/api/pagemodels/${PAGE_MODEL_CODE}`,
        method: METHODS.GET,
        useAuthentication: true,
      }));
    });
  });
});
