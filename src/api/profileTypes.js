import { PROFILE_TYPES_OK_PAGE_1, PROFILE_TYPES_OK_PAGE_2 } from 'test/mocks/profileTypes';
import throttle from 'util/throttle';

export const getProfileTypes = (page, params) => new Promise((resolve) => {
  if (params) {
    console.info(`calling API /profileTypes${params}`);
  }
  switch (page) {
    case 1:
      throttle(() => resolve(PROFILE_TYPES_OK_PAGE_1));
      break;
    case 2:
      throttle(() => resolve(PROFILE_TYPES_OK_PAGE_2));
      break;
    default:
      throttle(() => resolve(PROFILE_TYPES_OK_PAGE_1));
  }
});

export default getProfileTypes;
