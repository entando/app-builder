import { configEnzymeAdapter } from 'test/legacyTestUtils';

import {
  postContentType,
  putContentType,
  deleteContentType,
  getContentType,
  getContentTypes,
  getAttributeFromContentType,
  deleteAttributeFromContentType,
  postAttributeFromContentType,
  putAttributeFromContentType,
  getContentTypeAttributes,
  getContentTypeAttribute,
  moveAttributeUp,
  moveAttributeDown,
  getContentTypesStatus,
  postContentTypesStatus,
  postRefreshContentType,
} from 'api/contentTypes';

import { makeRequest, METHODS } from '@entando/apimanager';

import {
  GET_CONTENT_TYPES_RESPONSE_OK,
  CONTENT_TYPES_DELETE_OK,
  CONTENT_TYPES_ATTRIBUTES,
  CONTENT_TYPE_ATTRIBUTE,
  CONTENT_TYPE_RELOAD_REFERENCES_STATUS,
  ATTRIBUTE_CONTENT_TYPES_DELETE_OK,
  ATTRIBUTE_MOVE_UP,
  ATTRIBUTE_MOVE_DOWN,
} from 'test/mocks/contentType';

configEnzymeAdapter();

const contentTypePath = '/api/plugins/cms/contentTypes';

jest.unmock('api/contentTypes');
jest.mock('@entando/apimanager', () => ({
  makeRequest: jest.fn(() => new Promise(resolve => resolve({}))),
  METHODS: {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
  },
}));

const correctRequest = {
  uri: contentTypePath,
  method: METHODS.GET,
  mockResponse: GET_CONTENT_TYPES_RESPONSE_OK,
  useAuthentication: true,
};

describe('api/getContentTypesStatus', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('returns a promise', () => {
    expect(getContentTypesStatus()).toBeInstanceOf(Promise);
  });

  it('if successful, returns a mock ok response', () => {
    getContentTypesStatus();
    expect(makeRequest).toHaveBeenCalledWith({
      uri: `${contentTypePath}Status`,
      method: METHODS.GET,
      mockResponse: CONTENT_TYPE_RELOAD_REFERENCES_STATUS,
      useAuthentication: true,
    });
  });
});

describe('api/postContentTypesStatus', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('returns a promise', () => {
    expect(postContentTypesStatus([])).toBeInstanceOf(Promise);
  });

  it('if successful, returns a mock ok response', () => {
    postContentTypesStatus([]);
    expect(makeRequest).toHaveBeenCalledWith({
      uri: `${contentTypePath}Status`,
      body: [],
      method: 'POST',
      mockResponse: CONTENT_TYPE_RELOAD_REFERENCES_STATUS,
      useAuthentication: true,
    });
  });
});

describe('api/postRefreshContentType', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('returns a promise', () => {
    expect(postRefreshContentType('AAA')).toBeInstanceOf(Promise);
  });

  it('if successful, returns a mock ok response', () => {
    postRefreshContentType('AAA');
    expect(makeRequest).toHaveBeenCalledWith({
      uri: `${contentTypePath}/refresh/AAA`,
      body: { contentTypeCode: 'AAA' },
      method: 'POST',
      mockResponse: { contentTypeCode: 'AAA' },
      useAuthentication: true,
    });
  });
});

describe('api/postContentType', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('returns a promise', () => {
    expect(postContentType()).toBeInstanceOf(Promise);
  });

  it('if successful, returns a mock ok response', () => {
    postContentType(GET_CONTENT_TYPES_RESPONSE_OK[0]);
    expect(makeRequest).toHaveBeenCalledWith({
      ...correctRequest,
      method: 'POST',
      mockResponse: GET_CONTENT_TYPES_RESPONSE_OK[0],
      body: GET_CONTENT_TYPES_RESPONSE_OK[0],
    });
  });
});

describe('api/putContentType', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('returns a promise', () => {
    expect(putContentType(GET_CONTENT_TYPES_RESPONSE_OK[0])).toBeInstanceOf(Promise);
  });

  it('if successful, returns a mock ok response', () => {
    putContentType(GET_CONTENT_TYPES_RESPONSE_OK[0]);
    expect(makeRequest).toHaveBeenCalledWith({
      ...correctRequest,
      uri: contentTypePath,
      method: 'PUT',
      mockResponse: GET_CONTENT_TYPES_RESPONSE_OK[0],
      body: GET_CONTENT_TYPES_RESPONSE_OK[0],
    });
  });
});

describe('api/getContentType', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('returns a promise', () => {
    expect(getContentType('AAA')).toBeInstanceOf(Promise);
  });

  it('if successful, returns a mock ok response', () => {
    getContentType('AAA');
    expect(makeRequest).toHaveBeenCalledWith({
      ...correctRequest,
      uri: `${contentTypePath}/AAA`,
      method: 'GET',
      mockResponse: GET_CONTENT_TYPES_RESPONSE_OK[0],
    });
  });
});

describe('api/deleteContentType', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('returns a promise', () => {
    expect(deleteContentType('AAA')).toBeInstanceOf(Promise);
  });

  it('if successful, returns a mock ok response', () => {
    deleteContentType('AAA');
    expect(makeRequest).toHaveBeenCalledWith({
      ...correctRequest,
      uri: `${contentTypePath}/AAA`,
      method: 'DELETE',
      mockResponse: CONTENT_TYPES_DELETE_OK,
      body: 'AAA',
    });
  });
});

describe('/api/contentTypes/', () => {
  describe('getAttributeFromContentType', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
    it('returns a promise', () => {
      expect(getAttributeFromContentType()).toBeInstanceOf(Promise);
    });

    it('if successful, returns a mock ok response', () => {
      getAttributeFromContentType('AAA', 'code');
      expect(makeRequest).toHaveBeenCalledWith({
        ...correctRequest,
        uri: `${contentTypePath}/AAA/attributes/code`,
        mockResponse: GET_CONTENT_TYPES_RESPONSE_OK[0].attributes[0],
      });
    });
  });

  describe('deleteAttributeFromContentType', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
    it('returns a promise', () => {
      expect(deleteAttributeFromContentType()).toBeInstanceOf(Promise);
    });

    it('if successful, returns a mock ok response', () => {
      deleteAttributeFromContentType('AAA', 'code');
      expect(makeRequest).toHaveBeenCalledWith({
        ...correctRequest,
        uri: `${contentTypePath}/AAA/attributes/code`,
        method: 'DELETE',
        mockResponse: ATTRIBUTE_CONTENT_TYPES_DELETE_OK,
      });
    });
  });

  describe('postAttributeFromContentType', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
    it('returns a promise', () => {
      expect(postAttributeFromContentType()).toBeInstanceOf(Promise);
    });

    it('if successful, returns a mock ok response', () => {
      postAttributeFromContentType('AAA', GET_CONTENT_TYPES_RESPONSE_OK[0].attributes[0]);
      expect(makeRequest).toHaveBeenCalledWith({
        ...correctRequest,
        uri: `${contentTypePath}/AAA/attributes`,
        method: 'POST',
        body: GET_CONTENT_TYPES_RESPONSE_OK[0].attributes[0],
        mockResponse: GET_CONTENT_TYPES_RESPONSE_OK[0].attributes[0],
      });
    });
  });

  describe('putAttributeFromContentType', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
    it('returns a promise', () => {
      expect(
        putAttributeFromContentType('AAA', GET_CONTENT_TYPES_RESPONSE_OK[0].attributes[0]),
      ).toBeInstanceOf(Promise);
    });

    it('if successful, returns a mock ok response', () => {
      putAttributeFromContentType('AAA', GET_CONTENT_TYPES_RESPONSE_OK[0].attributes[0]);
      expect(makeRequest).toHaveBeenCalledWith({
        ...correctRequest,
        uri: `${contentTypePath}/AAA/attributes/attrCode`,
        method: 'PUT',
        body: GET_CONTENT_TYPES_RESPONSE_OK[0].attributes[0],
        mockResponse: GET_CONTENT_TYPES_RESPONSE_OK[0].attributes[0],
      });
    });
  });
});

describe('api/getContentTypes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getContentTypes', () => {
    it('returns a promise', () => {
      expect(getContentTypes()).toBeInstanceOf(Promise);
    });

    it('get fragment page 1 by default', () => {
      getContentTypes({ page: 1, pageSize: 10 });
      expect(makeRequest).toHaveBeenCalledWith(correctRequest, {
        page: 1,
        pageSize: 10,
      });
    });

    it('request page 2', () => {
      getContentTypes({ page: 2, pageSize: 10 });
      expect(makeRequest).toHaveBeenCalledWith(correctRequest, {
        page: 2,
        pageSize: 10,
      });
    });

    it('request different page size', () => {
      getContentTypes({ page: 1, pageSize: 5 });
      expect(makeRequest).toHaveBeenCalledWith(correctRequest, {
        page: 1,
        pageSize: 5,
      });
    });
    it('makes the request with additional params', () => {
      getContentTypes({ page: 1, pageSize: 10 }, '?param=true');
      expect(makeRequest).toHaveBeenCalledWith(
        {
          ...correctRequest,
          uri: `${contentTypePath}?param=true`,
        },
        {
          page: 1,
          pageSize: 10,
        },
      );
    });
  });

  describe('api/getContentTypeAttributes', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    describe('getContentTypeAttributes', () => {
      it('returns a promise', () => {
        expect(getContentTypeAttributes()).toBeInstanceOf(Promise);
      });

      it('if successful, returns a attributes response', () => {
        getContentTypeAttributes();
        expect(makeRequest).toHaveBeenCalledWith(
          expect.objectContaining({
            ...correctRequest,
            uri: '/api/plugins/cms/contentTypeAttributes',
            mockResponse: CONTENT_TYPES_ATTRIBUTES,
          }),
          {
            page: 1,
            pageSize: 10,
          },
        );
      });

      it('makes the request with additional params', () => {
        getContentTypeAttributes({ page: 1, pageSize: 10 }, '?param=true');
        expect(makeRequest).toHaveBeenCalledWith(
          expect.objectContaining({
            ...correctRequest,
            uri: '/api/plugins/cms/contentTypeAttributes?param=true',
            mockResponse: CONTENT_TYPES_ATTRIBUTES,
          }),
          {
            page: 1,
            pageSize: 10,
          },
        );
      });
    });
  });
  describe('api/contentTypeAttribute', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
    describe('getContentTypeAttribute', () => {
      it('returns a promise', () => {
        expect(getContentTypeAttribute()).toBeInstanceOf(Promise);
      });

      it('if successful, returns a attributes response', () => {
        getContentTypeAttribute('code', 'dods');
        expect(makeRequest).toHaveBeenCalledWith(
          expect.objectContaining({
            ...correctRequest,
            uri: '/api/plugins/cms/contentTypeAttributes/code/attribute/dods',
            mockResponse: CONTENT_TYPE_ATTRIBUTE,
          }),
        );
      });
    });
  });
  describe('moveAttributeUp', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
    it('returns a promise', () => {
      expect(moveAttributeUp()).toBeInstanceOf(Promise);
    });

    it('if successful, returns a move up comfirm', () => {
      moveAttributeUp('ContentType_code', 'attribute_code');
      expect(makeRequest).toHaveBeenCalledWith(
        expect.objectContaining({
          ...correctRequest,
          body: {},
          method: METHODS.PUT,
          uri: `${contentTypePath}/ContentType_code/attributes/attribute_code/moveUp`,
          mockResponse: ATTRIBUTE_MOVE_UP,
        }),
      );
    });
  });

  describe('moveAttributeDown', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('returns a promise', () => {
      expect(moveAttributeDown()).toBeInstanceOf(Promise);
    });

    it('if successful, returns a move up comfirm', () => {
      moveAttributeDown('ContentType_code', 'attribute_code');
      expect(makeRequest).toHaveBeenCalledWith(
        expect.objectContaining({
          ...correctRequest,
          body: {},
          method: METHODS.PUT,
          uri: `${contentTypePath}/ContentType_code/attributes/attribute_code/moveDown`,
          mockResponse: ATTRIBUTE_MOVE_DOWN,
        }),
      );
    });
  });
});
