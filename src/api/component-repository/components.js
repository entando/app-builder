import {
  GET_ECR_COMPONENT_OK,
  LIST_ECR_COMPONENTS_OK,
  COMPONENT_INSTALLATION_CREATED,
  COMPONENT_INSTALLATION_COMPLETED,
  COMPONENT_UNINSTALLATION_CREATED,
  COMPONENT_UNINSTALLATION_COMPLETED,
  COMPONENT_USAGE_LIST,
  COMPONENT_INSTALL_PLAN,
} from 'test/mocks/component-repository/components';
import { makeRequest, METHODS } from '@entando/apimanager';

export const getECRComponent = code => (
  makeRequest({
    uri: `/components/${code}`,
    domain: '/digital-exchange',
    method: METHODS.GET,
    mockResponse: GET_ECR_COMPONENT_OK,
    useAuthentication: true,
  })
);

export const getECRComponents = (page = { page: 1, pageSize: 10 }, params = '') => (
  makeRequest(
    {
      uri: `/components${params}`,
      domain: '/digital-exchange',
      method: METHODS.GET,
      mockResponse: LIST_ECR_COMPONENTS_OK,
      useAuthentication: true,
    },
    page,
  )
);

// should you need to test (un)installation in-progress using mock mode,
// you can set the mockResponse to `COMPONENT_INSTALLATION_IN_PROGRESS` to fully test the process.
// do this the same for `getECRComponentUninstall` API
export const getECRComponentInstall = code => (
  makeRequest({
    uri: `/components/${code}/install`,
    domain: '/digital-exchange',
    method: METHODS.GET,
    mockResponse: COMPONENT_INSTALLATION_COMPLETED,
    useAuthentication: true,
  })
);

export const postECRComponentUninstall = code => (
  makeRequest({
    uri: `/components/${code}/uninstall`,
    domain: '/digital-exchange',
    body: {},
    method: METHODS.POST,
    mockResponse: COMPONENT_UNINSTALLATION_CREATED,
    useAuthentication: true,
  })
);

export const getECRComponentUninstall = code => (
  makeRequest({
    uri: `/components/${code}/uninstall`,
    domain: '/digital-exchange',
    method: METHODS.GET,
    mockResponse: COMPONENT_UNINSTALLATION_COMPLETED,
    useAuthentication: true,
  })
);

export const getComponentUsage = code => (
  makeRequest({
    uri: `/components/${code}/usage`,
    domain: '/digital-exchange',
    method: METHODS.GET,
    mockResponse: COMPONENT_USAGE_LIST,
    useAuthentication: true,
  })
);

// INSTALL PLAN API
// new install endpoint
export const putECRComponentInstallPlan = (component, body) => (
  makeRequest({
    uri: `/components/${component.code}/installplans`,
    domain: '/digital-exchange',
    body,
    method: METHODS.PUT,
    mockResponse: COMPONENT_INSTALLATION_CREATED,
    useAuthentication: true,
  })
);

// request the install plan for a component
export const postECRComponentInstallPlan = (component, version = 'latest') => (
  makeRequest({
    uri: `/components/${component.code}/installplans`,
    domain: '/digital-exchange',
    body: { version },
    method: METHODS.POST,
    mockResponse: COMPONENT_INSTALL_PLAN,
    useAuthentication: true,
  })
);

export const getECRComponentInstallPlan = code => (
  makeRequest({
    uri: `/components/${code}/installplans`,
    domain: '/digital-exchange',
    method: METHODS.GET,
    mockResponse: COMPONENT_INSTALL_PLAN,
    useAuthentication: true,
  })
);
