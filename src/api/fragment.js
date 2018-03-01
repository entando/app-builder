import { BODY_OK, BODY_ERROR } from 'test/mocks/fragment';

const getFragment = fragmentCode => new Promise((resolve, reject) => {
  if (fragmentCode) {
    resolve(BODY_OK);
  } else {
    reject(BODY_ERROR);
  }
});

export default getFragment;
