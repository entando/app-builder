import { isInteger } from 'util/Numeric';

let payload = {};
let metaData = {};

const buildList = (mockResponse, page) => {
  const totalItems = mockResponse.length;
  const lastPage = Math.ceil(totalItems / page.pageSize);
  const computedPage = page.page <= lastPage ? page.page : lastPage;
  const firstElement = (computedPage * page.pageSize) - page.pageSize;
  payload = mockResponse.splice(firstElement, page.pageSize);
  metaData = {
    page: computedPage,
    pageSize: page.pageSize,
    totalItems,
    lastPage,
  };
};

const buildPayload = (mockResponse, page) => {
  if (mockResponse instanceof Array) {
    buildList(mockResponse, page);
  } else if (typeof mockResponse === 'object') {
    payload = mockResponse;
  }
};

const validatePage = (page) => {
  if (typeof page !== 'object' ||
    !isInteger(page.page) ||
    page.page < 1 ||
    !isInteger(page.pageSize) ||
    page.pageSize < 0
  ) {
    throw new Error('invalid page object');
  }
};

// eslint-disable-next-line import/prefer-default-export
export const buildResponse = (mockResponse, page = { page: 1, pageSize: 10 }) => {
  validatePage(page);
  buildPayload(mockResponse, page);
  return {
    payload,
    metaData,
  };
};
