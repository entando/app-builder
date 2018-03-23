import 'test/enzyme-init';

import { mapStateToProps, mapDispatchToProps } from 'ui/users/common/UserAuthorityPageFormContainer';
import { getGroupsList } from 'state/groups/selectors';

import { LIST_GROUPS_OK } from 'test/mocks/groups';
import { ROLES } from 'test/mocks/roles';

jest.mock('state/groups/selectors', () => ({
  getGroupsList: jest.fn(),
  getRoles: jest.fn(),
}));

getGroupsList.mockReturnValue(LIST_GROUPS_OK);

const GROUP_ROLES_COMBO = {
  group: LIST_GROUPS_OK,
  role: ROLES,
};

const TEST_STATE = {
  groups: LIST_GROUPS_OK,
  roles: ROLES,
  groupRolesCombo: GROUP_ROLES_COMBO,
};

describe('UserAuthorityPageFormContainer', () => {
  it('maps groups & roles property state in UserAuthorityPageFormContainer', () => {
    expect(mapStateToProps(TEST_STATE)).toEqual({
      groups: LIST_GROUPS_OK,
      roles: ROLES,
    });
  });

  it('verify that onWillMount and onSubmit are defined in mapDispatchToProps', () => {
    const dispatchMock = jest.fn();
    const result = mapDispatchToProps(dispatchMock);
    expect(result.onWillMount).toBeDefined();
    result.onWillMount();
    expect(dispatchMock).toHaveBeenCalled();
    expect(result.onSubmit).toBeDefined();
  });
});
