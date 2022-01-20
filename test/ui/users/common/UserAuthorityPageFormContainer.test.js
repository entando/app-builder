import 'test/enzyme-init';

import {
  mapStateToProps,
  mapDispatchToProps,
} from 'ui/users/common/UserAuthorityPageFormContainer';
import { getGroupsList } from 'state/groups/selectors';
import { getRolesList } from 'state/roles/selectors';
import { getLoading } from 'state/loading/selectors';
import { LIST_GROUPS_OK } from 'test/mocks/groups';
import { LIST_ROLES_OK } from 'test/mocks/roles';

jest.mock('state/groups/selectors', () => ({
  getGroupsList: jest.fn(),
  getGroupsMap: jest.fn(),
}));
jest.mock('state/roles/selectors', () => ({
  getRolesList: jest.fn(),
  getRolesMap: jest.fn(),
}));

jest.mock('state/users/selectors', () => ({
  getSelectedUserAuthoritiesList: jest.fn(),
  getSelectedUserActionAuthorities: jest.fn(),
}));

jest.mock('state/loading/selectors', () => ({
  getLoading: jest.fn(),
}));
getLoading.mockReturnValue(false);

getGroupsList.mockReturnValue(LIST_GROUPS_OK);
getRolesList.mockReturnValue(LIST_ROLES_OK);

const ownProps = {
  match: {
    params: {
      dumpCode: 'username',
    },
  },
};

describe('UserAuthorityPageFormContainer', () => {
  it('maps groups & roles property state in UserAuthorityPageFormContainer', () => {
    const props = mapStateToProps({});
    expect(props).toHaveProperty('loading');
    expect(props).toHaveProperty('groups');
    expect(props).toHaveProperty('roles');
    expect(props).toHaveProperty('groupsMap');
    expect(props).toHaveProperty('rolesMap');
    expect(props).toHaveProperty('initialValues');
    expect(props).toHaveProperty('actionOnSave');
  });

  it('verify that onWillMount and onSubmit are defined in mapDispatchToProps', () => {
    const dispatchMock = jest.fn();
    const result = mapDispatchToProps(dispatchMock, ownProps);
    expect(result.onDidMount).toBeDefined();
    result.onDidMount();
    expect(dispatchMock).toHaveBeenCalled();
    expect(result.onSubmit).toBeDefined();
  });
});
