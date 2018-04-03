import 'test/enzyme-init';
import { getDataTypes } from 'api/dataTypes';
import { makeRequest, METHODS } from 'api/apiManager';

import { DATA_TYPES_OK_PAGE_1 } from 'test/mocks/dataTypes';

const correctRequest = {
  uri: '/api/datatypes',
  method: METHODS.GET,
  mockResponse: DATA_TYPES_OK_PAGE_1,
  useAuthentication: true,
  errors: expect.any(Function),
};


jest.unmock('api/dataTypes');
jest.mock('api/apiManager', () => ({
  makeRequest: jest.fn(() => new Promise(resolve => resolve({}))),
  METHODS: { GET: 'GET' },
}));

describe('api/getDataTypes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getDataTypes', () => {
    it('returns a promise', () => {
      expect(getDataTypes()).toBeInstanceOf(Promise);
    });

    it('get fragment page 1 by default', () => {
      getDataTypes({ page: 1, pageSize: 10 });
      expect(makeRequest).toHaveBeenCalledWith(
        correctRequest,
        {
          page: 1,
          pageSize: 10,
        },
      );
    });

    it('request page 2', () => {
      getDataTypes({ page: 2, pageSize: 10 });
      expect(makeRequest).toHaveBeenCalledWith(
        correctRequest,
        {
          page: 2,
          pageSize: 10,
        },
      );
    });

    it('request different page size', () => {
      getDataTypes({ page: 1, pageSize: 5 });
      expect(makeRequest).toHaveBeenCalledWith(
        correctRequest,
        {
          page: 1,
          pageSize: 5,
        },
      );
    });
    it('makes the request with additional params', () => {
      getDataTypes({ page: 1, pageSize: 10 }, '?param=true');
      expect(makeRequest).toHaveBeenCalledWith(
        {
          ...correctRequest,
          uri: '/api/datatypes?param=true',
        },
        {
          page: 1,
          pageSize: 10,
        },
      );
    });
  });
});
