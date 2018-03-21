import { USERS_OK_PAGE_1, USERS_OK_PAGE_2, USER_PROFILE_MOCK } from 'test/mocks/users';
import throttle from 'util/throttle';
import { makeMockRequest, METHODS } from 'api/apiManager';

export const getUsers = (page, params) => new Promise((resolve) => {
  if (params) {
    console.info(`calling API /users${params}`);
  }
  switch (page) {
    case 1:
      throttle(() => resolve(USERS_OK_PAGE_1));
      break;
    case 2:
      throttle(resolve(USERS_OK_PAGE_2));
      break;
    default:
      throttle(resolve(USERS_OK_PAGE_1));
  }
});

export const getUserDetail = username => makeMockRequest({
  uri: `/users/detail/${username}`,
  method: METHODS.GET,
  mockResponse: USER_PROFILE_MOCK[username],
});

export default getUsers;
