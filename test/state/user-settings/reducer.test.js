import reducer from 'state/user-settings/reducer';
import { setUserSettings } from 'state/user-settings/actions';


describe('state/user-settings/reducer', () => {
  const INITIAL_STATE = reducer();

  it('should return an object', () => {
    expect(INITIAL_STATE).toBeInstanceOf(Object);
    expect(INITIAL_STATE).toHaveProperty('restrictionsActive', null);
    expect(INITIAL_STATE).toHaveProperty('enableGravatarIntegration', null);
    expect(INITIAL_STATE).toHaveProperty('lastAccessPasswordExpirationMonths', null);
    expect(INITIAL_STATE).toHaveProperty('maxMonthsPasswordValid', null);
    expect(INITIAL_STATE).toHaveProperty('passwordAlwaysActive', null);
  });

  describe('after SET_USER_SETTINGS', () => {
    it('new pageStatus value is returned ', () => {
      const newState = reducer(INITIAL_STATE, setUserSettings({
        restrictionsActive: false,
        enableGravatarIntegration: true,
        lastAccessPasswordExpirationMonths: 2,
        maxMonthsPasswordValid: 4,
        passwordAlwaysActive: true,
      }));
      expect(newState).toHaveProperty('restrictionsActive', false);
      expect(newState).toHaveProperty('enableGravatarIntegration', true);
      expect(newState).toHaveProperty('lastAccessPasswordExpirationMonths', 2);
      expect(newState).toHaveProperty('maxMonthsPasswordValid', 4);
      expect(newState).toHaveProperty('passwordAlwaysActive', true);
    });
  });
});
