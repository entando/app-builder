import { DATA_TYPES_OK_PAGE_1, DATA_TYPES_OK_PAGE_2 } from 'test/mocks/dataTypes';

export const getDataTypes = (page, params) => new Promise((resolve) => {
  if (params) {
    console.info(`calling API /datatypes${params}`);
  }
  switch (page) {
    case 1:
      resolve(DATA_TYPES_OK_PAGE_1);
      break;
    case 2:
      resolve(DATA_TYPES_OK_PAGE_2);
      break;
    default:
      resolve(DATA_TYPES_OK_PAGE_1);
  }
});

export default getDataTypes;
