import 'test/enzyme-init';

import { getDataModels } from 'api/dataModels';
import { makeRequest, METHODS } from 'api/apiManager';
import { DATA_MODELS, ERROR } from 'test/mocks/dataModels';

const correctRequest = {
  uri: '/api/dataModels',
  method: METHODS.GET,
  mockResponse: DATA_MODELS.payload,
  useAuthentication: true,
  errors: expect.any(Function),
};

const PAGE_KEY_BAD = 'Gianni';

jest.unmock('api/dataModels');
jest.mock('api/apiManager', () => ({
  makeRequest: jest.fn(() => new Promise(resolve => resolve({}))),
  METHODS: { GET: 'GET', POST: 'POST', PUT: 'PUT' },
}));

describe('api/dataModel', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('get an error response with a not existing KEY', () => {
    getDataModels(PAGE_KEY_BAD).then(() => {}, (error) => {
      expect(error).toEqual(ERROR);
    });
  });

  describe('getDataModels', () => {
    it('returns a promise', () => {
      expect(getDataModels()).toBeInstanceOf(Promise);
    });

    it('get dataMmodels page 1 by default', () => {
      getDataModels({ page: 1, pageSize: 10 });
      expect(makeRequest).toHaveBeenCalledWith(
        correctRequest,
        {
          page: 1,
          pageSize: 10,
        },
      );
    });

    it('request page 2', () => {
      getDataModels({ page: 2, pageSize: 10 });
      expect(makeRequest).toHaveBeenCalledWith(
        correctRequest,
        {
          page: 2,
          pageSize: 10,
        },
      );
    });

    it('request different page size', () => {
      getDataModels({ page: 1, pageSize: 5 });
      expect(makeRequest).toHaveBeenCalledWith(
        correctRequest,
        {
          page: 1,
          pageSize: 5,
        },
      );
    });

    it('makes the request with additional params', () => {
      getDataModels({ page: 1, pageSize: 10 }, '?param=true');
      expect(makeRequest).toHaveBeenCalledWith(
        {
          ...correctRequest,
          uri: '/api/dataModels?param=true',
        },
        {
          page: 1,
          pageSize: 10,
        },
      );
    });
  });
});
