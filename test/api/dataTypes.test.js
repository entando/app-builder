import 'test/enzyme-init';
import {
  postDataType,
  putDataType,
  deleteDataType,
  getDataTypes,
  getAttributeFromDataType,
  deleteAttributeFromDataType,
  postAttributeFromDataType,
  putAttributeFromDataType,
  getDataTypeAttributes,
  getDataTypeAttribute,
} from 'api/dataTypes';

import { makeMockRequest, makeRequest, METHODS } from 'api/apiManager';

import {
  DATA_TYPES,
  DATA_TYPES_DELETE_OK,
  ATTRIBUTE_DATA_TYPES_DELETE_OK,
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
  METHODS: {
    GET: 'GET', POST: 'POST', PUT: 'PUT', DELETE: 'DELETE',
  },
}));

describe('api/postDataType', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('returns a promise', () => {
    expect(postDataType()).toBeInstanceOf(Promise);
  });

  it('if successful, returns a mock ok response', () => {
    postDataType(DATA_TYPES);
    expect(makeMockRequest).toHaveBeenCalledWith({
      ...correctRequest,
      method: 'POST',
      mockResponse: DATA_TYPES,
      body: DATA_TYPES,
    });
  });
});

describe('api/putDataType', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('returns a promise', () => {
    expect(putDataType(DATA_TYPES)).toBeInstanceOf(Promise);
  });

  it('if successful, returns a mock ok response', () => {
    putDataType(DATA_TYPES);
    expect(makeMockRequest).toHaveBeenCalledWith({
      ...correctRequest,
      uri: '/api/dataTypes/AAA',
      method: 'PUT',
      mockResponse: DATA_TYPES,
      body: DATA_TYPES,
    });
  });
});

describe('api/deleteDataType', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('returns a promise', () => {
    expect(deleteDataType('AAA')).toBeInstanceOf(Promise);
  });

  it('if successful, returns a mock ok response', () => {
    deleteDataType('AAA');
    expect(makeMockRequest).toHaveBeenCalledWith({
      ...correctRequest,
      uri: '/api/dataTypes/AAA',
      method: 'DELETE',
      mockResponse: DATA_TYPES_DELETE_OK,
      body: 'AAA',
    });
  });
});

describe('/api/dataTypes/', () => {
  describe('getAttributeFromDataType', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
    it('returns a promise', () => {
      expect(getAttributeFromDataType()).toBeInstanceOf(Promise);
    });

    it('if successful, returns a mock ok response', () => {
      getAttributeFromDataType('AAA', 'code');
      expect(makeMockRequest).toHaveBeenCalledWith({
        ...correctRequest,
        uri: '/api/dataTypes/AAA/attribute/code',
        mockResponse: DATA_TYPES.attributes[0],
      });
    });
  });

  describe('deleteAttributeFromDataType', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
    it('returns a promise', () => {
      expect(deleteAttributeFromDataType()).toBeInstanceOf(Promise);
    });

    it('if successful, returns a mock ok response', () => {
      deleteAttributeFromDataType('AAA', 'code');
      expect(makeMockRequest).toHaveBeenCalledWith({
        ...correctRequest,
        uri: '/api/dataTypes/AAA/attribute/code',
        method: 'DELETE',
        mockResponse: ATTRIBUTE_DATA_TYPES_DELETE_OK,
      });
    });
  });

  describe('postAttributeFromDataType', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
    it('returns a promise', () => {
      expect(postAttributeFromDataType()).toBeInstanceOf(Promise);
    });

    it('if successful, returns a mock ok response', () => {
      postAttributeFromDataType('AAA', DATA_TYPES.attributes[0]);
      expect(makeMockRequest).toHaveBeenCalledWith({
        ...correctRequest,
        uri: '/api/dataTypes/AAA/attribute',
        method: 'POST',
        body: DATA_TYPES.attributes[0],
        mockResponse: DATA_TYPES.attributes[0],
      });
    });
  });

  describe('putAttributeFromDataType', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
    it('returns a promise', () => {
      expect(putAttributeFromDataType('AAA', DATA_TYPES.attributes[0])).toBeInstanceOf(Promise);
    });

    it('if successful, returns a mock ok response', () => {
      putAttributeFromDataType('AAA', DATA_TYPES.attributes[0]);
      expect(makeMockRequest).toHaveBeenCalledWith({
        ...correctRequest,
        uri: '/api/dataTypes/AAA/attribute/attrCode',
        method: 'PUT',
        body: DATA_TYPES.attributes[0],
        mockResponse: DATA_TYPES.attributes[0],
      });
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
        expect(makeRequest).toHaveBeenCalledWith(
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
        expect(makeRequest).toHaveBeenCalledWith(
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
        expect(makeRequest).toHaveBeenCalledWith(expect.objectContaining({
          ...correctRequest,
          uri: '/api/dataTypeAttributes/code',
          mockResponse: DATA_TYPE_ATTRIBUTE,
        }));
      });
    });
  });
});
