import 'test/enzyme-init';
import { getFragment, getFragments } from 'api/fragments';
import { makeRequest } from 'api/apiManager';
import {
  GET_FRAGMENT_OK,
  LIST_FRAGMENTS_OK,
  BODY_ERROR,
} from 'test/mocks/fragments';

const FRAGMENT_CODE = 'myCode';

const correctRequest = {
  uri: '/api/fragments',
  method: 'GET',
  mockResponse: LIST_FRAGMENTS_OK,
  useAuthentication: true,
};

jest.unmock('api/fragments');
jest.mock('api/apiManager', () => ({
  makeRequest: jest.fn(() => new Promise(resolve => resolve({}))),
  METHODS: { GET: 'GET' },
}));

describe('api/fragments', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getFragment', () => {
    it('returns a promise', () => {
      const filledInput = getFragment(FRAGMENT_CODE);
      expect(typeof filledInput.then === 'function').toBeDefined();
    });

    it('get success response', () => {
      getFragment(FRAGMENT_CODE).then((response) => {
        expect(response).toEqual(GET_FRAGMENT_OK);
      });
    });

    it('get an error response with a not existing fragment code', () => {
      getFragment('BAD').then(() => {}, (error) => {
        expect(error).toEqual(BODY_ERROR);
      });
    });

    it('get error response', () => {
      getFragment().then(() => {}, (error) => {
        expect(error).toEqual(BODY_ERROR);
      });
    });
  });

  describe('getFragments', () => {
    it('returns a promise', () => {
      expect(getFragments()).toBeInstanceOf(Promise);
    });

    it('get fragment page 1 by default', () => {
      getFragments({ page: 1, pageSize: 10 });
      expect(makeRequest).toHaveBeenCalledWith(
        correctRequest,
        {
          page: 1,
          pageSize: 10,
        },
      );
    });

    it('request page 2', () => {
      getFragments({ page: 2, pageSize: 10 });
      expect(makeRequest).toHaveBeenCalledWith(
        correctRequest,
        {
          page: 2,
          pageSize: 10,
        },
      );
    });

    it('request different page size', () => {
      getFragments({ page: 1, pageSize: 5 });
      expect(makeRequest).toHaveBeenCalledWith(
        correctRequest,
        {
          page: 1,
          pageSize: 5,
        },
      );
    });

    it('makes the request with additional params', () => {
      getFragments({ page: 1, pageSize: 10 }, '?param=true');
      expect(makeRequest).toHaveBeenCalledWith(
        {
          ...correctRequest,
          uri: '/api/fragments?param=true',
        },
        {
          page: 1,
          pageSize: 10,
        },
      );
    });
  });
});
