import { LIST_DE_CATEGORIES_OK } from 'test/mocks/digital-exchange/categories';
import { makeRequest, METHODS } from '@entando/apimanager';

// eslint-disable-next-line import/prefer-default-export
export const getDECategories = () => (
  makeRequest({
    uri: '/categories',
    path: '/digital-exchange',
    method: METHODS.GET,
    mockResponse: LIST_DE_CATEGORIES_OK,
    useAuthentication: true,
  })
);
