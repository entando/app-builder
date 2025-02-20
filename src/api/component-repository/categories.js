import { LIST_ECR_CATEGORIES_OK } from 'test/mocks/component-repository/categories';
import { makeRequest, METHODS } from '@entando/apimanager';
import { composeApiDomain } from 'helpers/apiDomainComposer';
import { getCookie, ENTANDO_VIRTUAL_CONTEXTS } from 'helpers/cookies';

// eslint-disable-next-line import/prefer-default-export
export const getECRCategories = () => (
  makeRequest({
    uri: '/categories',
    domain: composeApiDomain('/digital-exchange', getCookie(ENTANDO_VIRTUAL_CONTEXTS)),
    method: METHODS.GET,
    mockResponse: LIST_ECR_CATEGORIES_OK,
    useAuthentication: true,
  })
);
