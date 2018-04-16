import { makeRequest, METHODS } from 'api/apiManager';
import { CATEGORY_TREE } from 'test/mocks/categories';

const getCategoryTreeMockResponse = (categoryCode) => {
  switch (categoryCode) {
    case 'home': { return CATEGORY_TREE.home; }
    case 'mycategory1': { return CATEGORY_TREE.mycategory1; }
    default: { return CATEGORY_TREE.home; }
  }
};

export const getCategoryTree = categoryCode => (
  makeRequest({
    uri: `/api/categories?parentNode=${categoryCode}`,
    method: METHODS.GET,
    mockResponse: getCategoryTreeMockResponse(categoryCode),
    useAuthentication: true,
  })
);

export const getCategory = categoryCode => (
  makeRequest({
    uri: `/api/categories/${categoryCode}`,
    method: METHODS.GET,
    mockResponse: CATEGORY_TREE.home,
    useAuthentication: true,
  })
);
