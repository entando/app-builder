import { GET_FRAGMENT_OK, LIST_FRAGMENTS_OK, BODY_ERROR } from 'test/mocks/fragments';

export const getFragment = fragmentCode => new Promise((resolve, reject) => {
  if (fragmentCode === GET_FRAGMENT_OK.payload.code) {
    resolve(GET_FRAGMENT_OK);
  } else {
    reject(BODY_ERROR);
  }
});

export const getFragments = () => new Promise((resolve) => {
  resolve(LIST_FRAGMENTS_OK);
});
