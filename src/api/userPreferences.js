import { makeRequest, METHODS } from '@entando/apimanager';
import { USER_PREFERENCES } from 'test/mocks/userPreferences';

export const getUserPreferences = username => (
  makeRequest({
    uri: `/api/userPreferences/${username}`,
    method: METHODS.GET,
    mockResponse: USER_PREFERENCES,
    useAuthentication: true,
  })
);

export const putUserPreferences = (username, preferences) => (
  makeRequest({
    uri: `/api/userPreferences/${username}`,
    method: METHODS.PUT,
    body: preferences,
    mockResponse: USER_PREFERENCES,
    useAuthentication: true,
  })
);
