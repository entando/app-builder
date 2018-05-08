import 'test/enzyme-init';
import {
  getFragment,
  getFragments,
  getFragmentSettings,
  putFragmentSettings,
  deleteFragment,
  postFragment,
  putFragment,
} from 'api/fragments';
import { makeRequest, METHODS } from '@entando/apimanager';
import {
  GET_FRAGMENT_OK,
  LIST_FRAGMENTS_OK,
  FRAGMENT_SETTING,
} from 'test/mocks/fragments';

const FRAGMENT_CODE = 'myCode';
const FRAGMENT_SETTING_OBJ = { enableEditingWhenEmptyDefaultGui: true };
const correctRequest = {
  uri: '/api/fragments',
  method: 'GET',
  mockResponse: LIST_FRAGMENTS_OK,
  useAuthentication: true,
};

jest.unmock('api/fragments');
makeRequest.mockImplementation(() => Promise.resolve({}));

describe('api/fragments', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getFragment', () => {
    it('returns a promise', () => {
      const filledInput = getFragment(FRAGMENT_CODE);
      expect(typeof filledInput.then === 'function').toBeDefined();
      expect(filledInput).toBeInstanceOf(Promise);
    });

    it('make the request', () => {
      getFragment(FRAGMENT_CODE);
      expect(makeRequest).toHaveBeenCalledWith(expect.objectContaining({
        uri: '/api/fragments/myCode',
        method: 'GET',
        mockResponse: GET_FRAGMENT_OK,

      }));
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
  describe('getFragmentSettings', () => {
    it('return a Promise', () => {
      expect(getFragmentSettings()).toBeInstanceOf(Promise);
    });

    it('make the request', () => {
      getFragmentSettings();
      expect(makeRequest).toHaveBeenCalledWith(expect.objectContaining({
        uri: '/api/fragmentsSettings',
        method: 'GET',
        mockResponse: FRAGMENT_SETTING,

      }));
    });
  });

  describe('putFragmentSettings', () => {
    it('return a Promise', () => {
      expect(putFragmentSettings(FRAGMENT_SETTING_OBJ)).toBeInstanceOf(Promise);
    });

    it('makes the correct request with settings body', () => {
      putFragmentSettings(FRAGMENT_SETTING_OBJ);
      expect(makeRequest).toHaveBeenCalledWith(expect.objectContaining({
        method: METHODS.PUT,
        uri: '/api/fragmentsSettings',
        body: FRAGMENT_SETTING_OBJ,
        useAuthentication: true,
      }));
    });
  });

  describe('postFragment', () => {
    it('return a Promise', () => {
      expect(postFragment(GET_FRAGMENT_OK)).toBeInstanceOf(Promise);
    });

    it('makes the correct request with settings body', () => {
      postFragment(GET_FRAGMENT_OK);
      expect(makeRequest).toHaveBeenCalledWith(expect.objectContaining({
        method: METHODS.POST,
        uri: '/api/fragments',
        body: { code: GET_FRAGMENT_OK.code, guiCode: GET_FRAGMENT_OK.guiCode },
        useAuthentication: true,
      }));
    });
  });

  describe('putFragment', () => {
    it('return a Promise', () => {
      expect(putFragment(GET_FRAGMENT_OK)).toBeInstanceOf(Promise);
    });

    it('makes the correct request with settings body', () => {
      putFragment(GET_FRAGMENT_OK);
      expect(makeRequest).toHaveBeenCalledWith(expect.objectContaining({
        method: METHODS.PUT,
        uri: `/api/fragments/${GET_FRAGMENT_OK.code}`,
        body: { code: GET_FRAGMENT_OK.code, guiCode: GET_FRAGMENT_OK.guiCode },
        useAuthentication: true,
      }));
    });
  });

  describe('deleteFragment', () => {
    it('return a Promise', () => {
      expect(deleteFragment('code')).toBeInstanceOf(Promise);
    });

    it('makes the correct request with settings body', () => {
      deleteFragment('code');
      expect(makeRequest).toHaveBeenCalledWith(expect.objectContaining({
        method: METHODS.DELETE,
        uri: '/api/fragments/code',
        mockResponse: { code: 'code' },
        useAuthentication: true,
      }));
    });
  });
});
