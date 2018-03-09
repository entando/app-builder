import 'whatwg-fetch';

import throttle from 'util/throttle';
import { isEmpty } from 'util/string';
import { buildResponse } from 'api/responseFactory';
import { useMocks, getDomain } from 'state/api/selectors';

export const METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
};

let store = null;

const defaultPage = { page: 1, pageSize: 10 };

const isValidMethod = method => method in METHODS;

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

export const makeMockRequest = (request, page = defaultPage) => {
  validateRequest(request);
  return new Promise(resolve => throttle(() => resolve(buildResponse(request.mockResponse, page))));
};

export const makeRealRequest = (request) => {
  validateRequest(request);
  return fetch(`${getDomain(store.getState())}${request.uri}`, {
    method: request.method,
  });
};

export const makeRequest = (request, page = defaultPage) => {
  if (useMocks(store.getState())) {
    return makeMockRequest(request, page);
  }
  return makeRealRequest(request, page);
};
