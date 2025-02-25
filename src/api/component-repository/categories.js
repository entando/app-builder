import { LIST_ECR_CATEGORIES_OK } from 'test/mocks/component-repository/categories';
import { makeRequest, METHODS } from '@entando/apimanager';
import { composeCMApiDomain } from 'helpers/apiDomainComposer';
import { getCookie, ENTANDO_VIRTUAL_CONTEXT_KEY } from 'helpers/cookies';

// eslint-disable-next-line import/prefer-default-export
export const getECRCategories = () => (
  makeRequest({
    uri: '/categories',
    domain: composeCMApiDomain(getCookie(ENTANDO_VIRTUAL_CONTEXT_KEY)),
    method: METHODS.GET,
    mockResponse: LIST_ECR_CATEGORIES_OK,
    useAuthentication: true,
  })
);
