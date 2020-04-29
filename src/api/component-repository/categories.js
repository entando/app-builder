import { LIST_ECR_CATEGORIES_OK } from 'test/mocks/component-repository/categories';
import { makeRequest, METHODS } from '@entando/apimanager';

// eslint-disable-next-line import/prefer-default-export
export const getECRCategories = () => (
  makeRequest({
    uri: '/categories',
    domain: '/digital-exchange',
    method: METHODS.GET,
    mockResponse: LIST_ECR_CATEGORIES_OK,
    useAuthentication: true,
  })
);
