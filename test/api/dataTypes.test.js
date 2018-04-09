import 'test/enzyme-init';
import {
  postDataType,
  getDataTypes,
  getDataTypeAttributes,
  getDataTypeAttribute,
} from 'api/dataTypes';

import { makeMockRequest, makeRequest, METHODS } from 'api/apiManager';

import {
  DATA_TYPES,
  DATA_TYPES_OK_PAGE_1,
  DATA_TYPES_ATTRIBUTES,
  DATA_TYPE_ATTRIBUTE,
} from 'test/mocks/dataTypes';

const correctRequest = {
  uri: '/api/dataTypes',
  method: METHODS.GET,
  mockResponse: DATA_TYPES_OK_PAGE_1,
  useAuthentication: true,
};


jest.unmock('api/dataTypes');
jest.mock('api/apiManager', () => ({
  makeRequest: jest.fn(() => new Promise(resolve => resolve({}))),
  makeMockRequest: jest.fn(() => new Promise(resolve => resolve({}))),
  METHODS: { GET: 'GET', POST: 'POST', PUT: 'PUT' },
}));

describe('api/postDataType', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('returns a promise', () => {
    expect(postDataType()).toBeInstanceOf(Promise);
  });

  it('if successful, returns a mock ok response', () => {
    postDataType(DATA_TYPES.payload);
    expect(makeMockRequest).toHaveBeenCalledWith({
      ...correctRequest,
      method: 'POST',
      mockResponse: DATA_TYPES,
      body: DATA_TYPES.payload,
    });
  });
});


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
          uri: '/api/dataTypes?param=true',
        },
        {
          page: 1,
          pageSize: 10,
        },
      );
    });
  });

  describe('api/getDataTypeAttributes', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    describe('getDataTypeAttributes', () => {
      it('returns a promise', () => {
        expect(getDataTypeAttributes()).toBeInstanceOf(Promise);
      });

      it('if successful, returns a attributes response', () => {
        getDataTypeAttributes();
        expect(makeMockRequest).toHaveBeenCalledWith(
          expect.objectContaining({
            ...correctRequest,
            uri: '/api/dataTypeAttributes',
            mockResponse: DATA_TYPES_ATTRIBUTES,
          }),
          {
            page: 1,
            pageSize: 10,
          },
        );
      });

      it('makes the request with additional params', () => {
        getDataTypeAttributes({ page: 1, pageSize: 10 }, '?param=true');
        expect(makeMockRequest).toHaveBeenCalledWith(
          expect.objectContaining({
            ...correctRequest,
            uri: '/api/dataTypeAttributes?param=true',
            mockResponse: DATA_TYPES_ATTRIBUTES,
          }),
          {
            page: 1,
            pageSize: 10,
          },
        );
      });
    });
  });
  describe('api/dataTypeAttributes', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
    describe('getDataTypeAttributes', () => {
      it('returns a promise', () => {
        expect(getDataTypeAttribute()).toBeInstanceOf(Promise);
      });

      it('if successful, returns a attributes response', () => {
        getDataTypeAttribute('code');
        expect(makeMockRequest).toHaveBeenCalledWith(expect.objectContaining({
          ...correctRequest,
          uri: '/api/dataTypeAttributes/code',
          mockResponse: DATA_TYPE_ATTRIBUTE,
        }));
      });
    });
  });
});
