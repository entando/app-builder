import { makeRequest, METHODS } from '@entando/apimanager';
import { CATEGORY_TREE, MOCK_REFERENCES } from 'test/mocks/categories';

const HOME_CODE = 'home';
const MYCATEGORY1_CODE = 'mycategory1';

const getCategoryTreeMockResponse = (categoryCode) => {
  switch (categoryCode) {
    case HOME_CODE: { return CATEGORY_TREE.home; }
    case MYCATEGORY1_CODE: { return CATEGORY_TREE.mycategory1; }
    default: { return CATEGORY_TREE.home; }
  }
};

export const getCategoryTree = categoryCode => (
  makeRequest({
    uri: `/api/categories${categoryCode ? `?parentCode=${categoryCode}` : ''}`,
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

export const getReferences = (categoryCode, referenceKey, page = { page: 1, pageSize: 10 }) =>
  makeRequest({
    uri: `/api/categories/${categoryCode}/references/${referenceKey}`,
    method: METHODS.GET,
    mockResponse: MOCK_REFERENCES[referenceKey] || [],
    useAuthentication: true,
  }, page);
