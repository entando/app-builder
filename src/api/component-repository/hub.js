import {
  LIST_BUNDLES_FROM_REGISTRY_OK, LIST_REGISTRIES_OK,
  LIST_BUNDLE_GROUPS_OK, LIST_BUNDLE_STATUSES_OK,
  DELETE_REGISTRY_OK, ADD_REGISTRY_OK, DEPLOY_BUNDLE_OK,
  UNDEPLOY_BUNDLE_OK,
} from 'test/mocks/component-repository/hub';
import { makeRequest, METHODS } from '@entando/apimanager';
import { composeCMApiDomain } from 'helpers/apiDomainComposer';
// import { getEntandoVirtualContextFromCookies } from 'helpers/cookies';
import { getContextFromURL } from 'app-init/contextProvider';

export const NO_PAGE = { page: 1, pageSize: 0 };

export const getBundlesFromRegistry = (registryId, page = { page: 1, pageSize: 10 }, params = '') => (
  makeRequest(
    {
      uri: `/hub/bundles/${registryId}/${params}`,
      domain: composeCMApiDomain(getContextFromURL(window.location.pathname)),
      method: METHODS.GET,
      mockResponse: LIST_BUNDLES_FROM_REGISTRY_OK,
      useAuthentication: true,
    },
    page,
  )
);

export const getRegistries = (params = '') => (
  makeRequest(
    {
      uri: `/registries/${params}`,
      domain: composeCMApiDomain(getContextFromURL(window.location.pathname)),
      method: METHODS.GET,
      mockResponse: LIST_REGISTRIES_OK,
      useAuthentication: true,
    },
    NO_PAGE,
  )
);

export const getBundleGroups = (registryId, page = { page: 1, pageSize: 10 }, params = '') => (
  makeRequest(
    {
      uri: `/hub/bundlegroups/${registryId}/?statuses=PUBLISHED&${params}`,
      domain: composeCMApiDomain(getContextFromURL(window.location.pathname)),
      method: METHODS.GET,
      mockResponse: LIST_BUNDLE_GROUPS_OK,
      useAuthentication: true,
    },
    page,
  )
);

export const deleteRegistry = registryId => (
  makeRequest({
    uri: `/registries/${registryId}`,
    domain: composeCMApiDomain(getContextFromURL(window.location.pathname)),
    method: METHODS.DELETE,
    mockResponse: DELETE_REGISTRY_OK,
    useAuthentication: true,
  })
);

export const addRegistry = registryObject => (
  makeRequest({
    uri: '/registries',
    domain: composeCMApiDomain(getContextFromURL(window.location.pathname)),
    method: METHODS.POST,
    mockResponse: ADD_REGISTRY_OK,
    useAuthentication: true,
    body: registryObject,
  })
);

export const updateRegistry = registryObject => (
  makeRequest({
    uri: '/registries',
    domain: composeCMApiDomain(getContextFromURL(window.location.pathname)),
    method: METHODS.PUT,
    mockResponse: ADD_REGISTRY_OK,
    useAuthentication: true,
    body: registryObject,
  })
);

export const deployBundle = bundle => (
  makeRequest({
    uri: '/components',
    domain: composeCMApiDomain(getContextFromURL(window.location.pathname)),
    method: METHODS.POST,
    mockResponse: DEPLOY_BUNDLE_OK,
    useAuthentication: true,
    body: bundle,
  })
);

export const undeployBundle = componentCode => (
  makeRequest({
    uri: `/components/${componentCode}`,
    domain: composeCMApiDomain(getContextFromURL(window.location.pathname)),
    method: METHODS.DELETE,
    mockResponse: UNDEPLOY_BUNDLE_OK,
    useAuthentication: true,
  })
);

export const getBundleStatuses = bundleIds => (
  makeRequest(
    {
      uri: '/components/status/query',
      domain: composeCMApiDomain(getContextFromURL(window.location.pathname)),
      method: METHODS.POST,
      mockResponse: LIST_BUNDLE_STATUSES_OK,
      useAuthentication: true,
      body: {
        ids: bundleIds,
      },
    },
    NO_PAGE,
  )
);

export const getBundleStatusWithCode = componentCode => (
  makeRequest(
    {
      uri: `/components/status/${componentCode}`,
      domain: composeCMApiDomain(getContextFromURL(window.location.pathname)),
      method: METHODS.GET,
      mockResponse: LIST_BUNDLE_STATUSES_OK.bundlesStatuses[0],
      useAuthentication: true,
    },
    NO_PAGE,
  )
);
