import { getUserSettings } from 'state/user-settings/selectors';

const STATE = {
  userSettings: {
    restrictionsActive: false,
    enableGravatarIntegration: true,
    lastAccessPasswordExpirationMonths: 1,
    maxMonthsPasswordValid: 2,
    passwordAlwaysActive: null,
  },
};

describe('state/user-settings/selectors', () => {
  it('getUserSettings returns the full state', () => {
    expect(getUserSettings(STATE)).toEqual(STATE.userSettings);
  });
});
