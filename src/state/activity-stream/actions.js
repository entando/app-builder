import getApiNotifications from 'api/notification';
import { TOGGLE_NOTIFICATION_DRAWER } from './types';
// declare action for close notification drawer
// eslint-disable-next-line
export const toggleNotificationDrawer = () => ({
  type: TOGGLE_NOTIFICATION_DRAWER,
});

export const getNotifications = () => {
  getApiNotifications().then((result) => {
    console.log(result);
  });
};
