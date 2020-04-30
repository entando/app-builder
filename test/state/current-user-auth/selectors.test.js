import {
  getCurrentUserAuth,
  getCurrentUserAuthGroupRolesCombo,
} from 'state/current-user-auth/selectors';

const TEST_STATE = {
  currentUserAuth: [
    { group: 'group1', role: 'role2' },
    { group: 'group2', role: 'role1' },
  ],
  groups: {
    map: {
      group1: { name: 'Group 1' },
      group2: { name: 'Group 2' },
    },
  },
  roles: {
    map: {
      role1: { name: 'Role 1' },
      role2: { name: 'Role 2' },
    },
  },
};

describe('state/current-user-auth/selectors', () => {
  it('getCurrentUserAuth returns correct values', () => {
    const userAuth = getCurrentUserAuth(TEST_STATE);
    expect(userAuth).toBe(TEST_STATE.currentUserAuth);
  });

  it('getCurrentUserAuthGroupRolesCombo returns correct values', () => {
    const userAuth = getCurrentUserAuthGroupRolesCombo(TEST_STATE);
    expect(userAuth).toHaveLength(TEST_STATE.currentUserAuth.length);
    expect(userAuth[0]).toEqual({
      group: { code: 'group1', name: 'Group 1' },
      role: { code: 'role2', name: 'Role 2' },
    });
  });
});
