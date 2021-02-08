import 'test/enzyme-init';
import { getUserProfile, putUserProfile, postUserProfile, getUserProfilePicture, deleteUserProfilePicture, postUserProfilePicture } from 'api/userProfile';
import { makeRequest, METHODS } from '@entando/apimanager';
import { USER_PROFILE, USER_PROFILE_PICTURE } from 'test/mocks/userProfile';

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

  describe('getUserProfilePicture', () => {
    it('returns a promise', () => {
      expect(getUserProfilePicture()).toBeInstanceOf(Promise);
    });

    it('makes the correct request', () => {
      getUserProfilePicture(username);
      expect(makeRequest).toHaveBeenCalledWith({
        uri: `/api/userProfiles/${username}/profilePicture`,
        method: METHODS.GET,
        mockResponse: USER_PROFILE_PICTURE,
        useAuthentication: true,
      });
    });
  });

  describe('postUserProfilePicture', () => {
    it('returns a promise', () => {
      expect(postUserProfilePicture()).toBeInstanceOf(Promise);
    });

    it('makes the correct request', () => {
      postUserProfilePicture(username, USER_PROFILE_PICTURE);
      expect(makeRequest).toHaveBeenCalledWith({
        uri: `/api/userProfiles/${username}/profilePicture`,
        method: METHODS.POST,
        body: USER_PROFILE_PICTURE,
        contentType: 'multipart/form-data',
        mockResponse: USER_PROFILE_PICTURE,
        useAuthentication: true,
      });
    });
  });

  describe('deleteUserProfilePicture', () => {
    it('returns a promise', () => {
      expect(deleteUserProfilePicture()).toBeInstanceOf(Promise);
    });

    it('makes the correct request', () => {
      deleteUserProfilePicture(username);
      expect(makeRequest).toHaveBeenCalledWith({
        uri: `/api/userProfiles/${username}/profilePicture`,
        method: METHODS.DELETE,
        mockResponse: USER_PROFILE_PICTURE,
        useAuthentication: true,
      });
    });
  });
});
