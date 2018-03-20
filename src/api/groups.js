import { GROUPS_OK_PAGE_1, GROUPS_OK_PAGE_2 } from 'test/mocks/groups';
import throttle from 'util/throttle';

export const getGroups = (page, params) => new Promise((resolve) => {
  if (params) {
    // eslint-disable-next-line no-console
    console.info(`calling API /groups${params}`);
  }
  switch (page) {
    case 1:
      throttle(() => resolve(GROUPS_OK_PAGE_1));
      break;
    case 2:
      throttle(() => resolve(GROUPS_OK_PAGE_2));
      break;
    default:
      throttle(() => resolve(GROUPS_OK_PAGE_1));
  }
});

export default getGroups;
