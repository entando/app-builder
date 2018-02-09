import { BODY_OK, BODY_ERROR } from 'test/mocks/login';

const login = (username, password) => new Promise((resolve, reject) => {
  if (username && password) {
    resolve(BODY_OK);
  } else {
    reject(BODY_ERROR);
  }
});

export default login;
