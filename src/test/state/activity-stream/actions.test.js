
import { toggleNotificationDrawer } from 'state/activity-stream/actions';
import { TOGGLE_NOTIFICATION_DRAWER } from 'state/activity-stream/types';


it('test toggleNotificationDrawer action', () => {
  expect(toggleNotificationDrawer()).toEqual({ type: TOGGLE_NOTIFICATION_DRAWER });
});
