import 'test/enzyme-init';
import { getLabels, putLabel, postLabel, deleteLabel } from 'api/labels';
import { makeMockRequest, METHODS } from 'api/apiManager';
import { LABELS_LIST } from 'test/mocks/labels';


const correctRequest = {
  uri: '/labels',
  method: METHODS.GET,
  mockResponse: LABELS_LIST,
  useAuthentication: true,
};

const LABEL_KEY = 'HELLO';
const LABEL_OBJ = {
  key: LABEL_KEY,
  titles: {
    it: 'Ciao',
    en: 'Hello',
  },
};

jest.unmock('api/labels');
jest.mock('api/apiManager', () => ({
  makeMockRequest: jest.fn(() => new Promise(resolve => resolve({}))),
  METHODS: require.requireActual('api/apiManager').METHODS,
}));

describe('api/labels', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getLabels', () => {
    it('returns a promise', () => {
      expect(getLabels()).toBeInstanceOf(Promise);
    });

    it('get fragment page 1 by default', () => {
      getLabels({ page: 1, pageSize: 10 });
      expect(makeMockRequest).toHaveBeenCalledWith(
        correctRequest,
        {
          page: 1,
          pageSize: 10,
        },
      );
    });

    it('request page 2', () => {
      getLabels({ page: 2, pageSize: 10 });
      expect(makeMockRequest).toHaveBeenCalledWith(
        correctRequest,
        {
          page: 2,
          pageSize: 10,
        },
      );
    });

    it('request different page size', () => {
      getLabels({ page: 1, pageSize: 5 });
      expect(makeMockRequest).toHaveBeenCalledWith(
        correctRequest,
        {
          page: 1,
          pageSize: 5,
        },
      );
    });

    it('makes the request with additional params', () => {
      getLabels({ page: 1, pageSize: 10 }, '?param=true');
      expect(makeMockRequest).toHaveBeenCalledWith(
        {
          ...correctRequest,
          uri: '/labels?param=true',
        },
        {
          page: 1,
          pageSize: 10,
        },
      );
    });
  });

  describe('putLabel', () => {
    it('returns a promise', () => {
      expect(putLabel(LABEL_OBJ)).toBeInstanceOf(Promise);
    });

    it('makes the correct request with label body', () => {
      putLabel(LABEL_OBJ);
      expect(makeMockRequest).toHaveBeenCalledWith(expect.objectContaining({
        method: METHODS.PUT,
        uri: `/labels/${LABEL_OBJ.key}`,
        body: LABEL_OBJ,
        useAuthentication: true,
      }));
    });
  });

  describe('postLabel', () => {
    it('returns a promise', () => {
      expect(postLabel(LABEL_OBJ)).toBeInstanceOf(Promise);
    });

    it('makes the correct request with label body', () => {
      postLabel(LABEL_OBJ);
      expect(makeMockRequest).toHaveBeenCalledWith(expect.objectContaining({
        method: METHODS.POST,
        uri: '/labels',
        body: LABEL_OBJ,
        useAuthentication: true,
      }));
    });
  });

  describe('deleteLabel', () => {
    it('returns a promise', () => {
      expect(deleteLabel(LABEL_KEY)).toBeInstanceOf(Promise);
    });

    it('makes the correct request', () => {
      deleteLabel(LABEL_KEY);
      expect(makeMockRequest).toHaveBeenCalledWith(expect.objectContaining({
        method: METHODS.DELETE,
        uri: `/labels/${LABEL_KEY}`,
        useAuthentication: true,
      }));
    });
  });
});
