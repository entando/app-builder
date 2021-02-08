import { makeRequest, METHODS } from '@entando/apimanager';
import { USER_PROFILE, USER_PROFILE_PICTURE } from 'test/mocks/userProfile';

export const getUserProfile = username => (
  makeRequest({
    uri: `/api/userProfiles/${username}`,
    method: METHODS.GET,
    mockResponse: USER_PROFILE,
    useAuthentication: true,
  })
);

export const putUserProfile = (username, profile) => (
  makeRequest({
    uri: `/api/userProfiles/${username}`,
    method: METHODS.PUT,
    body: profile,
    mockResponse: USER_PROFILE,
    useAuthentication: true,
  })
);

export const postUserProfile = profile => (
  makeRequest({
    uri: '/api/userProfiles',
    method: METHODS.POST,
    body: profile,
    mockResponse: USER_PROFILE,
    useAuthentication: true,
  })
);

export const getUserProfilePicture = username => (
  makeRequest({
    uri: `/api/userProfiles/${username}/profilePicture`,
    method: METHODS.GET,
    mockResponse: USER_PROFILE_PICTURE,
    useAuthentication: true,
  })
);

export const postUserProfilePicture = (username, picture) => (
  makeRequest({
    uri: `/api/userProfiles/${username}/profilePicture`,
    method: METHODS.POST,
    body: picture,
    contentType: 'multipart/form-data',
    mockResponse: USER_PROFILE_PICTURE,
    useAuthentication: true,
  })
);

export const deleteUserProfilePicture = username => (
  makeRequest({
    uri: `/api/userProfiles/${username}/profilePicture`,
    method: METHODS.DELETE,
    mockResponse: USER_PROFILE_PICTURE,
    useAuthentication: true,
  })
);

