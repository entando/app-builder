import { USERS_OK, USER_PROFILE_MOCK } from 'test/mocks/users';
import { makeRequest, makeMockRequest, METHODS } from 'api/apiManager';

const getGenericError = obj => (
  obj || obj === '' ? [] : [{ code: 1, message: 'object is invalid' }]
);

export const getUsers = (page = { page: 1, pageSize: 10 }, params = '') => (
  makeRequest(
    {
      uri: `/api/users${params}`,
      method: METHODS.GET,
      mockResponse: USERS_OK.payload,
      useAuthentication: true,
      errors: () => getGenericError(params),
    },
    page,
  )
);

const getErrors = username => (
  USER_PROFILE_MOCK[username] ? [] : [
    { code: 1, message: 'user not found' },
  ]
);

export const getUserDetail = username => makeMockRequest({
  uri: `/users/detail/${username}`,
  method: METHODS.GET,
  mockResponse: USER_PROFILE_MOCK[username],
  errors: () => getErrors(username),
});

export default getUsers;
