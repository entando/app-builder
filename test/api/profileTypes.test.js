import 'test/enzyme-init';
import {
  postProfileType,
  putProfileType,
  deleteProfileType,
  getProfileType,
  getProfileTypes,
  getAttributeFromProfileType,
  deleteAttributeFromProfileType,
  postAttributeFromProfileType,
  putAttributeFromProfileType,
  getProfileTypeAttributes,
  getProfileTypeAttribute,
} from 'api/profileTypes';

import { makeRequest, METHODS } from '@entando/apimanager';

import {
  PROFILE_TYPES,
  PROFILE_TYPES_DELETE_OK,
  ATTRIBUTE_PROFILE_TYPES_DELETE_OK,
  PROFILE_TYPES_OK_PAGE_1,
  PROFILE_TYPES_ATTRIBUTES,
  PROFILE_TYPE_ATTRIBUTE,
} from 'test/mocks/profileTypes';

const correctRequest = {
  uri: '/api/profileTypes',
  method: METHODS.GET,
  mockResponse: PROFILE_TYPES_OK_PAGE_1,
  useAuthentication: true,
};


jest.unmock('api/profileTypes');
makeRequest.mockImplementation(() => Promise.resolve({}));

describe('api/postProfileType', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('returns a promise', () => {
    expect(postProfileType()).toBeInstanceOf(Promise);
  });

  it('if successful, returns a mock ok response', () => {
    postProfileType(PROFILE_TYPES);
    expect(makeRequest).toHaveBeenCalledWith({
      uri: '/api/profileTypes',
      method: 'POST',
      mockResponse: PROFILE_TYPES,
      body: PROFILE_TYPES,
      useAuthentication: true,
    });
  });
});

describe('api/putProfileType', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('returns a promise', () => {
    expect(putProfileType(PROFILE_TYPES)).toBeInstanceOf(Promise);
  });

  it('if successful, returns a mock ok response', () => {
    putProfileType(PROFILE_TYPES);
    expect(makeRequest).toHaveBeenCalledWith({
      uri: '/api/profileTypes/AAA',
      method: 'PUT',
      mockResponse: PROFILE_TYPES,
      body: PROFILE_TYPES,
      useAuthentication: true,
    });
  });
});

describe('api/getProfileType', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('returns a promise', () => {
    expect(getProfileType('AAA')).toBeInstanceOf(Promise);
  });

  it('if successful, returns a mock ok response', () => {
    getProfileType('AAA');
    expect(makeRequest).toHaveBeenCalledWith({
      uri: '/api/profileTypes/AAA',
      method: 'GET',
      mockResponse: PROFILE_TYPES,
      useAuthentication: true,
    });
  });
});


describe('api/deleteProfileType', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('returns a promise', () => {
    expect(deleteProfileType('AAA')).toBeInstanceOf(Promise);
  });

  it('if successful, returns a mock ok response', () => {
    deleteProfileType('AAA');
    expect(makeRequest).toHaveBeenCalledWith({
      uri: '/api/profileTypes/AAA',
      method: 'DELETE',
      mockResponse: PROFILE_TYPES_DELETE_OK,
      body: 'AAA',
      useAuthentication: true,
    });
  });
});

describe('/api/profileTypes/', () => {
  describe('getAttributeFromProfileType', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
    it('returns a promise', () => {
      expect(getAttributeFromProfileType()).toBeInstanceOf(Promise);
    });

    it('if successful, returns a mock ok response', () => {
      getAttributeFromProfileType('AAA', 'code');
      expect(makeRequest).toHaveBeenCalledWith({
        uri: '/api/profileTypes/AAA/attribute/code',
        method: 'GET',
        mockResponse: PROFILE_TYPES.attributes[0],
        useAuthentication: true,
      });
    });
  });

  describe('deleteAttributeFromProfileType', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
    it('returns a promise', () => {
      expect(deleteAttributeFromProfileType()).toBeInstanceOf(Promise);
    });

    it('if successful, returns a mock ok response', () => {
      deleteAttributeFromProfileType('AAA', 'code');
      expect(makeRequest).toHaveBeenCalledWith({
        uri: '/api/profileTypes/AAA/attribute/code',
        method: 'DELETE',
        mockResponse: ATTRIBUTE_PROFILE_TYPES_DELETE_OK,
        useAuthentication: true,
      });
    });
  });

  describe('postAttributeFromProfileType', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
    it('returns a promise', () => {
      expect(postAttributeFromProfileType()).toBeInstanceOf(Promise);
    });

    it('if successful, returns a mock ok response', () => {
      postAttributeFromProfileType('AAA', PROFILE_TYPES.attributes[0]);
      expect(makeRequest).toHaveBeenCalledWith({
        uri: '/api/profileTypes/AAA/attribute',
        method: 'POST',
        body: PROFILE_TYPES.attributes[0],
        mockResponse: PROFILE_TYPES.attributes[0],
        useAuthentication: true,
      });
    });
  });

  describe('putAttributeFromProfileType', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
    it('returns a promise', () => {
      expect(putAttributeFromProfileType('AAA', PROFILE_TYPES.attributes[0])).toBeInstanceOf(Promise);
    });

    it('if successful, returns a mock ok response', () => {
      putAttributeFromProfileType('AAA', PROFILE_TYPES.attributes[0]);
      expect(makeRequest).toHaveBeenCalledWith({
        uri: '/api/profileTypes/AAA/attribute/attrCode',
        method: 'PUT',
        body: PROFILE_TYPES.attributes[0],
        mockResponse: PROFILE_TYPES.attributes[0],
        useAuthentication: true,
      });
    });
  });
});

describe('api/getProfileTypes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getProfileTypes', () => {
    it('returns a promise', () => {
      expect(getProfileTypes()).toBeInstanceOf(Promise);
    });

    it('get fragment page 1 by default', () => {
      getProfileTypes({ page: 1, pageSize: 10 });
      expect(makeRequest).toHaveBeenCalledWith(
        correctRequest,
        {
          page: 1,
          pageSize: 10,
        },
      );
    });

    it('request page 2', () => {
      getProfileTypes({ page: 2, pageSize: 10 });
      expect(makeRequest).toHaveBeenCalledWith(
        correctRequest,
        {
          page: 2,
          pageSize: 10,
        },
      );
    });

    it('request different page size', () => {
      getProfileTypes({ page: 1, pageSize: 5 });
      expect(makeRequest).toHaveBeenCalledWith(
        correctRequest,
        {
          page: 1,
          pageSize: 5,
        },
      );
    });
    it('makes the request with additional params', () => {
      getProfileTypes({ page: 1, pageSize: 10 }, '?param=true');
      expect(makeRequest).toHaveBeenCalledWith(
        {
          uri: '/api/profileTypes?param=true',
          mockResponse: PROFILE_TYPES_OK_PAGE_1,
          method: 'GET',
          useAuthentication: true,
        },
        {
          page: 1,
          pageSize: 10,
        },
      );
    });
  });

  describe('api/getProfileTypeAttributes', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    describe('getProfileTypeAttributes', () => {
      it('returns a promise', () => {
        expect(getProfileTypeAttributes()).toBeInstanceOf(Promise);
      });

      it('if successful, returns a attributes response', () => {
        getProfileTypeAttributes();
        expect(makeRequest).toHaveBeenCalledWith(
          expect.objectContaining({
            uri: '/api/profileTypeAttributes',
            method: 'GET',
            mockResponse: PROFILE_TYPES_ATTRIBUTES,
            useAuthentication: true,
          }),
          {
            page: 1,
            pageSize: 10,
          },
        );
      });

      it('makes the request with additional params', () => {
        getProfileTypeAttributes({ page: 1, pageSize: 10 }, '?param=true');
        expect(makeRequest).toHaveBeenCalledWith(
          expect.objectContaining({
            uri: '/api/profileTypeAttributes?param=true',
            method: 'GET',
            mockResponse: PROFILE_TYPES_ATTRIBUTES,
            useAuthentication: true,
          }),
          {
            page: 1,
            pageSize: 10,
          },
        );
      });
    });
  });
  describe('api/profileTypeAttributes', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
    describe('getProfileTypeAttributes', () => {
      it('returns a promise', () => {
        expect(getProfileTypeAttribute()).toBeInstanceOf(Promise);
      });

      it('if successful, returns a attributes response', () => {
        getProfileTypeAttribute('code');
        expect(makeRequest).toHaveBeenCalledWith(expect.objectContaining({
          uri: '/api/profileTypeAttributes/code',
          method: 'GET',
          mockResponse: PROFILE_TYPE_ATTRIBUTE,
          useAuthentication: true,
        }));
      });
    });
  });
});
