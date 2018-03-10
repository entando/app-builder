import 'test/enzyme-init';
import { getPageModels, getPageModel } from 'api/pageModels';
import { GET_LIST_RESPONSE, COMPLEX_RESPONSE } from 'test/mocks/pageModels';

jest.unmock('api/pageModels');
jest.unmock('util/throttle');
jest.useFakeTimers();

const COMPLEX_PAGE_MODEL_CODE = COMPLEX_RESPONSE.payload.code;


describe('api/pageModels', () => {
  afterEach(jest.runOnlyPendingTimers);

  describe('getPageModels()', () => {
    it('resolves with a mock page models list', () => {
      expect(getPageModels()).resolves.toEqual(GET_LIST_RESPONSE.payload);
    });
  });

  describe('getPageModel()', () => {
    it('resolves with a mock page model if present', () => {
      getPageModel(COMPLEX_PAGE_MODEL_CODE).then((response) => {
        expect(response).toEqual(COMPLEX_RESPONSE);
      });
    });

    it('returns errors if the page model is not present', () => {
      getPageModel('bla bla').then((response) => {
        expect(response.errors).toBeDefined();
        expect(response.errors.length).toBeTruthy();
      });
    });
  });
});
