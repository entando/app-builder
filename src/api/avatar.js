import { makeRequest, METHODS } from '@entando/apimanager';
import { FILE_BROWSER_FILE } from 'test/mocks/fileBrowser';

const AVATAR_ENDPOINT = '/api/userProfiles/avatar';

export const getAvatar = () =>
  makeRequest({
    uri: AVATAR_ENDPOINT,
    method: METHODS.GET,
    mockResponse: FILE_BROWSER_FILE,
    useAuthentication: true,
  });

export const postAvatar = avatar =>
  makeRequest({
    uri: AVATAR_ENDPOINT,
    method: METHODS.POST,
    body: avatar,
    mockResponse: FILE_BROWSER_FILE,
    useAuthentication: true,
  });

export const updateAvatar = avatar =>
  makeRequest({
    uri: AVATAR_ENDPOINT,
    method: METHODS.PUT,
    body: avatar,
    mockResponse: FILE_BROWSER_FILE,
    useAuthentication: true,
  });

export const deleteAvatar = () =>
  makeRequest({
    uri: AVATAR_ENDPOINT,
    method: METHODS.DELETE,
    mockResponse: FILE_BROWSER_FILE,
    useAuthentication: true,
  });

