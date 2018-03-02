import reducer from 'state/activity-stream/reducer';
import { addNotifications, toggleNotificationDrawer } from 'state/activity-stream/actions';
import { NOTIFICATION } from 'test/mocks/notification';

const NOTIFICATION_PAYLOAD = NOTIFICATION.payload.notifications;
const NOTIFICATION_LIST_VISIBLE = {
  hidden: false,
  notifications: [],
};

describe('state/activity-stream/reducer', () => {
  it('should return an object', () => {
    const state = reducer();
    expect(typeof state).toBe('object');
  });

  it('should toggle hidden property', () => {
    const state = reducer({}, toggleNotificationDrawer());
    expect(state.hidden).toEqual(NOTIFICATION_LIST_VISIBLE.hidden);
  });

  describe('after action ADD_NOTIFICATION', () => {
    let state;
    beforeEach(() => {
      state = reducer({}, addNotifications(NOTIFICATION_PAYLOAD));
    });
    it('should define notifications array', () => {
      expect(state.notifications[0]).toEqual(NOTIFICATION_PAYLOAD[0]);
    });
  });
});
