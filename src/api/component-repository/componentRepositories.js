import { LIST_COMPONENT_REPOSITORIES_OK } from 'test/mocks/component-repository/componentRepositories';
import { makeRequest, METHODS } from '@entando/apimanager';
import { composeCMApiDomain } from 'helpers/apiDomainComposer';
// import { getEntandoVirtualContextFromCookies } from 'helpers/cookies';
import { getContextFromURL } from 'app-init/contextProvider';

// eslint-disable-next-line import/prefer-default-export
export const getComponentRepositories = (page = { page: 1, pageSize: 10 }, params = '') => (
  makeRequest(
    {
      uri: `/exchanges${params}`,
      domain: composeCMApiDomain(getContextFromURL(window.location.pathname)),
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
    domain: composeCMApiDomain(getContextFromURL(window.location.pathname)),
    method: METHODS.GET,
    mockResponse: {},
    useAuthentication: true,
  })
);

export const deleteComponentRepository = id => (
  makeRequest({
    uri: `/exchanges/${id}`,
    domain: composeCMApiDomain(getContextFromURL(window.location.pathname)),
    method: METHODS.DELETE,
    mockResponse: {},
    useAuthentication: true,
  })
);

export const postComponentRepository = marketplace => (
  makeRequest({
    uri: '/exchanges',
    domain: composeCMApiDomain(getContextFromURL(window.location.pathname)),
    method: METHODS.POST,
    mockResponse: {},
    useAuthentication: true,
    body: marketplace,
  })
);

export const putComponentRepository = marketplace => (
  makeRequest({
    uri: `/exchanges/${marketplace.id}`,
    domain: composeCMApiDomain(getContextFromURL(window.location.pathname)),
    method: METHODS.PUT,
    mockResponse: {},
    useAuthentication: true,
    body: marketplace,
  })
);
