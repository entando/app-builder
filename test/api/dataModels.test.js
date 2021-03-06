import 'test/enzyme-init';

import { getDataModels, getDataModel, postDataModel, putDataModel, deleteDataModel } from 'api/dataModels';
import { makeRequest, METHODS } from '@entando/apimanager';
import { DATA_MODELS, DATA_MODEL_DELETE, ERROR } from 'test/mocks/dataModels';

const correctRequest = {
  uri: '/api/dataModels',
  method: METHODS.GET,
  mockResponse: DATA_MODELS.payload,
  useAuthentication: true,
  errors: expect.any(Function),
};

const PAGE_KEY_BAD = 'Gianni';

jest.unmock('api/dataModels');
jest.mock('@entando/apimanager', () => ({
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

  describe('getDataModel', () => {
    it('returns a promise', () => {
      expect(getDataModel(1)).toBeInstanceOf(Promise);
    });

    it('sends the correct request object', () => {
      getDataModel(2);
      expect(makeRequest).toHaveBeenCalledWith({
        uri: '/api/dataModels/2',
        method: METHODS.GET,
        mockResponse: {},
        useAuthentication: true,
      });
    });
  });

  describe('postDataModel', () => {
    it('returns a promise', () => {
      expect(postDataModel()).toBeInstanceOf(Promise);
    });

    it('sends the correct request object', () => {
      postDataModel({ data: 1 });
      expect(makeRequest).toHaveBeenCalledWith({
        uri: '/api/dataModels',
        method: METHODS.POST,
        mockResponse: {},
        body: { data: 1 },
        useAuthentication: true,
      });
    });
  });

  describe('putDataModel', () => {
    it('returns a promise', () => {
      expect(putDataModel({})).toBeInstanceOf(Promise);
    });

    it('sends the correct request object', () => {
      putDataModel({ modelId: 1 });
      expect(makeRequest).toHaveBeenCalledWith({
        uri: '/api/dataModels/1',
        method: METHODS.PUT,
        mockResponse: {},
        body: { modelId: 1 },
        useAuthentication: true,
      });
    });
  });


 describe('deleteDataModel', () => {
    it('returns a promise', () => {
      expect(deleteDataModel('dataModelId')).toBeInstanceOf(Promise);
    });

    it('makes the correct request', () => {
      const dataModelId = 'dataModelId';
      deleteDataModel(dataModelId);
      expect(makeRequest).toHaveBeenCalledWith({
        uri: `/api/dataModels/${dataModelId}`,
        method: METHODS.DELETE,
        mockResponse: DATA_MODEL_DELETE,
        useAuthentication: true,
      });
    });
  });
});
