import { DATA_TYPES_OK_PAGE_1, DATA_TYPES_OK_PAGE_2 } from 'test/mocks/dataTypes';
import throttle from 'util/throttle';

export const getDataTypes = (page, params) => new Promise((resolve) => {
  if (params) {
    // eslint-disable-next-line no-console
    console.info(`calling API /datatypes${params}`);
  }
  switch (page) {
    case 1:
      throttle(() => resolve(DATA_TYPES_OK_PAGE_1));
      break;
    case 2:
      throttle(resolve(DATA_TYPES_OK_PAGE_2));
      break;
    default:
      throttle(resolve(DATA_TYPES_OK_PAGE_1));
  }
});

export default getDataTypes;
