import { NOTIFICATION } from 'test/mocks/notification';

const getApiNotifications = () => (
  new Promise((resolve) => {
    resolve(NOTIFICATION);
  })
);

export default getApiNotifications;
