
import { BODY_OK, BODY_ERROR } from 'test/mocks/login';

// eslint-disable-next-line
export const login = (username, password) => {
  return new Promise((resolve, reject) => {
    if (username && password) {
      resolve(BODY_OK);
    } else {
      reject(BODY_ERROR);
    }
  });
};
