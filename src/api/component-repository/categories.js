import { LIST_ECR_CATEGORIES_OK } from 'test/mocks/component-repository/categories';
import { makeRequest, METHODS } from '@entando/apimanager';
import { composeCMApiDomain } from 'helpers/apiDomainComposer';
// import { getEntandoVirtualContextFromCookies } from 'helpers/cookies';
import { getContextFromURL } from 'app-init/contextProvider';

// eslint-disable-next-line import/prefer-default-export
export const getECRCategories = () => (
  makeRequest({
    uri: '/categories',
    domain: composeCMApiDomain(getContextFromURL(window.location.pathname)),
    method: METHODS.GET,
    mockResponse: LIST_ECR_CATEGORIES_OK,
    useAuthentication: true,
  })
);
