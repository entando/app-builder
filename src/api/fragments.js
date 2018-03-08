import {
  GET_FRAGMENT_OK,
  LIST_FRAGMENTS_OK_PAGE_1,
  LIST_FRAGMENTS_OK_PAGE_2,
  LIST_FRAGMENTS_OK_PAGE_3,
  BODY_ERROR,
} from 'test/mocks/fragments';

export const getFragment = fragmentCode => new Promise((resolve, reject) => {
  if (fragmentCode === GET_FRAGMENT_OK.payload.code) {
    resolve(GET_FRAGMENT_OK);
  } else {
    reject(BODY_ERROR);
  }
});

export const getFragments = (page = 1) => new Promise((resolve) => {
  switch (page) {
    case 1:
      resolve(LIST_FRAGMENTS_OK_PAGE_1);
      break;
    case 2:
      resolve(LIST_FRAGMENTS_OK_PAGE_2);
      break;
    case 3:
      resolve(LIST_FRAGMENTS_OK_PAGE_3);
      break;
    default:
      resolve(LIST_FRAGMENTS_OK_PAGE_1);
  }
});
