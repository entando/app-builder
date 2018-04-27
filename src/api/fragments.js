import { makeRequest, METHODS } from '@entando/apimanager';
import {
  GET_FRAGMENT_OK,
  LIST_FRAGMENTS_OK,
  PLUGINS_OK,
  FRAGMENT_SETTING,
} from 'test/mocks/fragments';

import { throttle } from 'util';

export const getFragment = fragmentCode => (
  makeRequest({
    uri: `/api/fragments/${fragmentCode}`,
    method: METHODS.GET,
    mockResponse: GET_FRAGMENT_OK,
    useAuthentication: true,
  })
);


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

export const getPlugins = () => new Promise((resolve) => {
  throttle(resolve(PLUGINS_OK));
});

export const postFragment = fragment => (
  makeRequest({
    uri: '/api/fragments',
    method: METHODS.POST,
    body: { code: `${fragment.code}`, guiCode: `${fragment.guiCode}` },
    mockResponse: fragment,
    useAuthentication: true,
  })
);

export const putFragment = fragment => (
  makeRequest({
    uri: `/api/fragments/${fragment.code}`,
    method: METHODS.PUT,
    body: { code: `${fragment.code}`, guiCode: `${fragment.guiCode}` },
    mockResponse: fragment,
    useAuthentication: true,
  })
);


export const deleteFragment = fragmentCode => (
  makeRequest({
    uri: `/api/fragments/${fragmentCode}`,
    method: METHODS.DELETE,
    mockResponse: { code: fragmentCode },
    useAuthentication: true,
  })
);

export const getFragmentSettings = () => (
  makeRequest({
    uri: '/api/fragmentsSettings/',
    method: METHODS.GET,
    mockResponse: FRAGMENT_SETTING,
    useAuthentication: true,
  })
);
export const putFragmentSettings = setting => (
  makeRequest({
    uri: '/api/fragmentsSettings/',
    method: METHODS.PUT,
    body: setting,
    mockResponse: { ...setting },
    useAuthentication: true,
  })
);
