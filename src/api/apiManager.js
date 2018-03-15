import 'whatwg-fetch';

import throttle from 'util/throttle';
import { isEmpty } from 'util/string';
import { buildResponse, buildErrorResponse } from 'api/responseFactory';
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

const isValidBody = (method, body) => (
  method === METHODS.GET ||
  method === METHODS.DELETE ||
  typeof body === 'object'
);

const validateRequest = (request) => {
  if (typeof request !== 'object' ||
    isEmpty(request.uri) ||
    isEmpty(request.method) ||
    !isValidMethod(request.method) ||
    typeof request.mockResponse !== 'object' ||
    !isValidBody(request.method, request.body)
  ) {
    throw new Error('invalid request object');
  }
};

const getErrors = (errorsCallback) => {
  let errors = [];
  if (typeof errorsCallback === 'function') {
    errors = errorsCallback();
  }

  return Array.isArray(errors) ? errors : [];
};

export const config = (reduxStore) => {
  store = reduxStore;
};

export const makeMockRequest = (request, page = defaultPage) => {
  validateRequest(request);
  const errors = getErrors(request.errors);
  return new Promise(resolve => throttle(() => (
    resolve(new Response(
      new Blob(
        [
          JSON.stringify(
            errors.length ? buildErrorResponse(errors) : buildResponse(request.mockResponse, page),
            null,
            2,
          ),
        ],
        { type: 'application/json' },
      ),
      { status: errors.length ? 400 : 200 },
    ))
  )));
};

const getParsedBody = (contentType, body) => {
  if (contentType === 'application/x-www-form-urlencoded') {
    return Object.keys(body).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(body[key])}`).join('&');
  }
  return body;
};

const getRequestParams = (request) => {
  const requestParams = {
    method: request.method,
    headers: {
      'Content-Type': request.contentType || 'application/json',
    },
  };
  if (request.method === METHODS.POST) {
    requestParams.body = getParsedBody(request.contentType, request.body);
  }

  return requestParams;
};

export const makeRealRequest = (request) => {
  validateRequest(request);
  return fetch(`${getDomain(store.getState())}${request.uri}`, getRequestParams(request));
};

export const makeRequest = (request, page = defaultPage) => {
  if (useMocks(store.getState())) {
    return makeMockRequest(request, page);
  }
  return makeRealRequest(request, page);
};
