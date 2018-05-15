import { makeRequest, METHODS } from '@entando/apimanager';
import { USER_SETTINGS } from 'test/mocks/userSettings';

export const getUserSettings = () => (
  makeRequest({
    uri: '/api/userSettings',
    method: METHODS.GET,
    mockResponse: USER_SETTINGS,
    useAuthentication: true,
  })
);

export const putUserSettings = settings => (
  makeRequest({
    uri: '/api/userSettings',
    method: METHODS.PUT,
    body: settings,
    mockResponse: USER_SETTINGS,
    useAuthentication: true,
  })
);
