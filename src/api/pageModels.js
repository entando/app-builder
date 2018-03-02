import { GET_LIST_RESPONSE } from 'test/mocks/pageModels';

// eslint-disable-next-line import/prefer-default-export
export const getPageModels = () => (
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(GET_LIST_RESPONSE.payload);
    }, 500);
  })
);
