import { NOTIFICATIONS } from 'test/mocks/notification';

// eslint-disable-next-line
export const getApiNotifications = () => (
  new Promise((resolve) => {
    resolve(NOTIFICATIONS);
  })
);
