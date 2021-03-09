import 'test/enzyme-init';
import { getUserProfile, putUserProfile, postUserProfile, putMyUserProfile } from 'api/userProfile';
import { makeRequest, METHODS } from '@entando/apimanager';
import { USER_PROFILE } from 'test/mocks/userProfile';

jest.unmock('api/userProfile');
jest.mock('@entando/apimanager', () => ({
  makeRequest: jest.fn(() => new Promise(resolve => resolve({}))),
  METHODS: require.requireActual('@entando/apimanager').METHODS,
}));
const username = 'username';

describe('api/userProfiles', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getUserProfile', () => {
    it('returns a promise', () => {
      expect(getUserProfile()).toBeInstanceOf(Promise);
    });

    it('makes the correct request', () => {
      getUserProfile(username);
      expect(makeRequest).toHaveBeenCalledWith({
        uri: `/api/userProfiles/${username}`,
        method: METHODS.GET,
        mockResponse: USER_PROFILE,
        useAuthentication: true,
      });
    });
  });

  describe('postUserProfile', () => {
    it('returns a promise', () => {
      expect(postUserProfile()).toBeInstanceOf(Promise);
    });

    it('makes the correct request', () => {
      postUserProfile(USER_PROFILE);
      expect(makeRequest).toHaveBeenCalledWith({
        uri: '/api/userProfiles',
        method: METHODS.POST,
        body: USER_PROFILE,
        mockResponse: USER_PROFILE,
        useAuthentication: true,
      });
    });
  });

  describe('putUserProfile', () => {
    it('returns a promise', () => {
      expect(putUserProfile(username, USER_PROFILE)).toBeInstanceOf(Promise);
    });

    it('makes the correct request', () => {
      putUserProfile(username, USER_PROFILE);
      expect(makeRequest).toHaveBeenCalledWith({
        uri: `/api/userProfiles/${username}`,
        method: METHODS.PUT,
        body: USER_PROFILE,
        mockResponse: USER_PROFILE,
        useAuthentication: true,
      });
    });
  });

  describe('putMyUserProfile', () => {
    it('returns a promise', () => {
      expect(putMyUserProfile(username, USER_PROFILE)).toBeInstanceOf(Promise);
    });

    it('makes the correct request', () => {
      putMyUserProfile(username, USER_PROFILE);
      expect(makeRequest).toHaveBeenCalledWith({
        uri: '/api/myUserProfile',
        method: METHODS.PUT,
        body: USER_PROFILE,
        mockResponse: USER_PROFILE,
        useAuthentication: true,
      });
    });
  });
});
