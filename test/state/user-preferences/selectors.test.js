import { getUserPreferences } from 'state/user-preferences/selectors';
import { USER_PREFERENCES } from 'test/mocks/userPreferences';

const STATE = {
  userPreferences: { ...USER_PREFERENCES },
};

describe('state/user-preferences/selectors', () => {
  it('getUserPreferences returns the user preferences', () => {
    expect(getUserPreferences(STATE)).toEqual(STATE.userPreferences);
  });
});
