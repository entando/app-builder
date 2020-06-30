import { LIST_COMPONENT_REPOSITORIES_OK } from 'test/mocks/component-repository/componentRepositories';
import { makeRequest, METHODS } from '@entando/apimanager';

// eslint-disable-next-line import/prefer-default-export
export const getComponentRepositories = (page = { page: 1, pageSize: 10 }, params = '') => (
  makeRequest(
    {
      uri: `/exchanges${params}`,
      domain: '/digital-exchange',
      method: METHODS.GET,
      mockResponse: LIST_COMPONENT_REPOSITORIES_OK,
      useAuthentication: true,
    },
    page,
  )
);

export const getComponentRepository = id => (
  makeRequest({
    uri: `/exchanges/${id}`,
    domain: '/digital-exchange',
    method: METHODS.GET,
    mockResponse: {},
    useAuthentication: true,
  })
);

export const deleteComponentRepository = id => (
  makeRequest({
    uri: `/exchanges/${id}`,
    domain: '/digital-exchange',
    method: METHODS.DELETE,
    mockResponse: {},
    useAuthentication: true,
  })
);

export const postComponentRepository = marketplace => (
  makeRequest({
    uri: '/exchanges',
    domain: '/digital-exchange',
    method: METHODS.POST,
    mockResponse: {},
    useAuthentication: true,
    body: marketplace,
  })
);

export const putComponentRepository = marketplace => (
  makeRequest({
    uri: `/exchanges/${marketplace.id}`,
    domain: '/digital-exchange',
    method: METHODS.PUT,
    mockResponse: {},
    useAuthentication: true,
    body: marketplace,
  })
);
