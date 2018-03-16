import { USER_OK } from 'test/mocks/user';
import throttle from 'util/throttle';

export const getUser = params => new Promise((resolve) => {
  if (params) {
    console.info(`calling API /user/${params}`);
  }
  throttle(resolve(USER_OK));
});

export default getUser;
