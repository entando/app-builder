import 'whatwg-fetch';

import { useMocks } from 'state/api/selectors';

let store = null;

const isEmpty = string => !string || string.trim().length === 0;

const isValidMethod = method => ['GET', 'POST', 'PUT', 'DELETE'].indexOf(method) !== -1;

const validateRequest = (request) => {
  if (typeof request !== 'object' ||
    isEmpty(request.uri) ||
    isEmpty(request.method) ||
    !isValidMethod(request.method) ||
    typeof request.mockResponse !== 'object'
  ) {
    throw new Error('invalid request object');
  }
};

export const config = (reduxStore) => {
  store = reduxStore;
};

export const makeMockRequest = (request) => {
  validateRequest(request);
};

export const makeRealRequest = (request) => {
  validateRequest(request);
  fetch('google.com');
};

export const makeRequest = (request) => {
  if (useMocks(store.getState())) {
    makeMockRequest(request);
  } else {
    makeRealRequest(request);
  }
};
