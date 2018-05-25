import reducer from 'state/activity-stream/reducer';
import { addNotifications, toggleNotificationDrawer, updateNotification } from 'state/activity-stream/actions';
import { NOTIFICATIONS, COMMENT, NEW_COMMENT } from 'test/mocks/activityStream';


describe('state/activity-stream/reducer', () => {
  it('should return an object', () => {
    const state = reducer();
    expect(typeof state).toBe('object');
  });

  it('should toggle hidden property', () => {
    const state = reducer({}, toggleNotificationDrawer());
    expect(state).toHaveProperty('hidden', false);
  });

  describe('after action ADD_NOTIFICATION', () => {
    it('should define state property', () => {
      const state = reducer({}, addNotifications(NOTIFICATIONS));
      expect(state).toHaveProperty('list', [1]);
      expect(state).toHaveProperty('map', {
        1: NOTIFICATIONS[0],
      });
    });
  });

  describe('after action UPDATE_NOTIFCATION for comments', () => {
    it('should define state property', () => {
      const state = reducer({}, addNotifications(NOTIFICATIONS));
      expect(state.map['1'].comments).toHaveLength(1);
      NOTIFICATIONS[0].comments.push(NEW_COMMENT);
      const newState = reducer(state, updateNotification(NOTIFICATIONS[0]));
      expect(newState.map['1'].comments).toHaveLength(2);
      expect(newState.map['1'].comments).toEqual(expect.arrayContaining([COMMENT, NEW_COMMENT]));
    });
  });
});
