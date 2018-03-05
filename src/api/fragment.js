import { GET_FRAGMENT_OK, LIST_FRAGMENTS_OK, BODY_ERROR } from 'test/mocks/fragment';

export const getFragment = fragmentCode => new Promise((resolve, reject) => {
  if (fragmentCode) {
    resolve(GET_FRAGMENT_OK);
  } else {
    reject(BODY_ERROR);
  }
});

export const getFragments = () => new Promise((resolve) => {
  resolve(LIST_FRAGMENTS_OK);
});
