import 'test/enzyme-init';
import { getLanguages, putLanguage } from 'api/languages';
import { makeMockRequest, METHODS } from 'api/apiManager';
import { LANGUAGES_LIST } from 'test/mocks/languages';


const correctRequest = {
  uri: '/api/languages',
  method: METHODS.GET,
  mockResponse: LANGUAGES_LIST,
  useAuthentication: true,
};

const LANGUAGE_OBJ = {
  code: 'fr',
  description: 'Français',
  isActive: true,
  isDefault: false,
};

jest.unmock('api/languages');
jest.mock('api/apiManager', () => ({
  makeMockRequest: jest.fn(() => new Promise(resolve => resolve({}))),
  METHODS: { GET: 'GET', PUT: 'PUT' },
}));

describe('api/languages', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getLanguages', () => {
    it('returns a promise', () => {
      expect(getLanguages()).toBeInstanceOf(Promise);
    });

    it('get fragment page 1 by default', () => {
      getLanguages({ page: 1, pageSize: 10 });
      expect(makeMockRequest).toHaveBeenCalledWith(
        correctRequest,
        {
          page: 1,
          pageSize: 10,
        },
      );
    });

    it('request page 2', () => {
      getLanguages({ page: 2, pageSize: 10 });
      expect(makeMockRequest).toHaveBeenCalledWith(
        correctRequest,
        {
          page: 2,
          pageSize: 10,
        },
      );
    });

    it('request different page size', () => {
      getLanguages({ page: 1, pageSize: 5 });
      expect(makeMockRequest).toHaveBeenCalledWith(
        correctRequest,
        {
          page: 1,
          pageSize: 5,
        },
      );
    });

    it('makes the request with additional params', () => {
      getLanguages({ page: 1, pageSize: 10 }, '?param=true');
      expect(makeMockRequest).toHaveBeenCalledWith(
        {
          ...correctRequest,
          uri: '/api/languages?param=true',
        },
        {
          page: 1,
          pageSize: 10,
        },
      );
    });
  });

  describe('putLanguage', () => {
    it('returns a promise', () => {
      expect(putLanguage(LANGUAGE_OBJ)).toBeInstanceOf(Promise);
    });

    it('makes the correct request with language body', () => {
      putLanguage(LANGUAGE_OBJ);
      expect(makeMockRequest).toHaveBeenCalledWith(expect.objectContaining({
        method: METHODS.PUT,
        uri: `/api/languages/${LANGUAGE_OBJ.code}`,
        body: LANGUAGE_OBJ,
        useAuthentication: true,
      }));
    });
  });
});
