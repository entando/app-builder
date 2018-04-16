import { makeRequest, METHODS } from '@entando/apimanager';
import { CATEGORY_TREE } from 'test/mocks/categories';

const getCategoryTreeMockResponse = (queryString) => {
  switch (queryString) {
    case '?parentNode=home': { return CATEGORY_TREE.home; }
    case '?parentNode=mycategory1': { return CATEGORY_TREE.mycategory1; }
    default: { return CATEGORY_TREE.home; }
  }
};

export const getCategoryTree = (params = '') => (
  makeRequest({
    uri: `/api/categories${params}`,
    method: METHODS.GET,
    mockResponse: getCategoryTreeMockResponse(params),
    useAuthentication: true,
  })
);

export const getCategory = categoryCode => (
  makeRequest({
    uri: `/api/categories/${categoryCode}`,
    method: METHODS.GET,
    mockResponse: CATEGORY_TREE[0],
    useAuthentication: true,
  })
);

export default getCategoryTree;
