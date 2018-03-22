import 'test/enzyme-init';

import { mapStateToProps, mapDispatchToProps } from 'ui/users/authority/UserAuthorityPageFormContainer';
import { GROUPS } from 'test/mocks/groups';
import { ROLES } from 'test/mocks/roles';

const GROUP_ROLES_COMBO = {
  group: GROUPS.payload[0].name,
  role: ROLES.payload[0].name,
};
const TEST_STATE = {
  groups: [GROUPS],
  roles: [ROLES],
  groupRolesCombo: [GROUP_ROLES_COMBO],
};

describe('UserAuthorityPageFormContainer', () => {
  it('maps groups & roles property state in UserAuthorityPageFormContainer', () => {
    expect(mapStateToProps(TEST_STATE)).toEqual({
      groups: [GROUPS],
      roles: [ROLES],
    });
  });

  it('verify that onWillMount and onSubmit are defined inmapDispatchToProps', () => {
    const dispatchMock = jest.fn();
    const result = mapDispatchToProps(dispatchMock);
    expect(result.onWillMount).toBeDefined();
    result.onWillMount();
    expect(dispatchMock).toHaveBeenCalled();
    expect(result.onSubmit).toBeDefined();
  });
});
