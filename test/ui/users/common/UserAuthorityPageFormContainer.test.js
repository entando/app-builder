import 'test/enzyme-init';

import { mapStateToProps, mapDispatchToProps } from 'ui/users/common/UserAuthorityPageFormContainer';
import { getGroupsList } from 'state/groups/selectors';
import { getRolesList } from 'state/roles/selectors';

import { LIST_GROUPS_OK } from 'test/mocks/groups';
import { LIST_ROLES_OK } from 'test/mocks/roles';

jest.mock('state/groups/selectors', () => ({
  getGroupsList: jest.fn(),
}));
jest.mock('state/roles/selectors', () => ({
  getRolesList: jest.fn(),
}));

jest.mock('state/users/selectors', () => ({
  getGroupRolesCombo: jest.fn(),
  getSelectedUserActionAuthorities: jest.fn(),
}));

getGroupsList.mockReturnValue(LIST_GROUPS_OK);
getRolesList.mockReturnValue(LIST_ROLES_OK);

describe('UserAuthorityPageFormContainer', () => {
  it('maps groups & roles property state in UserAuthorityPageFormContainer', () => {
    const props = mapStateToProps({});
    expect(props).toHaveProperty('groups');
    expect(props).toHaveProperty('roles');
    expect(props).toHaveProperty('groupRolesCombo');
    expect(props).toHaveProperty('actionOnSave');
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
