import { isFSA } from 'flux-standard-action';
import { addAlert, clearAlert } from 'state/alerts/actions';
import { ADD_ALERT, CLEAR_ALERT } from 'state/alerts/types';

describe('state/alerts/actions', () => {
  let action;
  describe('addAlert', () => {
    beforeEach(() => {
      action = addAlert('a', 'test');
    });

    it('is FSA compliant', () => {
      expect(isFSA(action)).toBe(true);
    });

    it('is of type ADD_ALERT', () => {
      expect(action).toHaveProperty('type', ADD_ALERT);
    });

    it('defines payload property', () => {
      expect(action).toHaveProperty('payload');
      expect(action).toHaveProperty('payload.id');
      expect(action).toHaveProperty('payload.type');
      expect(action.payload).toMatchObject({ id: 'a', type: 'test' });
    });
  });

  describe('clearAlert', () => {
    beforeEach(() => {
      action = clearAlert('a');
    });
    it('is FSA compliant', () => {
      expect(isFSA(action)).toBe(true);
    });

    it('is of type CLEAR_ALERT', () => {
      expect(action).toHaveProperty('type', CLEAR_ALERT);
    });

    it('defines payload property', () => {
      expect(action).toHaveProperty('payload');
      expect(action).toHaveProperty('payload.id');
      expect(action.payload).toMatchObject({ id: 'a' });
    });
  });
});
