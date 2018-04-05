import { makeMockRequest, makeRequest, METHODS } from 'api/apiManager';
import {
  GET_FRAGMENT_OK,
  LIST_FRAGMENTS_OK,
  BODY_ERROR, WIDGET_TYPES_OK,
  PLUGINS_OK,
} from 'test/mocks/fragments';

import { throttle } from 'util';

export const getFragment = fragmentCode => new Promise((resolve, reject) => {
  if (fragmentCode === GET_FRAGMENT_OK.payload.code) {
    resolve(GET_FRAGMENT_OK);
  } else {
    reject(BODY_ERROR);
  }
});

export const getFragments = (page = { page: 1, pageSize: 10 }, params = '') => (
  makeRequest(
    {
      uri: `/api/fragments${params}`,
      method: METHODS.GET,
      mockResponse: LIST_FRAGMENTS_OK,
      useAuthentication: true,
    },
    page,
  )
);

export const getWidgetTypes = () => new Promise((resolve) => {
  throttle(resolve(WIDGET_TYPES_OK));
});

export const getPlugins = () => new Promise((resolve) => {
  throttle(resolve(PLUGINS_OK));
});

export const putFragmentSettings = setting => (
  makeMockRequest({
    uri: '/api/fragmentsSettings/',
    method: METHODS.PUT,
    body: setting,
    mockResponse: { ...setting },
    useAuthentication: true,
  })
);
