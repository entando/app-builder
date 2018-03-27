import 'test/enzyme-init';

import { mapStateToProps, mapDispatchToProps } from 'ui/users/common/UserAuthorityPageFormContainer';
import { getGroupsList } from 'state/groups/selectors';
import { getRolesList } from 'state/roles/selectors';

import { LIST_GROUPS_OK } from 'test/mocks/groups';
import { LIST_ROLES_OK } from 'test/mocks/roles';

jest.mock('state/groups/selectors', () => ({
  getGroupsList: jest.fn(),
  getRolesList: jest.fn(),
}));
jest.mock('state/roles/selectors', () => ({
  getRolesList: jest.fn(),
}));

getGroupsList.mockReturnValue(LIST_GROUPS_OK);
getRolesList.mockReturnValue(LIST_ROLES_OK);

const GROUP_ROLES_COMBO = {
  group: LIST_GROUPS_OK,
  role: LIST_ROLES_OK,
};

const TEST_STATE = {
  groups: LIST_GROUPS_OK,
  roles: LIST_ROLES_OK,
  groupRolesCombo: GROUP_ROLES_COMBO,
};

describe('UserAuthorityPageFormContainer', () => {
  it('maps groups & roles property state in UserAuthorityPageFormContainer', () => {
    expect(mapStateToProps(TEST_STATE)).toEqual({
      groups: LIST_GROUPS_OK,
      roles: LIST_ROLES_OK,
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
