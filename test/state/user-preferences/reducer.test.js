import reducer from 'state/user-preferences/reducer';
import { setUserPreferences } from 'state/user-preferences/actions';
import { USER_PREFERENCES } from 'test/mocks/userPreferences';

describe('state/user-preferences/reducer', () => {
  const INITIAL_STATE = reducer();

  it('should return an object', () => {
    expect(INITIAL_STATE).toBeInstanceOf(Object);
    expect(INITIAL_STATE).toHaveProperty('wizard', true);
    expect(INITIAL_STATE).toHaveProperty('translationWarning', true);
    expect(INITIAL_STATE).toHaveProperty('loadOnPageSelect', true);
  });

  describe('after action SET_USER_PREFERENCES', () => {
    it('new user preferences is returned ', () => {
      const PREFERENCES = {
        ...USER_PREFERENCES,
        wizard: false,
      };
      const newState = reducer(INITIAL_STATE, setUserPreferences(PREFERENCES));
      expect(newState).toEqual(PREFERENCES);
    });
  });
});
