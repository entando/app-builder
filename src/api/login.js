
import { BODY_OK } from 'test/mocks/login';

// eslint-disable-next-line
export const login = (username, password) => {
  return new Promise((resolve) => {
    resolve(BODY_OK);
  });
};
