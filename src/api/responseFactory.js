import { isInteger } from 'util/numeric';

let payload = {};
let metaData = {};

const buildList = (mockResponse, page) => {
  const totalItems = mockResponse.length;
  const lastPage = page.pageSize === 0 ? 1 : Math.ceil(totalItems / page.pageSize);
  const computedPage = page.page <= lastPage ? page.page : lastPage;

  payload = page.pageSize === 0 ?
    mockResponse :
    mockResponse.splice((computedPage * page.pageSize) - page.pageSize, page.pageSize);

  metaData = {
    page: computedPage,
    pageSize: page.pageSize,
    totalItems,
    lastPage,
  };
};

const buildPayload = (mockResponse, page) => {
  if (Array.isArray(mockResponse)) {
    buildList(mockResponse, page);
  } else if (typeof mockResponse === 'object') {
    payload = mockResponse;
    metaData = {};
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
    errors: [],
    metaData,
  };
};

export const buildErrorResponse = (errors = []) => (
  {
    payload: {},
    metaData: {},
    errors: Array.isArray(errors) ? errors : [],
  }
);
