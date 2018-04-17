import { makeRequest, METHODS } from '@entando/apimanager';
import { CATEGORY_TREE, BODY_OK } from 'test/mocks/categories';

const getCategoryTreeMockResponse = (categoryCode) => {
  switch (categoryCode) {
    case 'home': { return CATEGORY_TREE.home; }
    case 'mycategory1': { return CATEGORY_TREE.mycategory1; }
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

export const postCategory = categoriesObject => (
  makeRequest({
    uri: '/api/categories',
    method: METHODS.POST,
    mockResponse: BODY_OK,
    body: categoriesObject,
    useAuthentication: true,
  })
);

export const putCategory = categoryObject => (
  makeRequest({
    uri: `/api/categories/${categoryObject.code}`,
    method: METHODS.PUT,
    mockResponse: BODY_OK,
    body: categoryObject,
    useAuthentication: true,
  })
);

export const deleteCategory = categoryCode => (
  makeRequest({
    uri: `/api/categories/${categoryCode}`,
    method: METHODS.DELETE,
    mockResponse: { code: categoryCode },
    useAuthentication: true,
  })
);
