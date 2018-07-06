import { getUserProfile } from 'state/user-profile/selectors';

const STATE = {
  userProfile: { whatheverValue: 'is ok' },
};

describe('state/user-settings/selectors', () => {
  it('getUserProfile returns the user profile', () => {
    expect(getUserProfile(STATE)).toEqual(STATE.userProfile);
  });
});
