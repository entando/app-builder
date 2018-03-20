import { makeRequest, METHODS } from 'api/apiManager';
import { LIST_GROUPS_OK } from 'test/mocks/groups';

import throttle from 'util/throttle';

export const getGroups = (page = { page: 1, pageSize: 10 }, params = '') => (
  makeRequest(
    {
      uri: `/api/groups${params}`,
      method: METHODS.GET,
      mockResponse: LIST_GROUPS_OK,
      useAuthentication: true,
    },
    page,
  )
);

export const postGroup = groupObject => new Promise((resolve) => {
  // eslint-disable-next-line no-console
  console.info(`calling POST /groups\n\t${JSON.stringify(groupObject, 2)}`);
  if (groupObject.code !== 'error') {
    throttle(() => resolve({ payload: groupObject }));
  } else {
    resolve({
      errors: [
        { code: 1, message: 'Group code cannot be error!' },
        { code: 2, message: 'This is a mock error!' },
      ],
    });
  }
});

export default getGroups;
