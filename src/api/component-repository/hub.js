import { LIST_BUNDLES_FROM_REGISTRY_OK, LIST_REGISTRIES_OK } from 'test/mocks/component-repository/hub';
import { makeRequest, METHODS } from '@entando/apimanager';

export const NO_PAGE = { page: 1, pageSize: 0 };

export const getBundlesFromRegistry = (page = { page: 1, pageSize: 10 }, params = '') => (
  makeRequest(
    {
      uri: params, // @TODO-hub check if correct after having real API
      domain: '/digital-exchange', // @TODO-hub check if correct after having real API
      method: METHODS.GET,
      mockResponse: LIST_BUNDLES_FROM_REGISTRY_OK,
      useAuthentication: false,
    },
    page, // @TODO-hub check page for 3rd party urls(how to generalize paging logic???)
  )
);

export const getRegistries = (params = '') => (
  makeRequest(
    {
      uri: `/registries/${params}`, // @TODO-hub set it correctly after having real API
      domain: '/digital-exchange', // @TODO-hub set it correctly after having real API
      method: METHODS.GET,
      mockResponse: LIST_REGISTRIES_OK,
      useAuthentication: true,
    },
    NO_PAGE,
  )
);

export const deleteRegistry = registryName => (
  makeRequest({
    uri: `/registry/${registryName}`, // @TODO-hub set it correctly after having real API
    domain: '/digital-exchange', // @TODO-hub set it correctly after having real API
    method: METHODS.DELETE,
    mockResponse: LIST_REGISTRIES_OK,
    useAuthentication: true,
  })
);

export const addRegistry = registryObject => (
  makeRequest({
    uri: '/registry', // @TODO-hub set it correctly after having real API
    domain: '/digital-exchange', // @TODO-hub set it correctly after having real API
    method: METHODS.POST,
    mockResponse: LIST_REGISTRIES_OK,
    useAuthentication: true,
    body: registryObject,
  })
);
