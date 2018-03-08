import { GET_LIST_RESPONSE, PAGE_MODEL } from 'test/mocks/pageModels';

export const getPageModels = () => (
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(GET_LIST_RESPONSE.payload);
    }, 500);
  })
);

export const getPageModel = code => (
  // call GET /pagemodels/<code>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(PAGE_MODEL, code);
    }, 500);
  })
);
