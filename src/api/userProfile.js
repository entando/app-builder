import { makeRequest, METHODS } from '@entando/apimanager';
import { USER_PROFILE } from 'test/mocks/userProfile';

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

export const getMyUserProfile = () => (
  makeRequest({
    uri: '/api/myUserProfile',
    method: METHODS.GET,
    mockResponse: USER_PROFILE,
    useAuthentication: true,
  })
);

export const putMyUserProfile = (username, profile) => (
  makeRequest({
    uri: '/api/myUserProfile',
    method: METHODS.PUT,
    body: profile,
    mockResponse: USER_PROFILE,
    useAuthentication: true,
  })
);
